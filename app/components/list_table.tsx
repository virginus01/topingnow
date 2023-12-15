"use client";
import { Key, useState } from "react";
import { UrlObject } from "url";
import { NEXT_PUBLIC_GET_LISTS } from "@/constants";
import { usePaginatedSWR } from "../utils/fetcher";
import Shimmer from "./shimmer";
import PostListItem from "@/app/posts/post_lists_items";

export default function ListTable({ topicData }) {
  const perPage = 3;
  const page = 1;
  let [data, setData] = useState(Shimmer(perPage));

  const url = `${NEXT_PUBLIC_GET_LISTS}?topicId=${topicData._id}&page=${page}&perPage=${perPage}`;

  // Slice topics array for current page
  const { paginatedData, loading } = usePaginatedSWR(url, page, perPage);

  if (!loading) {
    data = paginatedData;
  }
  if (data.length == 0) {
    data = Shimmer(perPage);
  }

  return (
    <div className="relative flex sm:py-7">
      <div className="relative  px-1 pb-2 pt-2 sm:mx-auto w-full">
        <div className="relative bg-white pb-3 shadow-xl ring-1 ring-gray-900/5 mb-10 rounded">
          <div className="bg-gray-500 flex items-left justify-left gap-x-4 px-4 py-2 text-xs font-bold text-left text-white">
            List of {topicData.title}
          </div>
          <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
            <div className="line-clamp-1 text-sm leading-6 text-gray-600">
              <ul className="ml-1 inline-block w-[500px]">
                {data.map((post: { _id; title; slug; extraClass }) => {
                  const modifiedPost = {
                    ...post,
                    slug: `${topicData.slug}#${post.slug}`,
                  };
                  return <PostListItem data={modifiedPost} key={post._id} />;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
