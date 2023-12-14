"use client";
import React, { useEffect, useState } from "react";
import Pagination from "rc-pagination";
import {
  TrashIcon,
  PencilIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { getTopics } from "@/app/lib/repo/topics_repo";
import { toast } from "sonner";
import Loading from "../loading";

export const dynamic = "force-dynamic";

function usePagination(data, page, perPage) {
  const startIndex = (page - 1) * perPage;
  return data.slice(startIndex, startIndex + perPage);
}

export default function TopicsView({ topId }) {
  const [page, setPage] = useState(1);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [not_found, setNotFound] = useState(false);
  const perPage = 10;
  // Slice topics array for current page
  const paginatedTopics = usePagination(topics, page, perPage);

  useEffect(() => {
    setLoading(true);
    getTopics(topId, "1", "1000").then((result) => {
      const { data } = result;

      if (!result || result == "not_found" || data.result.length === 0) {
        setNotFound(true);
      } else {
        setTopics(data.result);
        setLoading(false);
      }
    });
  }, [topId]);

  if (not_found) {
    return <div>No Topic found</div>;
  }

  if (loading || !topics || topics == undefined || !Array.isArray(topics)) {
    return <Loading />;
  }

  return (
    <>
      <table className="w-full whitespace-nowrap">
        <tbody>
          {paginatedTopics.map(({ id, title, _id }) => (
            <tr key={_id} className="text-sm leading-none text-gray-600 h-16">
              <td className="w-1/2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-700 rounded-sm flex items-center justify-center">
                    <p className="text-xs font-bold leading-3 text-white">
                      {id}
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
                  href={`/dashboard/topics/add/${_id}`}
                  className="flex items-center text-green-600"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span className="ml-1">lists</span>
                </a>
              </td>
              <td className="pl-16">
                <a
                  href={`/dashboard/topics/add/${_id}`}
                  className="flex items-center text-green-600"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span className="ml-1">Q&A</span>
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
        total={topics.length}
        pageSize={perPage}
        showPrevNextJumpers={true}
        prevIcon={"«"}
        nextIcon={"»"}
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
