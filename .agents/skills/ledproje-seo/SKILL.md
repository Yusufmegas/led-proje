---
name: ledproje-seo
description: Apply LEDProje's project-specific SEO and content safeguards when creating or auditing landing, product, city, or content pages, and when changing routing. Use for new pages, content additions, SEO audits, and URL or indexability decisions in this repository.
---

# LEDProje SEO

Keep every indexable page aligned with a real user need and LEDProje's project-based sales model. Read the relevant project rules before acting:

- URL ownership and page clusters: `docs/SITE-ARCHITECTURE.md`
- Query-to-page mapping: `docs/KEYWORD-MAP.md`
- Claims and editorial rules: `docs/CONTENT-RULES.md`
- Metadata, crawling and rendering: `docs/TECHNICAL-SEO.md`
- Business strategy and measurement: `docs/SEO-STRATEGY.md`
- Missing evidence: `docs/RESEARCH-TODO.md`

For business model and technical scope, the repository-root `LEDProje_Website_Teknik_SEO_Bilgi_Dosyasi_v3.pdf` is the source of truth. For current route ownership and priority, follow the user's latest decisions as captured in `docs/SITE-ARCHITECTURE.md` and `docs/KEYWORD-MAP.md`. Report any unresolved conflict instead of inventing a resolution.

Use the verified Google Keyword Planner dataset recorded in `docs/KEYWORD-MAP.md` (Türkiye, 1 August 2025–31 July 2026) for demand prioritization. Never treat Google Ads Competition as organic SEO difficulty. Treat top-of-page bid only as a commercial-value/paid-competition signal.

## When this skill applies

Use it when creating or changing a landing page, product page, city page, indexable content, route, canonical, internal link plan, metadata, schema, sitemap/robots behavior, or when performing an SEO audit.

## Page decision workflow

Before implementation or publication, establish:

1. The user's search intent and one primary query or topic.
2. The target URL and whether an existing page already owns the intent.
3. The page type, audience need, conversion action and evidence required.
4. Whether the page deserves crawling and indexing now.

Do not create a new indexable URL when the intent is already served, the content would be a thin variation, or required evidence is unavailable. Recommend consolidation, delayed publication, redirect, or `noindex` as appropriate.

Before proposing a route, check the primary-query owner in `docs/KEYWORD-MAP.md`. A secondary term does not justify a separate URL.

## Business positioning

Position LEDProje as a professional LED display systems integrator and project company, not merely a dealer and never a panel/module manufacturer. It provides nationwide sales and project services, technical consulting, engineering, component sourcing management, project-specific cabinet/enclosure work, power/data and control integration, structural and mechanical installation, alignment, image configuration, testing, commissioning, maintenance and after-sales technical service. Installation and commissioning are performed by LEDProje's own technical team.

Do not use supplier/manufacturer brand names on the website. Clearly distinguish sourced LED panels/modules from LEDProje's verified cabinet, integration, installation and service work. Never claim a panel factory, panel production, production capacity, fabricated scale, market leadership, project count or customer count.

## Required page review

For every affected page, check and report:

- **Search intent:** commercial, informational, local, product or project intent is explicit.
- **Target keyword/topic:** natural topic ownership; no density target.
- **URL:** stable, descriptive and consistent with the architecture.
- **Title and H1:** both support the same intent without forced repetition.
- **Content uniqueness:** the page contributes distinct, useful information.
- **Internal linking:** inbound/outbound links connect the correct page clusters with natural anchors.
- **Canonical:** self-canonical or an intentional alternative based on real duplication.
- **Schema eligibility:** only types and properties supported by visible, verified content.
- **CTA:** Teklif Al, Ücretsiz Keşif, WhatsApp or Uzmanla Görüş fits the intent; no cart or checkout.
- **Crawl/index status:** indexability, sitemap inclusion, robots behavior and status code agree.
- **Cannibalization:** no existing URL competes for the same intent.
- **Local relevance:** city content contains verified local operational value, not a renamed template.
- **Claims:** prices, specifications, projects, customers, certificates and service claims are supported.

## Page-specific safeguards

### Product pages

