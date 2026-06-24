#!/usr/bin/env node
/**
 * Last-mile SEO safety net for crawlers that receive the built HTML before
 * React executes. If prerendering ever emits an empty SPA shell, this injects
 * route-specific crawlable body copy into #root and creates /commercial/ from
 * the built app shell when needed. React replaces this content for normal
 * visitors as soon as the app loads.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const DIST = resolve(process.cwd(), "dist");
const SITE = "https://legacyindustrialcoatings.com";

const pages = [
  {
    route: "/",
    file: "index.html",
    title: "Legacy Industrial Coatings | Epoxy & Polished Concrete DFW",
    description:
      "Premium epoxy flooring, polyurea garage coatings and mechanical polished concrete across Dallas-Fort Worth. Lifetime warranty, licensed and insured crews, and 190+ reviews.",
    url: SITE,
    image: "/lovable-uploads/e90dc902-382c-49a1-92b3-46b9b06b6a4b.png",
    markers: ["polyurea", "warranty", "polished concrete"],
    body: `
      <main id="crawl-home" aria-label="Legacy Industrial Coatings homepage">
        <section>
          <p>Legacy Industrial Coatings</p>
          <h1>DFW Epoxy Flooring, Polyurea Garage Coatings & Polished Concrete</h1>
          <p>Legacy Industrial Coatings installs premium residential and commercial floor systems across Dallas-Fort Worth. Our crews specialize in one-day polyurea garage floor coatings, industrial epoxy flooring, mechanical polished concrete, decorative flake floors, patios, warehouses, restaurants, retail stores, aircraft hangars, manufacturing plants, and high-traffic commercial facilities.</p>
          <p>Homeowners choose Legacy for garage floors that look clean, resist hot tire pickup, and carry a limited lifetime warranty. Facility managers choose Legacy for dense, durable systems that can handle forklifts, chemical exposure, foot traffic, service bays, commercial kitchens, and operational downtime windows.</p>
        </section>
        <section>
          <h2>Premium Floor Coating Services in Dallas-Fort Worth</h2>
          <article>
            <h3>Polyurea Garage Floor Coatings</h3>
            <p>Our standard residential system is a professionally prepared polyurea flake floor designed for garages, workshops, and utility spaces. The process includes mechanical grinding, crack repair where needed, a durable base coat, full flake broadcast, and a clear topcoat built for long-term protection.</p>
          </article>
          <article>
            <h3>Industrial Epoxy Flooring</h3>
            <p>Heavy-duty epoxy and hybrid coating systems are available for warehouses, airplane hangars, automotive shops, manufacturing facilities, restaurants, distribution centers, schools, retail stores, medical facilities, and other demanding commercial environments.</p>
          </article>
          <article>
            <h3>Mechanical Polished Concrete</h3>
            <p>Diamond-ground, densified, and burnished polished concrete delivers a clean, low-maintenance surface for commercial spaces throughout DFW. Polished concrete is ideal for warehouses, showrooms, retail spaces, restaurants, offices, and industrial facilities that need durable floors with a professional finish.</p>
          </article>
          <article>
            <h3>Concrete Sealing and Patio Coatings</h3>
            <p>Legacy also installs concrete sealing, patio coatings, decorative flake systems, and specialty coatings for spaces that need protection from moisture, traffic, abrasion, stains, and daily use.</p>
          </article>
        </section>
        <section>
          <h2>Why DFW Customers Choose Legacy</h2>
          <ul>
            <li>Residential polyurea garage floors backed by a limited lifetime warranty.</li>
            <li>Commercial and industrial flooring systems matched to each facility and use case.</li>
            <li>Mechanical surface preparation for stronger adhesion and longer service life.</li>
            <li>Experienced crews serving Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Prosper, Celina, Flower Mound, Lewisville, Richardson, Carrollton, The Colony, Sherman, Anna, Melissa, Sanger, and the broader North Texas region.</li>
            <li>More than 190 reviews from customers who expect a premium experience without babysitting the contractor.</li>
          </ul>
        </section>
        <section>
          <h2>Dallas-Fort Worth Flooring FAQ</h2>
          <h3>What flooring services do you offer in DFW?</h3>
          <p>Legacy installs premium polyurea garage floor coatings, high-traffic epoxy systems, mechanical polished concrete, industrial floor coatings, decorative flake floors, concrete sealing, and specialty waterproofing across Dallas-Fort Worth.</p>
          <h3>How long does an epoxy garage floor coating take?</h3>
          <p>Most residential garage floor coating projects are completed in one day and are ready for vehicles after the recommended cure window.</p>
          <h3>Do you provide commercial polished concrete?</h3>
          <p>Yes. Legacy delivers mechanical concrete polishing for warehouses, retail stores, restaurants, manufacturing facilities, offices, and showrooms throughout North Texas.</p>
          <h3>Are installations warrantied?</h3>
          <p>Residential polyurea garage floor coatings carry a limited lifetime warranty. Commercial and industrial epoxy projects are backed by system-specific manufacturer warranties and project documentation.</p>
        </section>
        <section>
          <h2>Request a Floor Coating Estimate</h2>
          <p>Call Legacy Industrial Coatings at 214-305-6516 or request an estimate for garage floors, epoxy flooring, polished concrete, commercial flooring, industrial coatings, and concrete sealing in Dallas-Fort Worth.</p>
          <p><a href="/garagefloors">Garage floor coatings</a> · <a href="/commercial">Commercial flooring</a> · <a href="/concrete-polishing">Concrete polishing</a> · <a href="/industrial-epoxy">Industrial epoxy</a> · <a href="/contact">Contact Legacy Industrial Coatings</a></p>
        </section>
      </main>
    `,
  },
  {
    route: "/commercial",
    file: "commercial/index.html",
    title: "Commercial Epoxy Flooring DFW | Legacy Industrial Coatings",
    description:
      "Large-scale commercial epoxy flooring and polished concrete in Dallas-Fort Worth for warehouses, dealerships, industrial facilities, restaurants, retail spaces and more.",
    url: `${SITE}/commercial`,
    image: "/lovable-uploads/171b7f71-4aa3-4b54-8c96-5f7143dddebf.png",
    markers: ["warehouse", "polished concrete", "commercial flooring"],
    body: `
      <main id="crawl-commercial" aria-label="Commercial flooring page">
        <section>
          <p>Legacy Industrial Coatings Commercial Division</p>
          <h1>Commercial Epoxy Flooring, Industrial Coatings & Polished Concrete in DFW</h1>
          <p>Legacy Industrial Coatings installs large-scale commercial flooring systems across Dallas-Fort Worth for warehouses, manufacturing plants, logistics facilities, airplane hangars, automotive dealerships, commercial kitchens, restaurants, retail stores, schools, churches, medical facilities, food processing spaces, dog kennels, wedding venues, and distribution centers.</p>
          <p>Our commercial team helps general contractors, facility managers, warehouse operators, property managers, and business owners select floor systems that fit traffic, chemical exposure, cleaning requirements, slip resistance, schedule constraints, and long-term maintenance expectations.</p>
        </section>
        <section>
          <h2>Commercial Floor Solutions</h2>
          <article>
            <h3>Concrete Polishing</h3>
            <p>Mechanical polished concrete creates a dense, refined finish for warehouses, retail stores, restaurants, showrooms, manufacturing spaces, and high-traffic commercial interiors. The process can include grinding, densifying, honing, polishing, burnishing, guard application, and joint or crack detailing depending on the slab and performance target.</p>
          </article>
          <article>
            <h3>Industrial Epoxy</h3>
            <p>Industrial epoxy systems are built for manufacturing, warehousing, aviation, automotive service, food processing, and heavy-use facilities. Available systems can address impact resistance, chemical resistance, abrasion, moisture mitigation, cleanability, slip resistance, traffic lanes, safety striping, and operational uptime.</p>
          </article>
          <article>
            <h3>Decorative Flake Floors</h3>
            <p>Commercial flake flooring provides a durable, clean, slip-resistant finish for restaurants, restrooms, locker rooms, retail stores, offices, showrooms, healthcare spaces, and service areas. Flake systems hide imperfections while delivering a professional finish that is easy to maintain.</p>
          </article>
          <article>
            <h3>Specialty Coatings</h3>
            <p>Specialty commercial coatings are available for spaces requiring chemical resistance, waterproofing, anti-slip textures, fast return-to-service windows, decorative finishes, high-build protection, or facility-specific performance criteria.</p>
          </article>
        </section>
        <section>
          <h2>Commercial Spaces We Install</h2>
          <ul>
            <li>Warehouses and distribution centers</li>
            <li>Manufacturing plants and industrial facilities</li>
            <li>Airplane and helicopter hangars</li>
            <li>Car dealerships, service bays, and automotive shops</li>
            <li>Commercial kitchens, restaurants, and food processing facilities</li>
            <li>Retail stores, offices, showrooms, schools, churches, and medical facilities</li>
            <li>Dog kennels, wedding venues, storage spaces, and multi-use commercial properties</li>
          </ul>
        </section>
        <section>
          <h2>Built for Facility Managers and General Contractors</h2>
          <p>Commercial flooring projects require more than a pretty sample board. Legacy helps define surface preparation, coating system selection, phasing, cure windows, substrate conditions, moisture concerns, traffic patterns, cleanup expectations, warranty alignment, and long-term maintenance. The goal is a premium experience with no babysitting: clear communication, realistic scheduling, documented scope, and a floor system matched to the facility.</p>
          <p>For large spaces, Legacy can evaluate slab condition, recommend polished concrete or epoxy alternatives, coordinate with project teams, and deliver a commercial quote that gives decision makers the information they need before work begins.</p>
        </section>
        <section>
          <h2>Request a Commercial Flooring Quote</h2>
          <p>Call 214-305-6516 or contact Legacy Industrial Coatings for commercial epoxy flooring, industrial floor coatings, polished concrete, warehouse flooring, restaurant flooring, retail flooring, hangar flooring, and facility flooring projects across Dallas-Fort Worth.</p>
          <p><a href="/contact">Contact Legacy Industrial Coatings</a> · <a href="/concrete-polishing">Concrete polishing</a> · <a href="/industrial-epoxy">Industrial epoxy</a> · <a href="/flake-floors">Flake floors</a> · <a href="/commercialfloors">Commercial floor systems</a></p>
        </section>
      </main>
    `,
  },
];

const normalize = (value) => value.replace(/\s+/g, " ").trim();

function bodyOf(html) {
  return html.split(/<\/head>/i)[1] ?? html;
}

function hasRouteContent(html, markers) {
  const body = bodyOf(html).toLowerCase();
  const hasEmptyRoot = /<div\s+id=["']root["']\s*>\s*<\/div>/i.test(html);
  return !hasEmptyRoot && markers.every((marker) => body.includes(marker.toLowerCase()));
}

function injectRoot(html, fallbackBody) {
  const rootPattern = /<div\s+id=["']root["'][^>]*>[\s\S]*?<\/div>\s*(?=<script\b)/i;
  const root = `<div id="root">${normalize(fallbackBody)}</div>`;
  if (rootPattern.test(html)) return html.replace(rootPattern, root);
  return html.replace(/<body([^>]*)>/i, `<body$1>${root}`);
}

function setTitle(html, title) {
  if (/<title[^>]*>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  }
  return html.replace(/<head([^>]*)>/i, `<head$1><title>${title}</title>`);
}

function upsertMetaName(html, name, content) {
  const tag = `<meta name="${name}" content="${content.replace(/"/g, "&quot;")}" />`;
  const re = new RegExp(`<meta[^>]+name=["']${name}["'][^>]*>`, "i");
  return re.test(html) ? html.replace(re, tag) : html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function upsertMetaProperty(html, property, content) {
  const tag = `<meta property="${property}" content="${content.replace(/"/g, "&quot;")}" />`;
  const re = new RegExp(`<meta[^>]+property=["']${property}["'][^>]*>`, "i");
  return re.test(html) ? html.replace(re, tag) : html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function upsertCanonical(html, href) {
  const tag = `<link rel="canonical" href="${href}" />`;
  const re = /<link[^>]+rel=["']canonical["'][^>]*>/i;
  return re.test(html) ? html.replace(re, tag) : html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function updateHead(html, page) {
  let out = setTitle(html, page.title);
  out = upsertMetaName(out, "description", page.description);
  out = upsertMetaProperty(out, "og:title", page.title);
  out = upsertMetaProperty(out, "og:description", page.description);
  out = upsertMetaProperty(out, "og:url", page.url);
  out = upsertMetaProperty(out, "og:image", page.image);
  out = upsertCanonical(out, page.url);
  return out;
}

const homePath = resolve(DIST, "index.html");
if (!existsSync(homePath)) {
  console.warn("[inject-static-fallbacks] dist/index.html not found; skipping.");
  process.exit(0);
}

const baseHtml = readFileSync(homePath, "utf8");

for (const page of pages) {
  const filePath = resolve(DIST, page.file);
  const source = existsSync(filePath) ? readFileSync(filePath, "utf8") : baseHtml;
  let html = updateHead(source, page);

  if (!hasRouteContent(html, page.markers)) {
    html = injectRoot(html, page.body);
    console.log(`[inject-static-fallbacks] Injected crawlable body for ${page.route}`);
  }

  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}