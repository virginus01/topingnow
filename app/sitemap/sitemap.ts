import { MetadataRoute, NextApiRequest, NextApiResponse } from "next";
import { topics_for_sitemap } from "@/app/lib/repo/topics_repo";
import {
  construct_sitemap,
  extractNumber,
  isNull,
} from "@/app/utils/custom_helpers";
import { lists_for_sitemap } from "@/app/lib/repo/lists_repo";

export const revalidate = parseInt(String("600"), 10);

export async function generateSitemaps(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = generateObjects();
  return result;
}

export default async function sitemap({
  id,
}: {
  id: any;
}): Promise<MetadataRoute.Sitemap> {
  let result: any = [];
  try {
    const numeric_id = extractNumber(id);
    if (isNull(numeric_id)) {
      result = index_sitemap();
      return result;
    } else if (check_type(id) == "topics") {
      const get_constants = constant_sitemap("topics_0");
      result = [...get_constants, ...(await topics_for_sitemap(numeric_id))];
    } else if (check_type(id) == "lists") {
      const get_constants = constant_sitemap("lists_0");
      result = [...get_constants, ...(await lists_for_sitemap(numeric_id))];
    }
    return result;
  } catch (e) {
    console.error(e);
    result = index_sitemap();
    return result;
  }
}

function construct_sitemap_page(current) {
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 <url>
   <loc>https://acme.com</loc>
   <lastmod>2023-04-06T15:02:24.021Z</lastmod>
   <changefreq>yearly</changefreq>
   <priority>1</priority>
 </url>
 <url>
   <loc>https://acme.com/about</loc>
   <lastmod>2023-04-06T15:02:24.021Z</lastmod>
   <changefreq>monthly</changefreq>
   <priority>0.8</priority>
 </url>
 <url>
   <loc>https://acme.com/blog</loc>
   <lastmod>2023-04-06T15:02:24.021Z</lastmod>
   <changefreq>weekly</changefreq>
   <priority>0.5</priority>
 </url>
</urlset>`;
}

function constant_sitemap(current) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const result: any = [
    {
      url: BASE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  if (current !== "topics_0") {
    result.push({
      url: construct_sitemap("topics_0"),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  if (current !== "lists_0") {
    result.push({
      url: construct_sitemap("lists_0"),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  return result;
}
function index_sitemap() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  return [
    {
      url: BASE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: construct_sitemap("topics_0"),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: construct_sitemap("lists_0"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}

function check_type(str) {
  const isTopics = /topics_\d+/.test(str);
  const isLists = /lists_\d+/.test(str);

  if (isTopics == true) {
    return "topics";
  }

  if (isLists == true) {
    return "lists";
  }
}

function generateObjects() {
  const objects: any = [];
  objects.push({ id: "index" });
  for (let i = 0; i < 500; i++) {
    objects.push({ id: `topics_${i}` });
    objects.push({ id: `lists_${i}` });
  }

  return objects;
}
