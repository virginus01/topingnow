import React from "react";
import ListBody from "@/app/posts/list_body";
import SideBar from "@/app/components/sidebar";
import { getListById } from "@/app/lib/repo/lists_repo";
import PopularTopics from "@/app/components/popular_topics";

export default async function ListView({
  params,
}: {
  params: { list_slug: string };
}) {
  const postData = await getListById(params.list_slug);

  if (!postData) {
    return <div>loading...</div>;
  }

  const { id, name } = postData;

  const sideBarItemList = [
    { id: 4, title: "Popular Post 1", link: "#" },
    {
      id: 5,
      title: "Popular Post 2 test but test still testing but is okay",
      link: "#",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-left pt-12 ml-5">
        {postData.name}
      </h1>

      <div className="flex flex-col md:flex-row">
        <div className="w-full lg:w-3/5">
          <ListBody post={postData} />
        </div>

        <div className="w-full lg:w-1/5 lg:h-screen lg:mt-12 mt-2 lg:fixed lg:ml-14 lg:left-2/3 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2">
          <SideBar sideBarItems={sideBarItemList} />
        </div>

        <div className="w-full lg:w-1/5 lg:h-screen lg:mt-12 mt-2 top-0 right-0 lg:fixed">
          <PopularTopics />
        </div>
      </div>
    </>
  );
}
