import { useEffect, useState } from "react";
import PostListItem from "./post_lists_items";
import { getLists } from "../../lib/repo/lists_repo";
import Link from "next/link";

export default function Lists({ topicData }) {
  const [topics, setTopics] = useState([]);

  const [loading, setLoading] = useState(true);
  const { id, slug } = topicData;

  const topicSlug = slug;

  useEffect(() => {
    async function fetchData() {
      try {
        const topics = await getLists(id);
        setTopics(topics);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {topics.map(({ _id, id, name, slug }) => (
        <li key={_id}>
          <Link href={`/${topicSlug}/${slug}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}
