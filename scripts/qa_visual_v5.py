import json
import shutil
import tempfile
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3111"
OUT = Path("screenshots-v5")
OUT.mkdir(exist_ok=True)
before_path = Path(tempfile.gettempdir()) / "ledproje-v5-seo-before.json"
if before_path.exists():
    shutil.copyfile(before_path, OUT / "seo-before.json")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    console_issues = []
    for width, height in [(375, 812), (390, 844), (768, 1024), (1024, 900), (1440, 1000), (1920, 1080)]:
        page = browser.new_page(viewport={"width": width, "height": height})
        page.on("console", lambda msg, w=width: console_issues.append(f"{w}px {msg.type}: {msg.text}") if msg.type in ("error", "warning") else None)
        response = page.goto(BASE, wait_until="networkidle")
        assert response and response.ok
        assert page.locator("h1").count() == 1
        assert not page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth"), f"overflow:{width}"
        assert page.locator(".v5-application-grid > a").count() == 12
        if width <= 1024:
            page.locator(".menu-toggle").click(); assert page.locator("#mobile-menu").is_visible(); page.locator(".mobile-close").click()
        else:
            page.locator(".nav-group-wide").hover(); assert page.locator(".mega-panel-groups").evaluate("el => getComputedStyle(el).visibility === 'visible'")
            page.get_by_role("button", name="Çözümler").focus(); assert page.evaluate("document.activeElement?.textContent.includes('Çözümler')")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); page.wait_for_timeout(400)
        assert page.locator("img").evaluate_all("els => els.every(i => i.complete && i.naturalWidth > 0)")
        page.close()

    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    page.goto(BASE, wait_until="networkidle")
    initial = page.locator('.hero-slider [aria-current="true"]').get_attribute("aria-label")
    page.wait_for_timeout(6300)
    assert page.locator('.hero-slider [aria-current="true"]').get_attribute("aria-label") != initial
    page.get_by_role("button", name="Sonraki görsel").focus(); page.keyboard.press("Enter")
    page.get_by_role("button", name="Önceki görsel").click()
    page.locator('.hero-slider-controls > div button').nth(1).click()
    assert page.locator('.hero-slider [aria-current="true"]').get_attribute("aria-label") == "2. görseli göster"
    page.screenshot(path=str(OUT / "homepage-slider-second-1440.png"), full_page=False)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); page.wait_for_timeout(500)
    page.screenshot(path=str(OUT / "homepage-1440.png"), full_page=True)
    page.locator("#uygulama-alanlari").screenshot(path=str(OUT / "applications-1440.png"))
    page.locator(".v4-system").screenshot(path=str(OUT / "physical-system-1440.png"))
    page.close()

    reduced = browser.new_context(viewport={"width": 1440, "height": 1000}, reduced_motion="reduce").new_page()
    reduced.goto(BASE, wait_until="networkidle")
    reduced_initial = reduced.locator('.hero-slider [aria-current="true"]').get_attribute("aria-label")
    reduced.wait_for_timeout(6300)
    assert reduced.locator('.hero-slider [aria-current="true"]').get_attribute("aria-label") == reduced_initial
    reduced.close()

    for width, height, name in [(390, 844, "homepage-390.png")]:
        page = browser.new_page(viewport={"width": width, "height": height}); page.goto(BASE, wait_until="networkidle")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); page.wait_for_timeout(500); page.screenshot(path=str(OUT / name), full_page=True)
        page.locator("#uygulama-alanlari").screenshot(path=str(OUT / "applications-390.png")); page.close()
    for width, height, name in [(1440, 1000, "product-page-1440.png"), (390, 844, "product-page-390.png")]:
        page = browser.new_page(viewport={"width": width, "height": height}); page.goto(BASE + "/ic-mekan-led-ekran", wait_until="networkidle")
        assert page.get_by_text("Kararınızı tamamlayın").count() == 0
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); page.wait_for_timeout(400); page.screenshot(path=str(OUT / name), full_page=True); page.close()

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
        faq_count = sum(1 for schema in schemas if schema == "FAQPage"); assert faq_count == (1 if local.endswith("/sik-sorulan-sorular") else 0)
        links = set(page.locator("a[href]").evaluate_all("els => els.map(a => a.href.split('#')[0])"))
        for href in links:
            parsed = urlparse(href)
            if parsed.hostname in ("localhost", "127.0.0.1"):
                internal_urls.add(href)
                canonical_href = href.replace(BASE, "https://ledproje.com.tr").rstrip("/")
                if canonical_href in inbound and canonical_href != canonical_url.rstrip("/"):
                    inbound[canonical_href] += 1
        report["routes"].append({"url": canonical_url, "title": page.title(), "description": page.locator('meta[name="description"]').get_attribute("content"), "canonical": canonical, "h1": page.locator("h1").inner_text(), "schemas": schemas, "internalLinkCount": len(links)})
    broken = []
    for href in sorted(internal_urls):
        response = page.request.get(href)
        if response.status >= 400: broken.append([href, response.status])
    assert not broken, broken
    assert all(count > 0 for url, count in inbound.items() if url != "https://ledproje.com.tr"), {k: v for k, v in inbound.items() if v == 0}

    page.goto(BASE + "/iletisim", wait_until="networkidle")
    page.locator("#name").fill("Test Kullanıcı"); page.locator("#phone").fill("05010000000"); page.locator("#city").fill("İstanbul"); page.locator("#environment").select_option(index=1)
    page.evaluate("window.__openedUrl=''; window.open=(url)=>{window.__openedUrl=String(url); return null}")
    page.get_by_role("button", name="WhatsApp’tan teklif isteyin").click(); assert page.evaluate("window.__openedUrl.startsWith('https://wa.me/')")
    (OUT / "seo-after.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    if before_path.exists():
        before = json.loads(before_path.read_text(encoding="utf-8"))
        before_core = {(x["url"].rstrip("/"), x["title"], x["description"], x["canonical"].rstrip("/"), x["h1"], tuple(x["schemas"])) for x in before["routes"]}
        after_core = {(x["url"].rstrip("/"), x["title"], x["description"], x["canonical"].rstrip("/"), x["h1"], tuple(x["schemas"])) for x in report["routes"]}
        assert before["routeCount"] == report["routeCount"] and before_core == after_core and before["robots"] == report["robots"]
    browser.close()

assert not console_issues, "\n".join(console_issues)
print(f"QA_OK routes={len(canonical_urls)} orphans=0 broken_links=0 console_issues=0 screenshots=8")
