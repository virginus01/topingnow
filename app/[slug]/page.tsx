//"use client";
import PostBody from "@/app/posts/post_body";
import PopularTopics from "@/app/components/popular_topics";
import ListTable from "@/app/components/list_table";
import Lists from "../posts/lists";
import { notFound } from "next/navigation";
import { NEXT_PUBLIC_GET_TOPIC_WITH_ESSENTIALS } from "@/constants";
import { SingleShimmer } from "../components/shimmer";
import { justGetTopicWithEssentials } from "../lib/repo/topics_repo";

export default async function Post({ params }: { params: { slug: string } }) {
  const repeat = 2;
  const page = 1;

  let data = SingleShimmer(repeat);
  const result = await justGetTopicWithEssentials(params.slug, page);

  if (result) {
    data = result;
  }

  if (!result) {
    notFound();
  }

  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-bold text-center py-12">{data.title}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 lg:fixed top-0 left-0 lg:h-screen p-2 sm:pt-10 mt-8 overflow-y-auto mx-auto">
            <ListTable key="left" topicData={data} />
          </div>
          <section className="w-full md:w-2/4 p-4 mx-auto">
            <article className={`mb-5`}>
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
