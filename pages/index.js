
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { getLatestPosts } from '../lib/repo/posts_repo';
import Layout from "../components/layout"



export default function Home({ allPostsData }) {

  if (allPostsData === null) {
    // Return a loading message or component
    return <p>Loading...</p>;
  }

  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className="font-extrabold lg:mt-20">Top Trending List</h2>
      {allPostsData.map(({ _id, parent, slug, title }) => (
        <div className={utilStyles.listItem} key={_id}>
          <Link href={`/posts/${slug}`}>{title}</Link>
        </div>
      ))}
    </section>
  );
}


export async function getServerSideProps({ req, res }) {

  const allPostsData = await getLatestPosts();
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  return {
    props: {
      allPostsData,
    },
  };
}

Home.getLayout = function getLayout(home) {
  return (
    <Layout>{home}</Layout>
  )
}