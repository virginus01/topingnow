import { Key } from "react";
import PostListItem from "./post_lists_items";

export default function PopularPosts({ posts }) {
  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="popular-posts">
      <h3>Popular Posts</h3>

      {posts.map((post: { id: Key | null | undefined }) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
