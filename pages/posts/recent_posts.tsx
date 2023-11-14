import { Key } from "react";
import PostListItem from "./post_lists_items";

export default function RecentPosts({ posts }) {
  return (
    <div className="recent-posts">
      <h3>Recent Posts</h3>

      {posts.map((post: { id: Key | null | undefined }) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
