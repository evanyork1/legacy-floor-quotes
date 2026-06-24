// Public dynamic sitemap. Always reflects:
// - All public pages (hard-coded list, mirrors Header dropdowns + App.tsx routes)
// - All published blog posts (read-only SELECT on blog_posts)
// - All static case study slugs

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SITE = "https://legacyindustrialcoatings.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface UrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

const today = new Date().toISOString().slice(0, 10);

// Static public pages — keep in sync with Header dropdowns
const staticUrls: UrlEntry[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0", lastmod: today },

  // Residential
  { loc: "/garagefloors", changefreq: "monthly", priority: "0.8", lastmod: today },
  { loc: "/residential-patio", changefreq: "monthly", priority: "0.8", lastmod: today },
  { loc: "/residential-case-studies", changefreq: "monthly", priority: "0.7", lastmod: today },

  // Commercial
  { loc: "/commercial", changefreq: "monthly", priority: "0.8", lastmod: today },
  { loc: "/commercialfloors", changefreq: "monthly", priority: "0.8", lastmod: today },
  { loc: "/flake-floors", changefreq: "monthly", priority: "0.8", lastmod: today },
  { loc: "/industrial-epoxy", changefreq: "monthly", priority: "0.8", lastmod: today },
  { loc: "/concrete-polishing", changefreq: "monthly", priority: "0.8", lastmod: today },
  { loc: "/concrete-sealing", changefreq: "monthly", priority: "0.8", lastmod: today },
  { loc: "/commercial-case-studies", changefreq: "monthly", priority: "0.7", lastmod: today },
  { loc: "/about-commercial", changefreq: "monthly", priority: "0.7", lastmod: today },

  // About dropdown
  { loc: "/about", changefreq: "monthly", priority: "0.7", lastmod: today },
  { loc: "/gallery", changefreq: "monthly", priority: "0.7", lastmod: today },
  { loc: "/blog", changefreq: "weekly", priority: "0.7", lastmod: today },
  { loc: "/faq", changefreq: "monthly", priority: "0.7", lastmod: today },
  { loc: "/financing", changefreq: "monthly", priority: "0.6", lastmod: today },

  // Top-level
  { loc: "/case-studies", changefreq: "monthly", priority: "0.8", lastmod: today },
  { loc: "/contact", changefreq: "monthly", priority: "0.6", lastmod: today },

  // Service area / regional
  { loc: "/service-areas", changefreq: "monthly", priority: "0.7", lastmod: today },

  // Tools / utility
  { loc: "/floor-visualizer", changefreq: "monthly", priority: "0.7", lastmod: today },

  // Legal
  { loc: "/warranty", changefreq: "yearly", priority: "0.4", lastmod: today },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3", lastmod: today },
  { loc: "/terms", changefreq: "yearly", priority: "0.3", lastmod: today },
];

// Static case study slugs (mirror src/data/caseStudies.ts)
const commercialCaseStudies = [
  "fast-casual-restaurant-concrete-sealing",
  "pharmaceutical-manufacturing-polished-concrete",
  "dog-training-grooming-facility-flake-floor",
  "swim-school-flake-floor-multi-location",
  "restaurant-pump-room-integrated-cove-base",
];
const residentialCaseStudies = [
  "argyle-luxury-home-metallic-floor-tear-out-redo",
];

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  }[c]!));
}

function urlBlock(u: UrlEntry): string {
  const parts = [`    <loc>${escapeXml(SITE + u.loc)}</loc>`];
  if (u.lastmod) parts.push(`    <lastmod>${u.lastmod}</lastmod>`);
  if (u.changefreq) parts.push(`    <changefreq>${u.changefreq}</changefreq>`);
  if (u.priority) parts.push(`    <priority>${u.priority}</priority>`);
  return `  <url>\n${parts.join("\n")}\n  </url>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const urls: UrlEntry[] = [...staticUrls];

  // Case study detail pages
  for (const slug of commercialCaseStudies) {
    urls.push({
      loc: `/commercial-case-studies/${slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: today,
    });
  }
  for (const slug of residentialCaseStudies) {
    urls.push({
      loc: `/residential-case-studies/${slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: today,
    });
  }

  // Published blog posts
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
    );
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, published_date")
      .eq("published", true);

    if (error) {
      console.error("blog_posts query error:", error.message);
    } else if (data) {
      for (const row of data) {
        if (!row.slug) continue;
        const lastmod = row.published_date
          ? String(row.published_date).slice(0, 10)
          : today;
        urls.push({
          loc: `/blog/${row.slug}`,
          lastmod,
          changefreq: "monthly",
          priority: "0.6",
        });
      }
    }
  } catch (e) {
    console.error("Sitemap blog fetch failed:", e);
    // Still return the static portion of the sitemap
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(urlBlock).join("\n")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=900",
    },
  });
});
