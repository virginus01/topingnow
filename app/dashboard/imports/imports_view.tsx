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

export let isOpen = false;

export default function ImportsView() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const perPage = 10;

  useEffect(() => {
    setLoading(true);
    getImports(1, 1000).then((result) => {
      if (!result) {
      } else {
        setData(result.data);
        setLoading(false);
      }
    });
  }, [1, 1000]);

  if (loading) {
    return <Loading />;
  }
  if (!data || data == undefined || !Array.isArray(data)) {
    console.log(data);
    return <div>loading...</div>;
  }

  const paginatedData = usePagination(data, page, perPage);

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
                  <Buttons _id={_id} />
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

  // Custom hook to handle pagination
  function usePagination(data, page, perPage) {
    const startIndex = (page - 1) * perPage;
    return data.slice(startIndex, startIndex + perPage);
  }

  async function deleteImport(_id: string) {
    setIsOpen(false);
    const result = await deleteTopicsByImports(_id);
    const im = await getImports(1, 100);
    console.log(im);
    setData(im);
    toast.success(`${result} items deleted`);
  }

  function Buttons(_id: any) {
    return (
      <div>
        <button className="text-red-500 hover:bg-green-600 p-1 rounded mx-1">
          <TrashIcon className="w-4 h-4" />
        </button>

        <button className="text-blue-500 hover:bg-green-600 p-1 rounded mx-1">
          <PencilIcon className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsOpen(true)}
          className="text-green-500 hover:bg-green-600 p-1 rounded mx-1"
        >
          <EyeIcon className="w-4 h-4" />
        </button>

        <ConfirmAction
          isOpen={isOpen}
          onConfirm={() => deleteImport(_id)}
          onCancel={() => setIsOpen(false)}
          confirmButtonText={"Proceed"}
        />
      </div>
    );
  }
}
