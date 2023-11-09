
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { getLatestPosts } from '../lib/repo/posts_repo';
import Layout from "../components/layout"



export default function Home({ allPostsData }) {
  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className="font-extrabold lg:mt-20">Top Trending List</h2>
      {allPostsData.map(({ _id, parent, slug, title }) => (
        <div className={utilStyles.listItem} key={_id}>
          <Link as={`/posts/${slug}`} href={`/posts/${_id}`}>{title}</Link>
        </div>
      ))}
    </section>

  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, stale-while-revalidate=59'
  )
  const allPostsData = await getLatestPosts();

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