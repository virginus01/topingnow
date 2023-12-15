"use client";
import { NEXT_PUBLIC_GET_TOPICS } from "@/constants";
import Link from "next/link";
import { usePaginatedSWR } from "@/app/utils/fetcher";
import Shimmer from "../components/shimmer";

export default function Topics({ topId }) {
  const perPage = 10;
  const page = 1;
  const url = `${NEXT_PUBLIC_GET_TOPICS}?topId=${topId}&page=${page}&perPage=${perPage}`;

  // Slice topics array for current page
  const { paginatedData, loading } = usePaginatedSWR(url, page, perPage);

  if (loading || !Array.isArray(paginatedData)) {
    return <Shimmer />;
  }

  if (!paginatedData) {
    return <div>No Topic found</div>;
  }

  return (
    <ul className="ml-1 inline-block w-[500px]">
      {paginatedData.map(({ _id, title, slug }) => (
        <li key={_id} className="py-2">
          <Link href={`/${slug}`}>
            <div className="flex items-center">
              <div className="bg-red-500 w-1 h-1 mr-2 text-sm"></div>
              <div className="align-middle line-clamp-1 text-transform: lowercase">
                {title}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
