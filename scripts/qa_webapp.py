from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3002"
OUT = Path("screenshots-v2")
OUT.mkdir(exist_ok=True)
shots = [("/",1440,1000,"homepage-1440.png"),("/sik-sorulan-sorular",1440,1000,"faq-1440.png"),("/iletisim",1440,1000,"contact-1440.png"),("/",390,844,"homepage-390.png"),("/sik-sorulan-sorular",390,844,"faq-390.png"),("/iletisim",390,844,"contact-390.png")]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    errors = []
    for width, height in [(375,812),(390,844),(768,1024),(1024,900),(1440,1000),(1920,1080)]:
        page = browser.new_page(viewport={"width":width,"height":height})
        page.on("console", lambda msg, w=width: errors.append(f"{w}px {msg.type}: {msg.text}") if msg.type == "error" else None)
        response = page.goto(BASE, wait_until="networkidle")
        assert response and response.ok
        assert not page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth"), f"overflow {width}"
        assert page.locator("h1").count() == 1
        if width <= 1024:
            page.locator(".menu-toggle").click(force=True)
            page.locator("#mobile-menu").wait_for(state="visible")
            assert page.locator("#mobile-menu").get_by_text("Uygulama Alanları", exact=True).is_visible()
            page.locator(".mobile-close").click(force=True)
        else:
            page.locator(".nav-group-wide").hover()
            page.locator(".desktop-nav .mega-panel-groups h2").first.wait_for(state="visible")
            page.get_by_role("button", name="Çözümler").focus()
            assert page.locator(".desktop-nav .mega-panel-groups").evaluate("el => getComputedStyle(el).visibility === 'visible'")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(600)
        assert page.locator("img").evaluate_all("els => els.every(img => img.complete && img.naturalWidth > 0)"), f"broken image {width}"
        page.close()
    for path,width,height,filename in shots:
        page = browser.new_page(viewport={"width":width,"height":height})
        page.goto(BASE+path, wait_until="networkidle")
        page.screenshot(path=str(OUT/filename), full_page=True)
        page.close()
    page = browser.new_page(viewport={"width":390,"height":844})
    page.goto(f"{BASE}/sik-sorulan-sorular", wait_until="networkidle")
    first_faq = page.locator(".faq-list details").first
    first_faq.locator("summary").focus(); page.keyboard.press("Enter")
    assert first_faq.get_attribute("open") is not None
    assert page.locator('script[type="application/ld+json"]').evaluate_all("els => els.filter(el => el.textContent.includes('FAQPage')).length") == 1
    page.goto(f"{BASE}/iletisim", wait_until="networkidle")
    page.locator("#name").fill("Test Kullanıcı"); page.locator("#phone").fill("05010000000"); page.locator("#city").fill("İstanbul"); page.locator("#environment").select_option(label="İç mekân")
    page.evaluate("window.__openedUrl = ''; window.open = (url) => { window.__openedUrl = String(url); return null; }")
    page.get_by_role("button", name="WhatsApp’tan teklif isteyin").click()
    assert page.evaluate("window.__openedUrl.startsWith('https://wa.me/905015800101?text=')")
    page.goto(f"{BASE}/led-ekran-metrekare-fiyati", wait_until="networkidle")
    page.locator("#calc-width").fill("6"); page.locator("#calc-height").fill("3")
    page.get_by_role("button", name="Alanı Hesapla").click()
    assert "18 m²" in page.locator(".calculator-output").inner_text()
    page.screenshot(path=str(OUT/"calculator-390.png"), full_page=True)
    hrefs = page.locator("a[href]").evaluate_all("els => [...new Set(els.map(a => a.href))]")
    broken=[]
    for href in hrefs:
        parsed=urlparse(href)
        if parsed.hostname not in ("127.0.0.1","localhost"): continue
        response=page.request.get(href.split("#")[0])
        if response.status>=400: broken.append((href,response.status))
    assert not broken, broken
    sitemap_response=page.request.get(f"{BASE}/sitemap.xml")
    root=ElementTree.fromstring(sitemap_response.body())
    urls=[node.text.replace("https://ledproje.com.tr",BASE) for node in root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
    titles=set()
    for url in urls:
        response=page.goto(url,wait_until="domcontentloaded"); assert response and response.ok
        title=page.title(); assert title and title not in titles; titles.add(title)
        assert page.locator("h1").count()==1
        canonical=page.locator('link[rel="canonical"]').get_attribute("href")
        assert canonical and canonical.startswith("https://ledproje.com.tr")
        faq_schema_count=page.locator('script[type="application/ld+json"]').evaluate_all("els => els.filter(el => el.textContent.includes('FAQPage')).length")
        assert faq_schema_count == (1 if url.endswith('/sik-sorulan-sorular') else 0)
    browser.close()
assert not errors, "\n".join(errors)
print(f"QA_OK screenshots={OUT.resolve()} routes={len(urls)} console_errors=0 broken_links=0")
