import { Key } from "react";
import PostListItem from "../pages/posts/post_lists_items";
import Link from "next/link";
import { UrlObject } from "url";

export default function SideBar({ sideBarItems }) {
  if (!sideBarItems) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex sm:py-7">
      <div className="relative bg-white px-1 pb-2 pt-2 sm:mx-auto w-full sm:px-2">
        <div className="relative bg-white pb-3 shadow-xl ring-1 ring-gray-900/5 mb-10">
          <div className="bg-gray-500 flex items-left justify-left gap-x-4 px-4 py-2 text-xs font-bold text-left text-white">
            Popular List
          </div>
          <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
            <div className="line-clamp-1 text-sm leading-6 text-gray-600">
              {sideBarItems.map(
                (post: {
                  id: Key | null | undefined;
                  link: string | UrlObject;
                }) => (
                  <Link key={post.id} href={post.link}>
                    {<PostListItem post={post} />}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
