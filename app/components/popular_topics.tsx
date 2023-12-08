import { Key } from "react";
import PostListItem from "@/app/posts/post_lists_items";
import Link from "next/link";
import { UrlObject } from "url";
import { getPopularTopics } from "../lib/repo/topics_repo";
import { Suspense } from "react";
import { useState, useEffect } from "react";

const Shimmer = () => (
  <div className="animate-pulse">
    <div className="relative flex sm:py-7">
      <div className="relative bg-white px-1 pb-2 pt-2 sm:mx-auto w-full sm:px-2">
        <div className="relative bg-white pb-3 shadow-xl ring-1 ring-gray-900/5 mb-10">
          <div className="bg-gray-500 flex items-left justify-left gap-x-4 px-4 py-2 text-xs font-bold text-left text-white">
            Popular Topics
          </div>
          <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
            <div className="line-clamp-1 text-sm leading-6 text-gray-600">
              {[1, 2, 3, 4, 5].map((id) => (
                <div
                  key={id}
                  className="text-white h-5 w-full border-t border-gray-100 my-4"
                >
                  {" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default async function PopularTopics() {
  const popularTopics = await getPopularTopics();

  if (
    !popularTopics ||
    popularTopics == undefined ||
    !Array.isArray(popularTopics)
  ) {
    console.log(popularTopics);
    return <div>loading...</div>;
  }

  return (
    <Suspense fallback={<Shimmer />}>
      <div className="relative flex sm:py-7">
        <div className="relative px-1 pb-2 pt-2 sm:mx-auto w-full sm:px-2">
          <div className="relative bg-white pb-3 shadow-xl ring-1 ring-gray-900/5 mb-10 rounded">
            <div className="bg-gray-500 flex items-left justify-left gap-x-4 px-4 py-2 text-xs font-bold text-left text-white">
              Popular Topics
            </div>
            <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
              <div className="text-sm leading-6 text-gray-600">
                {popularTopics.map(
                  (
                    post: {
                      id: Key | null | undefined;
                      _id: Key | null | undefined;
                      slug: string | UrlObject;
                    },
                    index
                  ) => (
                    <Link key={index} href={`/${post.slug}`}>
                      {<PostListItem post={post} />}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
