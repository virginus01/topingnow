"use client";
import React, { useState } from "react";
import TabbedContents from "@/app/components/widgets/tabbed_contents";
import TopicsView from "./topics_view";
import CreateTopic from "./create_topic";

export const dynamic = "force-dynamic";

function Index() {
  const tabComponents = [
    {
      id: 1,
      status: "active",
      title: "Topics",
      component: <TopicsView topId={""} />,
    },
    {
      id: 2,
      status: "inactive",
      title: "",
      component: <></>,
    },
    {
      id: 3,
      status: "inactive",
      title: "",
      component: <></>,
    },
    {
      id: 4,
      status: "active",
      title: "create topic",
      component: <CreateTopic topData={{}} />,
    },
  ];

  return (
    <>
      <TabbedContents title="Topics" tabComponents={tabComponents} />
    </>
  );
}
export default Index;
