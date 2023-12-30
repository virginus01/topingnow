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
import QandAView from "./qandas_view";

export const dynamic = "force-dynamic";

export default function Page() {
  let [data, setData] = useState(Shimmer(5));

  const tabComponents = [
    {
      id: 1,
      status: "active",
      title: "QandA",
      component: <QandAView listId={undefined} />,
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
      <TabbedContents
        title="Questions and Answers"
        tabComponents={tabComponents}
      />
    </>
  );
}
