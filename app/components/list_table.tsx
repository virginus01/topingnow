"use client";
import { Key } from "react";
import { UrlObject } from "url";
import { NEXT_PUBLIC_GET_LISTS } from "@/constants";
import { usePaginatedSWR } from "../utils/fetcher";
import Shimmer from "./shimmer";

export default function ListTable({ topicData }) {
  const perPage = 10;
  const page = 1;
  const url = `${NEXT_PUBLIC_GET_LISTS}?topicId=${topicData._id}&page=${page}&perPage=${perPage}`;

  // Slice topics array for current page
  const { paginatedData, loading } = usePaginatedSWR(url, page, perPage);

  if (loading || !Array.isArray(paginatedData)) {
    return <Shimmer />;
  }

  if (!paginatedData) {
    return <div>No Topic found</div>;
  }

  const lists = paginatedData;

  return (
    <div className="relative flex sm:py-7">
      <div className="relative  px-1 pb-2 pt-2 sm:mx-auto w-full">
        <div className="relative bg-white pb-3 shadow-xl ring-1 ring-gray-900/5 mb-10 rounded">
          <div className="bg-gray-500 flex items-left justify-left gap-x-4 px-4 py-2 text-xs font-bold text-left text-white">
            List of {topicData.title}
          </div>
          <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
            <div className="line-clamp-1 text-sm leading-6 text-gray-600">
              {lists.map(
                (post: {
                  title: any;
                  _id: Key | null | undefined;
                  slug: string | UrlObject;
                }) => (
                  <a key={post._id} href={`#${post.slug}`}>
                    <div className="flex items-center pt-3">
                      <div className="bg-red-900 w-1 h-1 mr-2 text-sm"></div>
                      <div className="align-middle line-clamp-1 text-transform: lowercase">
                        {post.title}
                      </div>
                    </div>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
