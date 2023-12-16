"use client";
import React, { useState } from "react";
import ListBody from "@/app/posts/list_body";
import SideBar from "@/app/components/sidebar";
import PopularTopics from "@/app/components/popular_topics";
import { NEXT_PUBLIC_GET_LIST } from "@/constants";
import { useSingleSWR } from "@/app/utils/fetcher";
import { notFound } from "next/navigation";
import { SingleShimmer } from "@/app/components/shimmer";

export default function ListView({
  params,
}: {
  params: { list_slug: string };
}) {
  const repeat = 2;
  let [data, setData] = useState(SingleShimmer(repeat));

  const url = `${NEXT_PUBLIC_GET_LIST}?listId=${params.list_slug}`;

  // Slice topics array for current page
  const { result, loading } = useSingleSWR(url);

  if (!loading && !result) {
    notFound();
  }

  if (!loading) {
    data = result;
  }

  const sideBarItemList = [
    {
      _id: 4,
      title: "Popular Post 1",
      slug: "/",
    },
    {
      _id: 5,
      title: "Popular Post 2 test but test still testing but is okay",
      slug: "/",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-left pt-12 ml-5">{data.title}</h1>

      <div className="flex flex-col md:flex-row">
        <div className="w-full lg:w-3/5">
          <ListBody post={data} />
        </div>

        <div className="w-full lg:w-1/5 lg:h-screen lg:mt-12 mt-2 lg:fixed lg:ml-14 lg:left-2/3 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2">
          <SideBar data={sideBarItemList} />
        </div>

        <div className="w-full lg:w-1/5 lg:h-screen lg:mt-12 mt-2 top-0 right-0 lg:fixed">
          <PopularTopics _id={data._id} />
        </div>
      </div>
    </>
  );
}
