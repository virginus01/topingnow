import React, { useState } from "react";
import ListBody from "@/app/posts/list_body";

import PopularTopics from "@/app/components/popular_topics";
import { notFound } from "next/navigation";
import { SingleShimmer } from "@/app/components/shimmer";
import { getListById, listMetaTags } from "@/app/lib/repo/lists_repo";
import {
  countWords,
  getViewUrl,
  isNull,
  stripHtmlTags,
} from "@/app/utils/custom_helpers";
import { schema } from "@/app/layout";
import { buildSchema } from "@/app/seo/schema";
import { Metadata } from "next";
import { ConstructMetadata } from "@/app/seo/metadata";
import Lists from "@/app/posts/lists";
import QandAs from "@/app/posts/qandas";
import PopularLists from "@/app/components/popular_lists";

export async function generateMetadata({
  params,
}: {
  params: { list_slug: string };
}): Promise<Metadata> {
  const result = await getListById(params.list_slug);

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
      "@id": getViewUrl("", "topic"),
      name: "Home",
    },
  });

  breadcrumb.push({
    "@type": "ListItem",
    position: "2",
    item: {
      "@id": getViewUrl("", "topic"),
      name: result.title,
    },
  });

  schema.data = buildSchema(
    getViewUrl(result.slug, "topic"),
    "Topingnow",
    "/images/logo.png",
    breadcrumb,
    result
  );

  return ConstructMetadata(result) as {};
}

export default async function ListView({
  params,
}: {
  params: { list_slug: string; slug: string };
}) {
  const result = await getListById(params.list_slug);

  if (
    isNull(result) ||
    !result.topicData ||
    params.slug !== result.topicData.slug
  ) {
    notFound();
  }

  const data = result;

  const metadata = await generateMetadata({ params });

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
    <main>
      <h1 className="text-2xl font-bold text-left pb-12 pt-6 ml-10">
        {data.title}
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full lg:w-7/12 lg:mt-2 mt-2 lg:ml-4">
          <ListBody post={data} />
          <QandAs listData={data} />
        </div>

        <div className="w-full lg:w-1/5 lg:h-screen lg:mt-12 mt-2 lg:fixed lg:ml-14 lg:left-2/3 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2">
          <PopularLists _id={data._id} />
        </div>

        <div className="w-full lg:w-1/5 lg:h-screen lg:mt-12 mt-2 top-0 right-0 lg:fixed">
          <PopularTopics _id={data._id} />
        </div>

        <div className="lg:fixed lg:top-[65%] right-20 lg:mt-12 mr-10 lg:left-2/3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3081.0088488313666!2d-105.5929017!3d41.3131321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8768901d9a0e9dd9%3A0xc4e9855d790adeef!2sDaylight%20Donuts!5e0!3m2!1sen!2sus!4v1644964210174!5m2!1sen!2sus"
            width="700"
            height="180"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
