"use client";
import PostBody from "@/app/posts/post_body";
import PopularTopics from "@/app/components/popular_topics";
import { getTopicById } from "@/app/lib/repo/topics_repo";
import ListTable from "@/app/components/list_table";
import { Suspense } from "react";
import Lists from "../posts/lists";
import { notFound } from "next/navigation";
import { useSingleSWR } from "../utils/fetcher";
import Loading from "../dashboard/loading";
import { NEXT_PUBLIC_GET_TOPIC } from "@/constants";
import Shimmer from "../components/shimmer";

export default function Post({ params }: { params: { slug: string } }) {
  const url = `${NEXT_PUBLIC_GET_TOPIC}?topicId=${params.slug}`;

  // Slice topics array for current page
  const { result, loading } = useSingleSWR(url);

  if (loading) {
    return <Shimmer />;
  }

  if (!result) {
    return <div>No Topic found</div>;
  }

  const topicData = result;

  if (!topicData || topicData === undefined) {
    notFound();
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center py-12">
        {topicData.title}
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 lg:fixed top-0 left-0 lg:h-screen p-2 sm:pt-10 mt-8 overflow-y-auto mx-auto">
          <ListTable key="left" topicData={topicData} />
        </div>
        <section className="w-full md:w-2/4 p-4 mx-auto">
          <Suspense fallback={<p>Loading article...</p>}>
            <article className="mb-10">
              <PostBody post={topicData} />
              <Lists topicData={topicData} />
            </article>
          </Suspense>
        </section>
        <div className="w-full md:w-1/4 lg:fixed top-0 right-0 lg:h-screen p-2 sm:pt-10 mt-8 overflow-y-auto mx-auto">
          <PopularTopics />
        </div>
      </div>
    </>
  );
}
