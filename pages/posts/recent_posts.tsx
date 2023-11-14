import { Key } from "react";
import PostListItem from "./post_lists_items";

export default function RecentPosts({ posts }) {
  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recent-posts">
      <h3>Recent Posts</h3>

      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
