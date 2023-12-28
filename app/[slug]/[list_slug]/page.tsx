import React, { useState } from "react";
import ListBody from "@/app/posts/list_body";
import SideBar from "@/app/components/sidebar";
import PopularTopics from "@/app/components/popular_topics";
import { notFound } from "next/navigation";
import { SingleShimmer } from "@/app/components/shimmer";
import { getListById, listMetaTags } from "@/app/lib/repo/lists_repo";
import { getViewUrl, isNull } from "@/app/utils/custom_helpers";
import { metadata, schema } from "@/app/layout";
import { buildSchema } from "@/app/seo/schema";

export default async function ListView({
  params,
}: {
  params: { list_slug: string; slug: string };
}) {
  const result = await getListById(params.list_slug);

  if (isNull(result) || params.slug !== result.topicData.slug) {
    notFound();
  }

  const data = result;

  try {
    await listMetaTags(metadata, data);
  } catch (e) {
    console.log(e);
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
      "@id": getViewUrl(""),
      name: "Home",
    },
  });

  breadcrumb.push({
    "@type": "ListItem",
    position: "2",
    item: {
      "@id": getViewUrl(`${result.topicData.slug}`),
      name: data.title,
    },
  });

  breadcrumb.push({
    "@type": "ListItem",
    position: "3",
    item: {
      "@id": getViewUrl(`${result.topicData.slug}/${data.slug}`),
      name: data.title,
    },
  });

  schema.data = buildSchema(
    getViewUrl(`${result.topicData.slug}/${data.slug}`),
    "Topingnow",
    "/images/logo.png",
    breadcrumb,
    data
  );

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="w-full lg:w-7/12 mt-5 mx-5 bg-white shadow-xl ring-1 ring-gray-900/5 rounded">
          <h1 className="text-2xl font-bold text-center pb-12 pt-6 ml-5">
            {data.title}
          </h1>

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
