
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className="font-extrabold lg:mt-20">Top Trending List</h2>
        {allPostsData.map(({ _id, parent, slug, title }) => (
          <div className={utilStyles.listItem} key={_id}>
            <Link as={`/posts/${slug}`} href={`/posts/${_id}`}>{title}</Link>
          </div>
        ))}
      </section>
    </Layout>
  );
}


export async function getServerSideProps({ req, res }) {
  const allPostsData = await getSortedPostsData();
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, stale-while-revalidate=59'
  )

  return {
    props: {
      allPostsData,
    },
  };
}