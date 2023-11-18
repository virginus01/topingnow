import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { getTops } from "../lib/repo/posts_repo";
import Layout from "../components/layout";
import Topics from "./posts/topics";

export default function Home({ tops }) {
  if (tops === undefined) {
    return <p>Loading...</p>;
  }
  if (tops.error) {
    return <p>error fecting topics</p>;
  }

  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className="font-extrabold lg:mt-20">Top Trending List</h2>
      {tops.map(({ _id, parent, id, top_slug, name }) => (
        <div className={utilStyles.listItem} key={_id}>
          <Link href={`/posts/${top_slug}`}>{name}</Link>
          <hr />

          <Topics topId={id} />
        </div>
      ))}
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
