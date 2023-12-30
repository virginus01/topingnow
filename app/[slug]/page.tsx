//"use client";
import PostBody from "@/app/posts/post_body";
import PopularTopics from "@/app/components/popular_topics";
import ListTable from "@/app/components/list_table";
import Lists from "../posts/lists";
import { notFound } from "next/navigation";
import { SingleShimmer } from "../components/shimmer";
import { justGetTopicWithEssentials, metaTags } from "../lib/repo/topics_repo";
import {
  countWords,
  getViewUrl,
  isNull,
  stripHtmlTags,
} from "../utils/custom_helpers";
import { schema } from "../layout";
import { buildSchema } from "@/app/seo/schema";
import { Metadata } from "next";
import { ConstructMetadata } from "../seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const result = await justGetTopicWithEssentials(params.slug);

  const breadcrumb: {
    "@type": string;
    position: string;
    item: {
      "@id": string;
      name: string;
    };
  }[] = [];

  breadcrumb.push({
    "@type": "ListItem",
    position: "1",
    item: {
      "@id": getViewUrl("", "topic"),
      name: "Home",
    },
  });

  breadcrumb.push({
    "@type": "ListItem",
    position: "2",
    item: {
      "@id": getViewUrl("", "topic"),
      name: result.title,
    },
  });

  schema.data = buildSchema(
    getViewUrl(result.slug, "topic"),
    "Topingnow",
    "/images/logo.png",
    breadcrumb,
    result
  );

  return ConstructMetadata(result) as {};
}

export default async function Post({ params }: { params: { slug: string } }) {
  const repeat = 2;
  const page = 1;

  let data = SingleShimmer(repeat);
  const result = await justGetTopicWithEssentials(params.slug, page);

  if (result) {
    data = result;
  }

  if (isNull(result)) {
    notFound();
  }

  const metadata = await generateMetadata({ params });

  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-bold text-center py-12 bg-white">
          {data.title}
        </h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 lg:fixed top-0 left-0 lg:h-screen p-2 sm:pt-10 mt-8 overflow-y-auto mx-auto">
            <ListTable key="left" topicData={data} />
          </div>
          <section className="w-full md:w-2/4 p-4 mx-auto">
            <article
              className={`mb-5 bg-white shadow-xl ring-1 ring-gray-900/5 rounded`}
            >
              <PostBody post={data} />
            </article>
            <Lists topicData={data} />
          </section>
          <div className="w-full md:w-1/4 lg:fixed top-0 right-0 lg:h-screen p-2 sm:pt-10 mt-8 overflow-y-auto mx-auto">
            <PopularTopics _id={data._id} />
          </div>
        </div>
      </div>
    </>
  );
}
