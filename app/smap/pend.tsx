import { getPopularTopics } from "@/app/lib/repo/topics_repo";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPopularTopics();
  let pAr: Array<{
    url: any;
    lastModified: any;
    changeFrequency: any;
    priority: any;
  }> = [];

  if (posts) {
    pAr = posts.map((post: { slug: string }) => {
      return {
        url: post.slug,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      };
    });
  }

  return [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...pAr,
  ];
}
