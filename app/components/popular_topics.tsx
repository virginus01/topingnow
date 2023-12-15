"use client";
import { Key } from "react";
import PostListItem from "@/app/posts/post_lists_items";
import Link from "next/link";
import { UrlObject } from "url";
import { NEXT_PUBLIC_GET_POPULAR_TOPICS } from "@/constants";
import { usePaginatedSWR } from "../utils/fetcher";
import Shimmer from "./shimmer";

export default function PopularTopics() {
  const perPage = 10;
  const page = 1;
  const url = `${NEXT_PUBLIC_GET_POPULAR_TOPICS}?page=${page}&perPage=${perPage}`;

  // Slice topics array for current page
  const { paginatedData, loading } = usePaginatedSWR(url, page, perPage);

  if (loading || !Array.isArray(paginatedData)) {
    return <Shimmer />;
  }

  if (!paginatedData) {
    return <div>No Topic found</div>;
  }

  return (
    <div className="relative flex sm:py-7">
      <div className="relative px-1 pb-2 pt-2 sm:mx-auto w-full sm:px-2">
        <div className="relative bg-white pb-3 shadow-xl ring-1 ring-gray-900/5 mb-10 rounded">
          <div className="bg-gray-500 flex items-left justify-left gap-x-4 px-4 py-2 text-xs font-bold text-left text-white">
            Popular Topics
          </div>
          <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
            <div className="text-sm leading-6 text-gray-600">
              {paginatedData.map(
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
  );
}
