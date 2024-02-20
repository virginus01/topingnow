import { MetadataRoute, NextApiRequest, NextApiResponse } from "next";
import { topics_for_sitemap } from "./lib/repo/topics_repo";
import {
  construct_sitemap,
  extractNumber,
  isNull,
} from "./utils/custom_helpers";
import { lists_for_sitemap } from "./lib/repo/lists_repo";

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
  const numeric_id = extractNumber(id);
  const result: any = [];

  if (isNull(numeric_id)) {
    const result: any = index_sitemap();
    return result;
  }

  if (check_type(id) == "topics") {
    const get_constants = constant_sitemap("topics_0");
    return [...get_constants, ...(await topics_for_sitemap(numeric_id))];
  }

  if (check_type(id) == "lists") {
    const get_constants = constant_sitemap("lists_0");
    return [...get_constants, ...(await lists_for_sitemap(numeric_id))];
  }

  return result;
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
