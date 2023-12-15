import PostListItem from "@/app/posts/post_lists_items";

export default function SideBar({ data }) {
  return (
    <div className="relative flex sm:py-7">
      <div className="relative px-1 pb-2 pt-2 sm:mx-auto w-full sm:px-2">
        <div className="relative bg-white pb-3 shadow-xl ring-1 ring-gray-900/5 mb-10 rounded-md">
          <div className="bg-gray-500 flex items-left justify-left gap-x-4 px-4 py-2 text-xs font-bold text-left text-white">
            Popular List
          </div>
          <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
            <div className="line-clamp-1 text-sm leading-6 text-gray-600">
              <ul className="ml-1 inline-block w-[500px]">
                {data.map((post: { _id; title; slug; extraClass }) => {
                  const modifiedPost = {
                    ...post,
                    slug: `${post.slug}`,
                  };
                  return <PostListItem data={modifiedPost} key={post._id} />;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
