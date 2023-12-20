"use client";
import React, { useEffect, useState } from "react";
import Pagination from "rc-pagination";
import {
  TrashIcon,
  PencilIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
import Loading from "../loading";
import { getImports } from "@/app/lib/repo/import_repo";
import { deleteTopicsByImports } from "@/app/lib/repo/import_repo";
import { useRouter } from "next/navigation";
import ConfirmAction from "@/app/components/widgets/confirm";
import { ActionButtons } from "@/app/components/widgets/action_buttons";

export let isOpen = false;

// Custom hook to handle pagination
function usePagination(data, page, perPage) {
  const startIndex = (page - 1) * perPage;
  return data.slice(startIndex, startIndex + perPage);
}

export default function ImportsView() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [not_found, setNotFound] = useState(false);
  const perPage = 10;
  const paginatedData = usePagination(data, page, perPage);

  useEffect(() => {
    setLoading(true);
    getImports(1, 1000).then((result) => {
      const { data } = result;

      if (!result || result == "not_found" || data.result.length === 0) {
        setNotFound(true);
      } else {
        setData(data.result);
        setLoading(false);
      }
    });
  }, []);

  if (not_found) {
    return <div>No Import found</div>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!data || data == undefined || !Array.isArray(data)) {
    console.log(data);
    return <div className="animate-pulse">loading imports...</div>;
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
                  href={`/dashboard/topics/add/${_id}`}
                  className="flex items-center text-green-600"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span className="ml-1">lists</span>
                </a>
              </td>
              <td>
                <div className="pl-16">
                  <ActionButtons
                    id={_id}
                    onDelete={deleteImport}
                    onView={() => {}}
                    onEdit={() => {}}
                  />
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
        total={data.length}
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

  async function deleteImport(_id: string) {
    setIsOpen(false);
    const result = await deleteTopicsByImports(_id);
    function removeById(data, id) {
      return data.filter((item) => item._id !== id);
    }
    const updatedImports = removeById(data, _id);
    setData(updatedImports);
    toast.success(`${result.data} items deleted`);
  }
}
