import React from 'react'
import { getPostById } from '../../../lib/repo/posts_repo'
import ListBody from '../list_body'
import PopularPosts from '../popular_post'
import RecentPosts from '../recent_posts'
import Layout from '../../../components/layout'
import { getListById } from '../../../lib/repo/lists_repo'
import Lists from '../lists'



export default function ListView({ postData }) {

    if (postData === null) {
        return (<div>loading...</div>)
    }
    const { id, name } = postData;

    const recentPosts = [
        { id: 2, title: "Recent Post 1" },
        { id: 3, title: "Recent Post 2" }
    ]

    const popularPosts = [
        { id: 4, title: "Popular Post 1" },
        { id: 5, title: "Popular Post 2" }
    ]


    return (
        <Layout>
            <div>
                <div className="flex flex-col md:flex-row">

                    <div className="w-full md:w-2/3 p-4">
                        {/* Scrollable posts */}
                        <ListBody post={postData} />

                    </div>

                    <div className="w-full md:w-1/6 sticky top-0 p-4">
                        {/* Recent posts */}
                        <RecentPosts posts={recentPosts} />
                    </div>

                    <div className="w-full md:w-1/6 sticky top-0 p-4">
                        {/* Popular posts */}
                        <PopularPosts posts={popularPosts} />
                    </div>

                </div>
            </div>
        </Layout>
    );
}
export async function getServerSideProps({ params, res }) {
    try {
        const { id, id2 } = params;

        const postData = await getListById(id2);


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
