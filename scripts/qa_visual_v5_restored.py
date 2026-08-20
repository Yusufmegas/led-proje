import json
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3147"
OUT = Path("screenshots-v5-final")
OUT.mkdir(exist_ok=True)
BASELINE = json.loads(Path("screenshots-v6/seo-after.json").read_text(encoding="utf-8"))

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    issues = []
    for width in (390, 768, 1024, 1440):
        page = browser.new_page(viewport={"width": width, "height": 900})
        page.on("console", lambda msg, w=width: issues.append(f"{w}px {msg.type}: {msg.text}") if msg.type in ("error", "warning") else None)
        assert page.goto(BASE, wait_until="networkidle").ok
        assert page.locator("h1").count() == 1
        if width == 1440:
            assert page.locator(".v5-application-grid > a").count() == 12
        assert not page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
        assert page.locator(".skip-link").evaluate("el => { const r = el.getBoundingClientRect(); return r.right <= 0 || r.bottom <= 0 }")
        if width <= 1024:
            page.locator(".menu-toggle").click()
            assert page.locator("#mobile-menu").is_visible()
            page.locator(".mobile-close").click()
        else:
            page.locator(".nav-group-wide > button").focus()
            page.wait_for_timeout(250)
            assert page.locator(".mega-panel-groups").is_visible()
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(1200)
        assert page.locator("img").evaluate_all("els => els.every(i => i.complete && i.naturalWidth > 0)")
        page.close()

    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    page.goto(BASE, wait_until="networkidle")
    first = page.locator('.hero-slider [aria-current="true"]').get_attribute("aria-label")
    page.wait_for_timeout(6200)
    assert page.locator('.hero-slider [aria-current="true"]').get_attribute("aria-label") != first
    page.locator(".hero-slider-controls > div button").nth(1).click()
    page.screenshot(path=str(OUT / "homepage-slider-second-1440.png"))
    page.evaluate("""async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } window.scrollTo(0, 0); document.querySelector('.site-header').style.position='static'; document.querySelector('.conversion-bar').style.display='none'; }""")
    page.screenshot(path=str(OUT / "homepage-1440.png"), full_page=True)
    page.locator(".v4-products").screenshot(path=str(OUT / "led-systems-1440.png"))
    page.evaluate("document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0, 0)")
    page.wait_for_timeout(150)
    page.locator(".nav-group-wide > button").focus()
    page.wait_for_timeout(250)
    page.screenshot(path=str(OUT / "solutions-menu-1440.png"))
    page.close()

    page = browser.new_page(viewport={"width": 390, "height": 844})
    page.goto(BASE, wait_until="networkidle")
    page.evaluate("""async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } window.scrollTo(0, 0); document.querySelector('.site-header').style.position='static'; document.querySelector('.conversion-bar').style.display='none'; }""")
    page.screenshot(path=str(OUT / "homepage-390.png"), full_page=True)
    page.locator(".conversion-bar").evaluate("el => el.style.display=''")
    page.locator(".menu-toggle").click()
    page.screenshot(path=str(OUT / "mobile-menu-390.png"))
    page.locator(".mobile-close").click()
    page.locator(".site-footer").scroll_into_view_if_needed()
    page.locator(".conversion-bar").evaluate("el => el.style.display='none'")
    page.locator(".site-footer").screenshot(path=str(OUT / "footer-390.png"))
    page.goto(BASE + "/iletisim", wait_until="networkidle")
    page.evaluate("document.querySelector('.conversion-bar').style.display='none'")
    page.locator(".form-shell").screenshot(path=str(OUT / "quote-form-390.png"))
    page.close()

    shots = [("/ic-mekan-led-ekran","indoor-1440.png"),("/dis-mekan-led-ekran","outdoor-1440.png"),("/led-ekran-kesif-projelendirme","discovery-1440.png"),("/projeler","projects-1440.png"),("/teknik-bilgi","technical-center-1440.png")]
    for route, name in shots:
        page = browser.new_page(viewport={"width": 1440, "height": 1000})
        assert page.goto(BASE + route, wait_until="networkidle").ok
        page.evaluate("""async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } window.scrollTo(0, 0); document.querySelector('.site-header').style.position='static'; document.querySelector('.conversion-bar').style.display='none'; }""")
        if route == "/sik-sorulan-sorular": assert page.locator(".faq-list details").count() == 29
        page.screenshot(path=str(OUT / name), full_page=True)
        page.close()

    for route, name in [("/projeler","projects-390.png"),("/teknik-bilgi","technical-center-390.png")]:
        page = browser.new_page(viewport={"width": 390, "height": 844})
        assert page.goto(BASE + route, wait_until="networkidle").ok
        page.evaluate("document.querySelector('.site-header').style.position='static'; document.querySelector('.conversion-bar').style.display='none'")
        page.screenshot(path=str(OUT / name), full_page=True)
        page.close()

    reduced = browser.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce").new_page()
    reduced.goto(BASE, wait_until="networkidle")
    current = reduced.locator('.hero-slider [aria-current="true"]').get_attribute("aria-label")
    reduced.wait_for_timeout(6200)
    assert reduced.locator('.hero-slider [aria-current="true"]').get_attribute("aria-label") == current
    reduced.close()

    page = browser.new_page(viewport={"width": 390, "height": 844})
    root = ElementTree.fromstring(page.request.get(BASE + "/sitemap.xml").body())
    urls = [n.text for n in root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
    inbound = {url.rstrip("/"): 0 for url in urls}
    report = {"routeCount": len(urls), "routes": [], "robots": page.request.get(BASE + "/robots.txt").text()}
    internal = set()
    for url in urls:
        assert page.goto(url.replace("https://ledproje.com.tr", BASE), wait_until="networkidle").ok
        canonical = page.locator('link[rel="canonical"]').get_attribute("href")
        assert canonical.rstrip("/") == url.rstrip("/")
        assert page.locator("h1").count() == 1
        schemas = page.locator('script[type="application/ld+json"]').evaluate_all("els => els.map(e => JSON.parse(e.textContent)['@type']).filter(Boolean)")
        assert schemas.count("FAQPage") == (1 if url.endswith("/sik-sorulan-sorular") else 0)
        links = set(page.locator("a[href]").evaluate_all("els => els.map(a => a.href.split('#')[0])"))
        for href in links:
            if urlparse(href).hostname in ("localhost", "127.0.0.1"):
                internal.add(href)
                target = href.replace(BASE, "https://ledproje.com.tr").rstrip("/")
                if target in inbound and target != url.rstrip("/"): inbound[target] += 1
        report["routes"].append({"url":url,"title":page.title(),"description":page.locator('meta[name="description"]').get_attribute("content"),"canonical":canonical,"h1":page.locator("h1").inner_text(),"schemas":schemas,"internalLinkCount":len(links)})
    assert not [(href,page.request.get(href).status) for href in internal if page.request.get(href).status >= 400]
    orphans = [url for url,value in inbound.items() if url != "https://ledproje.com.tr" and value == 0]
    assert not orphans, f"Orphan routes: {orphans}"
    page.goto(BASE + "/iletisim", wait_until="networkidle")
    for field,value in (("#name","Test Kullanıcı"),("#phone","05010000000"),("#city","İstanbul"),("#use","Mağaza")): page.locator(field).fill(value)
    page.locator("#environment").select_option(index=1)
    page.evaluate("window.__openedUrl=''; window.open=(url)=>{window.__openedUrl=String(url)}")
    page.locator('.form-shell button[type="submit"]').click()
    assert "wa.me" in page.evaluate("window.__openedUrl")
    (OUT / "seo-before.json").write_text(json.dumps(BASELINE, ensure_ascii=False, indent=2), encoding="utf-8")
    (OUT / "seo-after.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    key=lambda x:(x["url"].rstrip("/"),x["title"],x["description"],x["canonical"].rstrip("/"),x["h1"],tuple(x["schemas"]))
    assert BASELINE["routeCount"] == report["routeCount"] == 36
    assert {key(x) for x in BASELINE["routes"]} == {key(x) for x in report["routes"]}
    assert BASELINE["robots"] == report["robots"]
    browser.close()

assert not issues, "\n".join(issues)
print("QA_OK routes=36 orphans=0 broken_links=0 console_issues=0 screenshots=13")
