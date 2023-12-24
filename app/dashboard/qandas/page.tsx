"use client";
import React, { useState } from "react";
import Pagination from "rc-pagination";
import {
  TrashIcon,
  PencilIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Loading from "../loading";
import { DASH_TOPICS, NEXT_PUBLIC_GET_QANDAS } from "@/constants";
import { usePaginatedSWRAdmin } from "@/app/utils/fetcher";
import { notFound, useRouter } from "next/navigation";
import ConfirmAction from "@/app/components/widgets/confirm";
import { toast } from "sonner";
import { ActionButtons } from "@/app/components/widgets/action_buttons";
import { deleteTopicsWithLists } from "@/app/lib/repo/topics_repo";
import { removeById } from "@/app/utils/custom_helpers";
import Shimmer from "@/app/components/shimmer";
import DataTable from "@/app/components/widgets/data_table";
import TemplateBody from "./body";
import QandAsImport from "./qanda_import";
import StepsImport from "./steps_import";
import TabbedContents from "@/app/components/widgets/tabbed_contents";

export const dynamic = "force-dynamic";

export default function QandAView({ topicId }) {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  let [data, setData] = useState(Shimmer(5));
  const router = useRouter();

  const perPage = 10;
  const url = `${NEXT_PUBLIC_GET_QANDAS}?page=${page}&perPage=${perPage}`;

  const { paginatedData, loading } = usePaginatedSWRAdmin(url, page, perPage);

  if (loading || !Array.isArray(paginatedData)) {
    return <Loading />;
  }

  data = paginatedData;

  const tabComponents = [
    {
      id: 1,
      status: "active",
      title: "QandA",
      component: (
        <DataTable
          data={data}
          page={page}
          perPage={perPage}
          deleteAction={deleteAction}
          setPage={() => setPage}
          viewAction={viewAction}
          editAction={editAction}
          addAction={addAction}
          addText={"answers & steps"}
        />
      ),
    },
    {
      id: 2,
      status: "inactive",
      title: "QandA",
      component: <TemplateBody data={data} />,
    },
    {
      id: 3,
      status: "inactive",
      title: "Steps Import",
      component: <StepsImport qanda={data} />,
    },
    {
      id: 4,
      status: "active",
      title: "QandA Import",
      component: <QandAsImport />,
    },
  ];

  return (
    <>
      <TabbedContents tabComponents={tabComponents} />
    </>
  );

  async function deleteAction(_id: string) {
    const res = await deleteTopicsWithLists(_id);
    if (res.data) {
      const updatedData = removeById(paginatedData, _id);
      data = updatedData;
      toast.success(`${res.data} items deleted`);
      router.push(`${DASH_TOPICS}`);
    } else {
      toast.error(`items not deleted`);
    }
  }
  async function viewAction(slug: string) {
    router.push(`/${slug}`);
  }

  async function editAction(_id: string) {
    router.push(`/dashboard/topics/edit/${_id}`);
  }

  async function addAction(_id: string) {
    router.push(`/dashboard/qandas/add/${_id}`);
  }
}
