import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { getTops } from "../lib/repo/posts_repo";
import Layout from "../components/layout";
import Topics from "./posts/topics";
import SideBar from "../components/sidebar";

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
    <section className={`${utilStyles.section} mx-auto`}>
      <div className="w-full">
        <article className="flex flex-col md:flex-row flex-wrap">
          {tops.map(({ _id, id, name }) => (
            <div key={_id} className="flex-grow p-4">
              <div className="bg-white p-6 shadow-xl rounded-lg">
                <h3 className="text-lg font-medium">
                  Top {name} Best List accross the world
                </h3>
                <Topics topId={id} />
              </div>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    const tops = await getTops();
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

    return { props: { tops } };
  } catch (err) {
    return { props: {} };
  }
}

Home.getLayout = function getLayout(home: any) {
  return <Layout>{home}</Layout>;
};
