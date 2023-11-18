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
      <div className="relative bg-white px-1 pb-2 pt-2 shadow-xl ring-1 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-5">
        <div className="mx-auto">
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
  );
}
