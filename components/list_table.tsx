import { Key } from "react";
import PostListItem from "../pages/posts/post_lists_items";
import Link from "next/link";
import { UrlObject } from "url";

export default function ListTable({ sideBarItems, postData }) {
  if (!sideBarItems) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex sm:py-7">
      <div className="relative bg-white px-1 pb-2 pt-2 sm:mx-auto w-full sm:px-2">
        <div className="relative bg-white pb-3 shadow-xl ring-1 ring-gray-900/5 mb-10">
          <div className="bg-gray-500 flex items-left justify-left gap-x-4 px-4 py-2 text-xs font-bold text-left text-white">
            List of {postData.title}
          </div>
          <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
            <div className="line-clamp-1 text-sm leading-6 text-gray-600">
              {sideBarItems.map(
                (post: {
                  name: any;
                  id: Key | null | undefined;
                  slug: string | UrlObject;
                }) => (
                  <a key={post.id} href={`#${post.slug}`}>
                    <div className="flex items-center pt-3">
                      <div className="bg-red-500 w-1 h-1 mr-2 text-sm"></div>
                      <div className="align-middle line-clamp-1 text-transform: lowercase">
                        {post.name}
                      </div>
                    </div>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
