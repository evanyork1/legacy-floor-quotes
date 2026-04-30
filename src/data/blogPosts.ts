import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: string;
  /** Alias kept for legacy components. */
  image: string;
  author: string;
  /** ISO 8601 date used for schema.org and sorting. */
  publishedDate: string;
  /** Human-readable date derived from publishedDate. */
  date: string;
  readTime?: string;
  location?: string;
  tags?: string[];
  featured?: boolean;
}

export const BLOG_CATEGORIES = [
  "Garage Floors",
  "Commercial Flooring",
  "Industrial Coatings",
  "Concrete Polishing",
  "Maintenance & Care",
  "Project Spotlights",
] as const;

const formatDate = (iso: string): string => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  featured_image: string | null;
  author: string | null;
  published_date: string | null;
  published: boolean | null;
}

const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "Garage Floors": "https://legacyindustrialcoatings.com/lovable-uploads/81d99e2b-0038-4ac2-8f7d-2f89d32a8560.png",
  "Commercial Flooring": "https://legacyindustrialcoatings.com/lovable-uploads/fa247baa-ccf6-438b-b7b1-47d07ae07d74.png",
  "Industrial Coatings": "https://legacyindustrialcoatings.com/lovable-uploads/d1b328fa-3e30-4126-8266-ae64a33edd79.png",
  "Concrete Polishing": "https://legacyindustrialcoatings.com/lovable-uploads/171b7f71-4aa3-4b54-8c96-5f7143dddebf.png",
  "Maintenance & Care": "https://legacyindustrialcoatings.com/lovable-uploads/7a02cc67-38e9-4f07-9b6e-e051b18f52a2.png",
  "Project Spotlights": "https://byvazfrvoanojfayvsaz.supabase.co/storage/v1/object/public/gallery-images/gallery/1750507958996-6.png",
};

const mapRow = (row: BlogPostRow): BlogPost => {
  const category = row.category ?? "Uncategorized";
  const featured = row.featured_image && row.featured_image.trim() !== "" ? row.featured_image : null;
  const image = featured || CATEGORY_FALLBACK_IMAGES[category] || "/placeholder.svg";
  const publishedDate = row.published_date ?? new Date().toISOString();
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    content: row.content ?? "",
    category: row.category ?? "Uncategorized",
    featuredImage: image,
    image,
    author: row.author ?? "Legacy Industrial Coatings Team",
    publishedDate,
    date: formatDate(publishedDate),
  };
};

export const fetchSortedPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, content, category, featured_image, author, published_date, published")
    .eq("published", true)
    .order("published_date", { ascending: false });

  if (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
  return (data ?? []).map(mapRow);
};

export const fetchPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, content, category, featured_image, author, published_date, published")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch blog post:", error);
    return null;
  }
  return data ? mapRow(data) : null;
};
