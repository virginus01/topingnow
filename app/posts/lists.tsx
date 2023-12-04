import Link from "next/link";
import { getLists } from "@/app/lib/repo/lists_repo";

export default async function Lists({ topicData }) {
  if (!topicData) {
    return <>loading...</>;
  }

  const result = await getLists(topicData._id, 1, 10);
  const lists = result.data;

  if (!lists || !Array.isArray(lists)) {
    console.log(lists);
    return <>loading...</>;
  }

  const { slug, title } = topicData;

  const topicSlug = slug;

  return (
    <ul>
      {lists.map(({ _id, name, description, slug }: any, index: number) => (
        <li key={_id} id={slug}>
          <div className="relative bg-white pb-3 w-full shadow-xl ring-1 ring-gray-900/5 mb-10 rounded-md">
            <div className="bg-gray-500 flex items-left justify-left gap-x-4 px-2 py-2 text-xs font-bold text-left text-white">
              #{index + 1}: {name}
            </div>
            <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
              <div className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                <span>
                  <Link
                    href={`${topicSlug}/${slug}`}
                    className="text-red-900 font-medium"
                  >
                    {name}
                  </Link>{" "}
                  is {index + 1} in the list of {title}.
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
