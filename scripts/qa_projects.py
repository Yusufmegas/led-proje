import os
from pathlib import Path
from xml.etree import ElementTree
from playwright.sync_api import sync_playwright

DEV = os.environ.get("LEDPROJE_DEV_BASE", "http://localhost:3146")
PROD = os.environ.get("LEDPROJE_PROD_BASE", "http://localhost:3145")
OUT = Path("screenshots-v5-final")
OUT.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    production = browser.new_page(viewport={"width": 1440, "height": 900})
    assert production.goto(PROD + "/projeler", wait_until="networkidle").ok
    html = production.content()
    assert "Örnek proje yerleşimi" not in html
    assert "Örnek logo alanı" not in html
    assert production.locator(".project-grid").count() == 0
    assert production.locator('script[type="application/ld+json"]').evaluate_all("els => els.every(el => !el.textContent.includes('placeholder'))")
    sitemap = ElementTree.fromstring(production.request.get(PROD + "/sitemap.xml").body())
    urls = [node.text for node in sitemap.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
    assert all("ornek-" not in (url or "") for url in urls)
    production.close()

    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    assert page.goto(DEV + "/projeler", wait_until="networkidle").ok
    page.evaluate("document.querySelectorAll('nextjs-portal').forEach(el => el.remove())")
    page.locator(".conversion-bar").evaluate("el => el.style.display='none'")
    assert page.locator(".project-grid > article").count() == 5
    assert page.locator(".reference-grid > article").count() == 4
    assert not page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
    page.screenshot(path=str(OUT / "projects-all-1440.png"), full_page=True)
    sector = page.locator('.project-filter-panel label').nth(0).locator("select")
    sector.select_option(label="Mağaza")
    assert page.locator(".project-grid > article").count() == 1
    page.evaluate("document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0,0); document.querySelector('.site-header').style.position='static'")
    page.screenshot(path=str(OUT / "projects-retail-1440.png"), full_page=True)
    sector.select_option(label="Sahne ve organizasyon")
    assert page.locator(".project-grid > article").count() == 1
    page.evaluate("window.scrollTo(0,0)")
    page.screenshot(path=str(OUT / "projects-events-1440.png"), full_page=True)
    sector.select_option("")
    page.locator(".project-card-copy button").first.focus()
    page.locator(".project-card-copy button").first.press("Enter")
    assert page.locator(".project-detail-overlay").is_visible()
    page.locator(".project-detail-cover img").wait_for(state="visible")
    page.wait_for_function("document.querySelector('.project-detail-cover img')?.naturalWidth > 0")
    assert page.locator("video").count() == 0 and page.locator("iframe").count() == 0
    page.screenshot(path=str(OUT / "project-detail-1440.png"))
    page.keyboard.press("Escape")
    assert page.locator(".project-detail-overlay").count() == 0
    page.locator(".reference-showcase").screenshot(path=str(OUT / "reference-logos-1440.png"))
    page.close()

    mobile = browser.new_page(viewport={"width": 390, "height": 844})
    assert mobile.goto(DEV + "/projeler", wait_until="networkidle").ok
    mobile.evaluate("document.querySelectorAll('nextjs-portal').forEach(el => el.remove())")
    mobile.locator(".conversion-bar").evaluate("el => el.style.display='none'")
    assert not mobile.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
    mobile.evaluate("""async () => { for (let y = 0; y < document.body.scrollHeight; y += 420) { window.scrollTo(0, y); await new Promise(resolve => setTimeout(resolve, 90)); } window.scrollTo(0, 0); }""")
    assert mobile.locator(".project-card-image img").evaluate_all("images => images.every(image => image.complete && image.naturalWidth > 0)")
    mobile.screenshot(path=str(OUT / "projects-390.png"), full_page=True)
    mobile.locator(".project-card-copy button").first.click()
    assert mobile.locator(".project-detail-overlay").is_visible()
    mobile.locator(".project-detail-cover img").wait_for(state="visible")
    mobile.wait_for_function("document.querySelector('.project-detail-cover img')?.naturalWidth > 0")
    mobile.screenshot(path=str(OUT / "project-detail-390.png"))
    mobile.locator(".project-video").screenshot(path=str(OUT / "project-video-390.png"))
    mobile.locator(".project-gallery button").first.click()
    assert mobile.locator(".project-lightbox").is_visible()
    mobile.keyboard.press("ArrowRight")
    mobile.keyboard.press("Escape")
    assert mobile.locator(".project-lightbox").count() == 0
    mobile.close()

    reduced = browser.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce").new_page()
    reduced.goto(DEV + "/projeler", wait_until="networkidle")
    transition = reduced.locator(".project-card-image img").first.evaluate("el => getComputedStyle(el).transitionDuration")
    assert transition in ("0s", "0ms")
    reduced.close()
    browser.close()

print("PROJECT_QA_OK production_placeholders=0 filters=5 gallery=keyboard video_autoplay=0 screenshots=8")
