import { Key, useEffect, useState } from "react";
import PostListItem from "./post_lists_items";
import { getLists } from "../../lib/repo/lists_repo";
import Link from "next/link";

export default function Lists({ topicData }) {
  if (topicData === undefined) {
    return <div>fetching</div>;
  }
  const { id, slug } = topicData;

  const topicSlug = slug;
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const topics = await getLists(id);
      setTopics(topics);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {topics.map(({ id, name, slug }) => (
        <li key={id}>
          <Link href={`/posts/${topicSlug}/${slug}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}
