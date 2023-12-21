"use client";
import { useRouter } from "next/navigation";
import { getTops } from "@/app/lib/repo/tops_repo";
import {
  TrashIcon,
  PencilIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { NEXT_PUBLIC_GET_TOPS } from "@/constants";
import { useState } from "react";
import Shimmer from "@/app/components/shimmer";
import { usePaginatedSWRAdmin } from "@/app/utils/fetcher";
import { toast } from "sonner";
import { removeById } from "@/app/utils/custom_helpers";
import DataTable from "@/app/components/widgets/data_table";

export default function TopsView() {
  const url = `${NEXT_PUBLIC_GET_TOPS}`;
  const router = useRouter();
  const [page, setPage] = useState(1);
  const perPage = 5;

  let [data, setData] = useState(Shimmer(perPage));

  // Slice topics array for current page
  const { paginatedData, loading } = usePaginatedSWRAdmin(url, page, perPage);

  if (paginatedData && paginatedData.length > 0) {
    data = paginatedData;
  }

  if (paginatedData.length == 0) {
    data = Shimmer(perPage);
  }

  return (
    <>
      <DataTable
        data={data}
        page={page}
        perPage={perPage}
        deleteAction={deleteAction}
        setPage={() => setPage}
        viewAction={viewAction}
        editAction={editAction}
        addAction={addAction}
        addText={"topics"}
      />
    </>
  );

  async function deleteAction(_id: string) {
    toast.warning("no delete yet");
  }

  async function viewAction(slug: string) {
    toast.warning("no view yet");
  }

  async function editAction(_id: string) {
    toast.warning("no edit yet");
  }

  async function addAction(_id: string) {
    router.push(`/dashboard/tops/add/${_id}`);
  }
}
