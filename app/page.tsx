"use client";
import Topics from "@/app/posts/topics";
import Layout from "./[slug]/layout";
import { NEXT_PUBLIC_GET_TOPS } from "@/constants";
import { usePaginatedSWR } from "./utils/fetcher";
import Loading from "./dashboard/loading";
import Shimmer from "./components/shimmer";
import { useState } from "react";

export default function Page() {
  const perPage = 5;
  const page = 1;
  let [data, setData] = useState(Shimmer(perPage));
  const url = `${NEXT_PUBLIC_GET_TOPS}`;

  // Slice topics array for current page
  const { paginatedData, loading } = usePaginatedSWR(url, page, perPage);

  if (!loading) {
    data = paginatedData;
  }

  if (data.length == 0) {
    data = Shimmer(perPage);
  }

  return (
    <Layout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The Best Lists
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {data.map(({ name, _id, extraClass }) => (
              <article
                key={_id}
                className="flex max-w-xl flex-col items-start justify-between "
              >
                <div className="relative bg-white pb-3 w-full shadow-xl ring-1 ring-gray-900/5 ">
                  <div className="bg-gray-500 flex items-center justify-center gap-x-4 px-4 py-2 text-xs font-bold text-center text-white">
                    <div className={`${extraClass}`}>
                      Top {name} Best all over the world
                    </div>
                  </div>
                  <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
                    <div className="mt-1 line-clamp-3 text-sm leading-6 text-gray-600">
                      <Topics topId={_id} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
