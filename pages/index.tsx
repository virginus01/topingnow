import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { getTops } from "../lib/repo/posts_repo";
import Layout from "../components/layout";
import Topics from "./posts/topics";
import SideBar from "../components/sidebar";
import TopCard from "./posts/top_card";
import ListBody from "./posts/list_body";

export default function Home({ tops }) {
  if (tops === undefined) {
    return <p>Loading...</p>;
  }
  if (tops.error) {
    return <p>error fecting topics</p>;
  }

  const sideBarItemList = [
    { id: 4, title: "Popular Post 1", link: "#" },
    { id: 5, title: "Popular Post 2", link: "#" },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            The Best Lists
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tops.map(({ id, name, _id }) => (
            <article
              key={_id}
              className="flex max-w-xl flex-col items-start justify-between "
            >
              <div className="relative bg-white pb-3 w-full shadow-xl ring-1 ring-gray-900/5 ">
                <div className="bg-gray-500 flex items-center justify-center gap-x-4 px-4 py-2 text-xs font-bold text-center text-white">
                  Top {name} Best all over the world
                </div>
                <div className="group relative pt-2 space-y-2 py-2 px-2 text-base text-gray-600">
                  <div className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    <Topics topId={id} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    const tops = await getTops();

    if (tops.error || !tops) {
      return { props: {} };
    }

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

    return { props: { tops } };
  } catch (err) {
    return { props: {} };
  }
}

Home.getLayout = function getLayout(home: any) {
  return <Layout>{home}</Layout>;
};
