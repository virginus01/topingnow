
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import fetch from 'node-fetch';

export default function Home({ allPostsData }) {
    const { posts } = allPostsData;

    console.log(allPostsData);
    return (
        <Layout home>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className="font-extrabold lg:mt-20">Top Trending List</h2>
                {posts.map(({ _id, parent, slug, title }) => (
                    <div className={utilStyles.listItem} key={_id}>
                        <Link as={`/posts/${slug}`} href={`/posts/${_id}`}>{title}</Link>
                    </div>
                ))}
            </section>
        </Layout>
    );
}


export async function getServerSideProps({ req, res }) {

    // Fetch posts from API route
    const response = await fetch("http://localhost:3000/api/mongodb/get_posts?limit=2");
    const allPostsD = await response.json();
    const allPostsData = allPostsD;
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=120, stale-while-revalidate=59'
    );

    return {
        props: {
            allPostsData,
        },
    };

}