Do not invent specifications or prices. P2.5, P3, P4, P5 and P10 are P1 pitch opportunities and require a verified product family, manufacturer catalog and datasheet before publication. Each pitch page must provide genuinely different product/use information, not a pitch-name-swapped copy. Mark missing working data as `[TO VERIFY: source needed]`; do not leave placeholders on an indexable production page. Without a real price, do not add `Offer`, price or availability data.

Keep `/dis-mekan-led-ekran` focused on the outdoor product category and `/dis-cephe-led-ekran` focused on building-façade application/project intent. Map `led ekran panel` and `led panel ekran` as secondary terminology in hubs and technical content; never create standalone routes for them.

### City pages

Require verified city-specific discovery, delivery, service, project or operating information. Never produce doorway pages or pages made unique only by replacing the city name. If local evidence is missing, keep the route unpublished/non-indexable or direct users to the general service page.

Use only `/{sehir}-led-ekran`. For every city, `{şehir} led ekran` and `led ekran {şehir}` belong to the same canonical page. Do not create query-order variants, district variants, or nested service-area URLs.

Local priorities:

- P0: İstanbul and Ankara (about 500 searches each).
- P1: İzmir, Antalya, Bursa, Konya, Kayseri and Samsun (about 50 each).
- P2: Erzurum and Amasya (Keyword Planner 10–100 band).
- P3: remaining cities, mostly 0–10 or insufficient data.

The first local wave contains only the ten canonical URLs listed in `docs/SITE-ARCHITECTURE.md`; this is a research/production queue, not permission to index all ten before they are ready. All 81 provinces may eventually be covered because nationwide sales, installation and service are real, but never generate them simultaneously from a renamed template.

For an indexable city page, require sufficient city-specific value selected from: local use cases and commercial/industrial context, suitable product guidance, discovery/engineering approach, installation operations, technical-service model, logistics, city-specific FAQ, real case studies when available, and useful product/service internal links. P0 pages should be the most comprehensive; P1 must meet the same quality standard; P2/P3 open only as evidence and content become sufficient.

The verified center city is İstanbul. Do not invent a street address, branch, office, local team, service point, project, customer or response time in any city. Nationwide sales, installation and technical service may be stated without implying physical local presence.

Add a city URL to the sitemap only when it is complete, canonical, indexable and substantively unique.

### Price guides

Explain the verified factors that shape a project quote and direct the user to discovery or quotation. Do not publish invented price ranges, square-metre prices or urgency claims.

Keep the two P0 intents distinct: `/led-ekran-fiyatlari` owns total project cost factors and quote scope; `/led-ekran-metrekare-fiyati` owns the m² calculation expectation, required measurement/pitch/environment inputs, and why area alone is insufficient.

Never publish a fixed product price, TL/m² price or starting price. Explain measurement, total area, pitch, indoor/outdoor use, viewing distance, brightness, cabinet, control system, structure, installation, access, power/data infrastructure, project location, logistics and service scope. Do not add fake `Offer` data.

### Project and sector pages

Projects require real, permitted evidence. Sector pages must solve a distinct sector problem and must not claim experience that has not been documented.

## Prohibited SEO methods

- No keyword stuffing or mechanical synonym repetition.
- No keyword-density percentage or target.
- No doorway pages, copied city pages or thin query variants.
- No fake price, technical specification, reference, customer, certificate, review or project.
- Do not use canonical or schema to disguise low-value or unsupported content.
- No routes or content for LED screen rental/rental prices; this is outside the business model.
- Exclude TV, television, panel replacement and other consumer-electronics keyword ideas.
- Do not create a “best LED screen companies” comparison or unsupported superiority claims for `led ekran firmaları`.
- Use only the current canonical routes in the architecture, including `/led-ekranlar`, `/led-ekran-montaji`, `/led-ekran-teknik-servis` and `/led-ekran-kontrol-sistemleri`; do not introduce alternative product-hub or nested installation routes.

## Completion output

When the task affects SEO, summarize the chosen intent and target URL, material on-page decisions, internal links, index/canonical/schema status, unresolved `TO VERIFY` items and any cannibalization risk. Treat unresolved evidence as a publication blocker when it supports a material claim.
