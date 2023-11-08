import Layout from '../../components/layout';
import Head from 'next/head';
import { getPostById } from '../../lib/repo/posts_repo';
import { notFound } from 'next/navigation';



export default function Post({ postData }) {

    if (!postData) {
        notFound();
    }
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

export async function getServerSideProps({ params }) {
    try {
        const { id } = params;
        const postData = await getPostById(id);

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
