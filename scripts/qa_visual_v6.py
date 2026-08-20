import json
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3120"
OUT = Path("screenshots-v6")
OUT.mkdir(exist_ok=True)
BASELINE = Path("screenshots-v5/seo-after.json")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    issues = []
    for width, height in [(375, 812), (390, 844), (768, 1024), (1024, 900), (1440, 1000), (1920, 1080)]:
        page = browser.new_page(viewport={"width": width, "height": height})
        page.on("console", lambda msg, w=width: issues.append(f"{w}px {msg.type}: {msg.text}") if msg.type in ("error", "warning") else None)
        response = page.goto(BASE, wait_until="networkidle")
        assert response and response.ok
        assert page.locator("h1").count() == 1
        assert page.locator(".v5-application-grid > a").count() == 12
        assert not page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth"), f"overflow:{width}"
        if width <= 1024:
            page.locator(".menu-toggle").click(); assert page.locator("#mobile-menu").is_visible(); page.locator(".mobile-close").click()
        else:
            page.locator(".nav-group-wide").hover(); assert page.locator(".mega-panel-groups").evaluate("el => getComputedStyle(el).visibility === 'visible'")
            page.locator(".nav-group-wide > button").focus(); assert page.evaluate("document.activeElement?.matches('.nav-group-wide > button')")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); page.wait_for_timeout(450)
        assert page.locator("img").evaluate_all("els => els.every(i => i.complete && i.naturalWidth > 0)")
        page.close()

    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    page.goto(BASE, wait_until="networkidle")
    initial = page.locator('.hero-slider [aria-current="true"]').get_attribute("aria-label")
    page.wait_for_timeout(6300)
    assert page.locator('.hero-slider [aria-current="true"]').get_attribute("aria-label") != initial
    page.locator(".hero-slider-controls > button").last.focus(); page.keyboard.press("Enter")
    page.locator(".hero-slider-controls > button").first.click()
    page.locator(".hero-slider-controls > div button").nth(1).click()
    assert page.locator('.hero-slider [aria-current="true"]').get_attribute("aria-label").startswith("2.")
    page.screenshot(path=str(OUT / "homepage-slider-second-1440.png"), full_page=False)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); page.wait_for_timeout(500)
    page.evaluate("window.scrollTo(0, 0); document.querySelector('.site-header').style.position='absolute'")
    page.screenshot(path=str(OUT / "homepage-1440.png"), full_page=True)
    page.locator(".v4-products").screenshot(path=str(OUT / "products-1440.png"))
    page.locator("#uygulama-alanlari").screenshot(path=str(OUT / "applications-1440.png"))
    page.close()

    reduced = browser.new_context(viewport={"width": 1440, "height": 1000}, reduced_motion="reduce").new_page()
    reduced.goto(BASE, wait_until="networkidle")
    reduced_initial = reduced.locator('.hero-slider [aria-current="true"]').get_attribute("aria-label")
    reduced.wait_for_timeout(6300)
    assert reduced.locator('.hero-slider [aria-current="true"]').get_attribute("aria-label") == reduced_initial
    reduced.close()

    page = browser.new_page(viewport={"width": 390, "height": 844}); page.goto(BASE, wait_until="networkidle")
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); page.wait_for_timeout(500)
    page.evaluate("window.scrollTo(0, 0); document.querySelector('.site-header').style.position='absolute'")
    page.screenshot(path=str(OUT / "homepage-390.png"), full_page=True)
    page.evaluate("document.querySelector('.site-header').style.display='none'; document.querySelector('.conversion-bar').style.display='none'; document.querySelector('.skip-link').style.display='none'")
    page.locator(".v6-quote").screenshot(path=str(OUT / "quote-form-390.png")); page.close()
    for route, name in [("/ic-mekan-led-ekran", "indoor-1440.png"), ("/dis-mekan-led-ekran", "outdoor-1440.png")]:
        page = browser.new_page(viewport={"width": 1440, "height": 1000}); page.goto(BASE + route, wait_until="networkidle")
        assert page.locator(".compact-related").count() == 0
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); page.wait_for_timeout(400)
        page.screenshot(path=str(OUT / name), full_page=True); page.close()

    page = browser.new_page(viewport={"width": 390, "height": 844})
    sitemap_response = page.request.get(BASE + "/sitemap.xml")
    root = ElementTree.fromstring(sitemap_response.body())
    canonical_urls = [n.text for n in root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
    inbound = {url.rstrip("/"): 0 for url in canonical_urls}
    report = {"routeCount": len(canonical_urls), "routes": [], "robots": page.request.get(BASE + "/robots.txt").text()}
    internal_urls = set()
    for canonical_url in canonical_urls:
        local = canonical_url.replace("https://ledproje.com.tr", BASE)
        response = page.goto(local, wait_until="networkidle"); assert response and response.ok
        canonical = page.locator('link[rel="canonical"]').get_attribute("href"); assert canonical.rstrip("/") == canonical_url.rstrip("/")
        assert page.locator("h1").count() == 1
        schemas = page.locator('script[type="application/ld+json"]').evaluate_all("els => els.map(e => JSON.parse(e.textContent)['@type']).filter(Boolean)")
        assert sum(s == "FAQPage" for s in schemas) == (1 if local.endswith("/sik-sorulan-sorular") else 0)
        links = set(page.locator("a[href]").evaluate_all("els => els.map(a => a.href.split('#')[0])"))
        for href in links:
            if urlparse(href).hostname in ("localhost", "127.0.0.1"):
                internal_urls.add(href)
                target = href.replace(BASE, "https://ledproje.com.tr").rstrip("/")
                if target in inbound and target != canonical_url.rstrip("/"): inbound[target] += 1
        report["routes"].append({"url": canonical_url, "title": page.title(), "description": page.locator('meta[name="description"]').get_attribute("content"), "canonical": canonical, "h1": page.locator("h1").inner_text(), "schemas": schemas, "internalLinkCount": len(links)})
    broken = [[href, page.request.get(href).status] for href in sorted(internal_urls) if page.request.get(href).status >= 400]
    assert not broken, broken
    assert all(count > 0 for url, count in inbound.items() if url != "https://ledproje.com.tr")

    page.goto(BASE, wait_until="networkidle")
    page.locator("#name").fill("Test User"); page.locator("#phone").fill("05010000000"); page.locator("#city").fill("Istanbul"); page.locator("#environment").select_option(index=1)
    page.evaluate("window.__openedUrl=''; window.open=(url)=>{window.__openedUrl=String(url); return null}")
    page.locator('.v6-quote form button[type="submit"]').click(); assert page.evaluate("window.__openedUrl.startsWith('https://wa.me/')")
    (OUT / "seo-after.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    before = json.loads(BASELINE.read_text(encoding="utf-8"))
    key = lambda x: (x["url"].rstrip("/"), x["title"], x["description"], x["canonical"].rstrip("/"), x["h1"], tuple(x["schemas"]))
    assert before["routeCount"] == report["routeCount"]
    assert {key(x) for x in before["routes"]} == {key(x) for x in report["routes"]}
    assert before["robots"] == report["robots"]
    browser.close()

assert not issues, "\n".join(issues)
print(f"QA_OK routes={len(canonical_urls)} orphans=0 broken_links=0 console_issues=0 screenshots=8")
