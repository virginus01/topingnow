"use client";
import React, { useEffect, useState } from "react";
import TopicsImport from "./topics_import";
import { useRouter } from "next/navigation";
import { getTop } from "@/app/lib/repo/tops_repo";
import Loading from "@/app/dashboard/loading";
import { TopModel } from "@/app/models/top_model";
import TopicsView from "@/app/dashboard/topics/topics_view";

export default function FromTop({ params }: { params: { top_id: string } }) {
  const router = useRouter();
  const [topData, setTopData] = useState<TopModel | null>(null);

  useEffect(() => {
    getTop(params.top_id).then((data) => {
      if (!data) {
        router.replace("/dashboard/tops");
      } else {
        setTopData(data);
      }
    });
  }, [params.top_id, router]);

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  if (!topData) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto mt-12">
      <p className="my-10">Top: Top {topData.name}</p>
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
            Published Topics
          </button>

          <button
            className={`px-2 py-1.5 text-sm rounded-sm ${
              activeTab === 2
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabClick(2)}
          >
            Tab 2
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
              Imported Topics
            </button>
          </div>
        </div>
      </div>
      {/* Content for each tab */}
      {activeTab === 1 && (
        <div className="mt-10">
          <TopicsView topId={params.top_id} />
        </div>
      )}
      {activeTab === 2 && <div className="mt-10">Content for Tab 2</div>}
      {activeTab === 3 && (
        <div className="mt-10">
          <TopicsImport top_id={params.top_id} />
        </div>
      )}
    </div>
  );
}
