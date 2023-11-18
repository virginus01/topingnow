import { Key, useEffect, useState } from "react";
import PostListItem from "./post_lists_items";
import { getTopics } from "../../lib/repo/topics_repo";
import Link from "next/link";

export default function Topics({ topId }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const topics = await getTopics(topId);
      setTopics(topics);
      setLoading(false);
    }
    fetchData();
  }, [topId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {topics.map(({ id, title, slug }) => (
        <li key={id}>
          <Link href={`/posts/${slug}`}> {title}</Link>
        </li>
      ))}
    </ul>
  );
}
