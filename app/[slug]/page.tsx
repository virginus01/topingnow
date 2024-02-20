//"use client";
import PostBody from "@/app/posts/post_body";
import PopularTopics from "@/app/components/popular_topics";
import ListTable from "@/app/components/list_table";
import Lists from "../posts/lists";
import { notFound } from "next/navigation";
import { SingleShimmer } from "../components/shimmer";
import { getTopic, metaTags, topicMetaTags } from "../lib/repo/topics_repo";
import {
  countWords,
  getViewUrl,
  isNull,
  stripHtmlTags,
} from "../utils/custom_helpers";
import { generateMetadata, schema } from "../layout";
import { buildSchema } from "@/app/seo/schema";
import { Metadata } from "next";
import { ConstructMetadata } from "../seo/metadata";
import Image from "next/image";
import { TOPIC_IMAGE } from "@/constants";

async function generateMetadataAndTags(data) {
  const finalData = await topicMetaTags(data);
  await generateMetadata({
    params: { slug: data.slug },
    data: finalData,
    breadcrumbData: [{ title: data.title, url: "" }],
  });
}

export default async function Post({ params }: { params: { slug: string } }) {
  const repeat = 2;
  const page = 1;

  let data: any = {};
  const result = await getTopic(params.slug, page);

  if (result) {
    data = result;
  }

  if (isNull(result)) {
    notFound();
  }

  await generateMetadataAndTags(data);
  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-bold text-center py-12 bg-white">
          {data.title}
        </h1>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 lg:fixed top-0 left-0 lg:h-screen p-2 sm:pt-10 mt-8 overflow-y-auto mx-auto z-0">
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
