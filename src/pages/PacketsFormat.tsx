import { Seo } from '@/components/seo/Seo';

// Hidden internal tool page — not linked anywhere, not in sitemap, noindexed.
export default function PacketsFormat() {
  return (
    <>
      <Seo
        title="Packets Format | Legacy Industrial Coatings"
        description="Internal tool."
        path="/packetsformat"
        noindex
      />
      <iframe
        src="/packetsformat.html"
        title="Legacy Proposal Builder"
        style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
      />
    </>
  );
}
