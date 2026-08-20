import json
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3101"
OUT = Path("screenshots-v4")
OUT.mkdir(exist_ok=True)
SHOTS = [
    ("/", 1440, 1000, "homepage-1440.png"), ("/", 390, 844, "homepage-390.png"),
    ("/led-ekranlar", 1440, 1000, "products-1440.png"), ("/led-ekranlar", 390, 844, "products-390.png"),
    ("/ic-mekan-led-ekran", 1440, 1000, "indoor-1440.png"),
    ("/dis-mekan-led-ekran", 1440, 1000, "outdoor-1440.png"),
    ("/poster-led-ekran", 1440, 1000, "poster-1440.png"),
    ("/led-ekran-kontrol-sistemleri", 1440, 1000, "control-systems-1440.png"),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    console_errors = []
    for width, height in [(375, 812), (390, 844), (768, 1024), (1024, 900), (1440, 1000), (1920, 1080)]:
        page = browser.new_page(viewport={"width": width, "height": height})
        page.on("console", lambda msg, w=width: console_errors.append(f"{w}px {msg.text}") if msg.type == "error" else None)
        response = page.goto(BASE, wait_until="networkidle")
        assert response and response.ok
        assert page.locator("h1").count() == 1
        assert not page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth"), f"overflow:{width}"
        if width <= 1024:
            page.locator(".menu-toggle").click()
            assert page.locator("#mobile-menu").is_visible()
            page.locator(".mobile-close").click()
        else:
            page.locator(".nav-group-wide").hover()
            assert page.locator(".desktop-nav .mega-panel-groups").evaluate("el => getComputedStyle(el).visibility === 'visible'")
            page.get_by_role("button", name="Çözümler").focus()
            assert page.evaluate("document.activeElement?.textContent.includes('Çözümler')")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(400)
        assert page.locator("img").evaluate_all("els => els.every(i => i.complete && i.naturalWidth > 0)")
        page.close()

    for path, width, height, filename in SHOTS:
        page = browser.new_page(viewport={"width": width, "height": height})
        page.goto(BASE + path, wait_until="networkidle")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / filename), full_page=True)
        page.close()

    page = browser.new_page(viewport={"width": 390, "height": 844})
    sitemap = page.request.get(BASE + "/sitemap.xml")
    root = ElementTree.fromstring(sitemap.body())
    urls = [node.text for node in root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
    report = {"routeCount": len(urls), "routes": [], "robots": page.request.get(BASE + "/robots.txt").text()}
    all_internal = set()
    for canonical_url in urls:
        local_url = canonical_url.replace("https://ledproje.com.tr", BASE)
        response = page.goto(local_url, wait_until="networkidle")
        assert response and response.ok
        canonical = page.locator('link[rel="canonical"]').get_attribute("href")
        assert canonical.rstrip("/") == canonical_url.rstrip("/")
        assert page.locator("h1").count() == 1
        schemas = page.locator('script[type="application/ld+json"]').evaluate_all("els => els.map(e => JSON.parse(e.textContent)['@type']).filter(Boolean)")
        faq_count = page.locator('script[type="application/ld+json"]').evaluate_all("els => els.filter(e => e.textContent.includes('FAQPage')).length")
        assert faq_count == (1 if local_url.endswith("/sik-sorulan-sorular") else 0)
        for href in page.locator("a[href]").evaluate_all("els => els.map(a => a.href)"):
            if urlparse(href).hostname in ("localhost", "127.0.0.1"):
                all_internal.add(href.split("#")[0])
        report["routes"].append({"url": canonical_url, "title": page.title(), "description": page.locator('meta[name="description"]').get_attribute("content"), "canonical": canonical, "h1": page.locator("h1").inner_text(), "schemas": schemas})
    broken = []
    for href in sorted(all_internal):
        response = page.request.get(href)
        if response.status >= 400:
            broken.append([href, response.status])
    assert not broken, broken

    page.goto(BASE + "/sik-sorulan-sorular", wait_until="networkidle")
    summary = page.locator("details summary").first
    summary.focus(); page.keyboard.press("Enter")
    assert summary.locator("xpath=..").get_attribute("open") is not None
    page.goto(BASE + "/iletisim", wait_until="networkidle")
    page.locator("#name").fill("Test Kullanıcı"); page.locator("#phone").fill("05010000000"); page.locator("#city").fill("İstanbul"); page.locator("#environment").select_option(index=1)
    page.evaluate("window.__openedUrl=''; window.open=(url)=>{window.__openedUrl=String(url); return null}")
    page.get_by_role("button", name="WhatsApp’tan teklif isteyin").click()
    assert page.evaluate("window.__openedUrl.startsWith('https://wa.me/')")
    (OUT / "seo-after.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    browser.close()

assert not console_errors, "\n".join(console_errors)
print(f"QA_OK routes={len(urls)} broken_links=0 console_errors=0 screenshots={len(SHOTS)}")
