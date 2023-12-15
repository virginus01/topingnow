"use client";
import React, { useEffect, useState } from "react";
import Pagination from "rc-pagination";
import {
  TrashIcon,
  PencilIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Loading from "../loading";
import { NEXT_PUBLIC_GET_LISTS } from "@/constants";
import { usePaginatedSWR } from "@/app/utils/fetcher";

export const dynamic = "force-dynamic";

export default function ListsView({ topicId }) {
  const [page, setPage] = useState(1);
  const perPage = 10;

  const url = `${NEXT_PUBLIC_GET_LISTS}?topicId=${topicId}&page=${page}&perPage=${perPage}`;

  // Slice topics array for current page
  const { paginatedData, loading, data } = usePaginatedSWR(url, page, perPage);

  if (loading || !Array.isArray(paginatedData)) {
    return <Loading />;
  }

  if (!paginatedData) {
    return <div>No Topic found</div>;
  }

  return (
    <>
      <table className="w-full whitespace-nowrap">
        <tbody>
          {paginatedData.map(({ title, _id }) => (
            <tr key={_id} className="text-sm leading-none text-gray-600 h-16">
              <td className="w-1/2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-700 rounded-sm flex items-center justify-center">
                    <p className="text-xs font-bold leading-3 text-white">
                      {"#"}
                    </p>
                  </div>
                  <div className="pl-2">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {title}
                    </p>
                    <p className="text-xs leading-3 text-gray-600 mt-2">
                      added by admin
                    </p>
                  </div>
                </div>
              </td>

              <td className="pl-16">
                <a
                  href={`/dashboard/lists/add/${_id}`}
                  className="flex items-center text-green-600"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span className="ml-1">list Q&A</span>
                </a>
              </td>
              <td>
                <div className="pl-16">
                  <Buttons />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        className="pagination"
        current={page} // use current instead of page
        onChange={setPage}
        total={paginatedData.length}
        pageSize={perPage}
        showPrevNextJumpers={true}
        prevIcon={"Â«"}
        nextIcon={"Â»"}
        showTitle={false}
        hideOnSinglePage={true}
        showLessItems={true}
      />
    </>
  );
}

function Buttons() {
  return (
    <div>
      <button className="text-red-500 hover:bg-green-600 p-1 rounded mx-1">
        <TrashIcon className="w-4 h-4" />
      </button>

      <button className="text-blue-500 hover:bg-green-600 p-1 rounded mx-1">
        <PencilIcon className="w-4 h-4" />
      </button>

      <button className="text-green-500 hover:bg-green-600 p-1 rounded mx-1">
        <EyeIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
