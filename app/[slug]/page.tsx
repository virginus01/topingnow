"use client";
import PostBody from "@/app/posts/post_body";
import PopularTopics from "@/app/components/popular_topics";
import ListTable from "@/app/components/list_table";
import { Suspense, useState } from "react";
import Lists from "../posts/lists";
import { notFound } from "next/navigation";
import { useSingleSWR } from "../utils/fetcher";
import { NEXT_PUBLIC_GET_TOPIC } from "@/constants";
import { SingleShimmer } from "../components/shimmer";

export default function Post({ params }: { params: { slug: string } }) {
  const repeat = 2;
  let [data, setData] = useState(SingleShimmer(repeat));

  const url = `${NEXT_PUBLIC_GET_TOPIC}?topicId=${params.slug}`;

  // Slice topics array for current page
  const { result, loading } = useSingleSWR(url);

  if (!loading && !result) {
    notFound();
  }

  if (!loading) {
    data = result;
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center py-12">{data.title}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 lg:fixed top-0 left-0 lg:h-screen p-2 sm:pt-10 mt-8 overflow-y-auto mx-auto">
          <ListTable key="left" topicData={data} />
        </div>
        <section className="w-full md:w-2/4 p-4 mx-auto">
          <article className={`mb-5 ${data.extraClass}`}>
            <PostBody post={data} />
          </article>
          <Lists topicData={data} />
        </section>
        <div className="w-full md:w-1/4 lg:fixed top-0 right-0 lg:h-screen p-2 sm:pt-10 mt-8 overflow-y-auto mx-auto">
          <PopularTopics />
        </div>
      </div>
    </>
  );
}
