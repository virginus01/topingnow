"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTopicById } from "@/app/lib/repo/topics_repo";
import Loading from "@/app/dashboard/loading";
import { TopicModel } from "@/app/models/topic_model";
import ListsImport from "@/app/dashboard/topics/add/[topic_id]/list_import";
import { toast } from "sonner";
import ListsView from "@/app/dashboard/lists/lists_view";

export default function FromTopic({
  params,
}: {
  params: { topic_id: string };
}) {
  const router = useRouter();
  const [topicData, setTopicData] = useState<TopicModel | null>(null);

  useEffect(() => {
    getTopicById(params.topic_id).then((data) => {
      if (!data) {
        toast.error("topic not found");
        router.replace("/dashboard/topics");
      } else {
        setTopicData(data);
      }
    });
  }, [params.topic_id]);

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  if (!topicData) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto mt-12">
      <p className="my-10">List: {topicData.title}</p>
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <button
            className={`px-2 py-1.5 text-sm rounded-sm ${
              activeTab === 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabClick(1)}
          >
            Published Lists
          </button>

          <button
            className={`px-2 py-1.5 text-sm rounded-sm ${
              activeTab === 2
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabClick(2)}
          >
            Draft Lists
          </button>
        </div>
        <div className="flex space-x-4">
          <div className="float-right">
            <button
              className={`px-2 py-1.5 text-sm rounded-sm ${
                activeTab === 3
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabClick(3)}
            >
              Import Lists
            </button>
          </div>
        </div>
      </div>
      {/* Content for each tab */}
      {activeTab === 1 && (
        <div className="mt-10">
          <ListsView topicId={params.topic_id} />
        </div>
      )}
      {activeTab === 2 && <div className="mt-10">Content for Tab 2</div>}
      {activeTab === 3 && (
        <div className="mt-10">
          <ListsImport topicId={params.topic_id} />
        </div>
      )}
    </div>
  );
}
