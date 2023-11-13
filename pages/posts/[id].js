import Layout from '../../components/layout';
import Head from 'next/head';
import { getPostById } from '../../lib/repo/posts_repo';
import { notFound } from 'next/navigation';



export default function Post({ postData }) {


    const { title } = postData;

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>

            <article>
                <h1>{title}</h1>
                <div>{"kk"}</div>
            </article>
        </Layout>
    );
}
export async function getServerSideProps({ params, res }) {
    try {
        const { id } = params;
        const postData = await getPostById(id);

        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

        return {
            props: {
                postData
            }
        };
    } catch (err) {
        console.error(err);

        return {
            props: {}
        };
    }
}
