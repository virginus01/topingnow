import { Key } from "react";
import PostListItem from "../pages/posts/post_lists_items";
import Link from "next/link";
import { UrlObject } from "url";

export default function ListTable({ sideBarItems }) {
  if (!sideBarItems) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex sm:py-5">
      <div className="relative bg-white px-1 pb-2 pt-2 shadow-xl ring-1 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-5">
        <div className="mx-auto">
          <div className="ml-1 inline-block w-full">
            <div className="py-2">
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
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
