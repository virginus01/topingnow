import React from 'react'
import ListBody from '../posts/list_body'
import SideBar from '../../components/sidebar'
import Layout from '../../components/layout'
import { getListById } from '../../lib/repo/lists_repo'
import PopularTopics from '../../components/popular_topics'



export default function ListView({ postData }) {

    if (!postData) {
        return (<div>loading...</div>)
    }

    const { id, name } = postData;

    const sideBarItemList = [
        { id: 4, title: "Popular Post 1", link: "#" },
        { id: 5, title: "Popular Post 2 test but test still testing but is okay", link: "#" }
    ]

    return (
        <Layout>

            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/3 p-4">
                    <h1 className="text-2xl font-bold text-left pt-12 ml-2">{postData.name}</h1>
                    <ListBody post={postData} />
                </div>

                <div className="w-full md:w-1/4">
                    <SideBar sideBarItems={sideBarItemList} />
                </div>

                <div className="w-full md:w-1/4 mt-4 md:mt-0 md:ml-4">
                    <PopularTopics />
                </div>

            </div>
        </Layout>
    );
}
export async function getServerSideProps({ params, res }) {
    try {
        const { id, id2 } = params;
        const postData = await getListById(id2);
        if (postData.error || !postData) {
            return { props: {} };
        }
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
