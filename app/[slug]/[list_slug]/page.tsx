import ListBody from "@/app/posts/list_body";
import PopularTopics from "@/app/components/popular_topics";
import { notFound } from "next/navigation";
import { getListById, listMetaTags } from "@/app/lib/repo/lists_repo";
import {
  base_url,
  generateBreadcrumb,
  isNull,
} from "@/app/utils/custom_helpers";
import QandAs from "@/app/posts/qandas";
import PopularLists from "@/app/components/popular_lists";
import { getListReviews } from "@/app/lib/repo/reviews_repo";
import { Metadata } from "next";
import { ConstructMetadata } from "@/app/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: { list_slug: string; slug: string };
}): Promise<Metadata> {
  const data = await getListById(params.list_slug);

  return (await ConstructMetadata(data)) as Metadata;
}

export default async function ListView({
  params,
}: {
  params: { list_slug: string; slug: string };
}) {
  const result = await getListById(params.list_slug);

  if (
    isNull(result) ||
    !result.topicData ||
    params.slug !== result.topicData.slug
  ) {
    notFound();
  }

  const data = result;

  const reviews = await getListReviews(data._id);

  await generateMetadata({ params });

  return (
    <main>
      <h1 className="text-2xl font-bold text-left pb-12 pt-6 ml-10">
        {data.title}
      </h1>
      <div className="relative  z-0">
        <div className="w-full lg:w-7/12 lg:mt-2 mt-2 lg:ml-4">
          <ListBody post={data} reviews={reviews} />
          <QandAs listData={data} />
        </div>

        <div className="w-full lg:w-1/5 lg:h-screen lg:mt-12 mt-2 lg:fixed lg:ml-14 lg:left-2/3 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2">
          <PopularLists _id={data._id} />
        </div>

        <div className="w-full lg:w-1/5 lg:h-screen lg:mt-12 mt-2 top-0 right-0 lg:fixed">
          <PopularTopics _id={data._id} />
        </div>
      </div>
    </main>
  );
}
