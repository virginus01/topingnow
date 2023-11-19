import React from 'react'
import PostBody from './posts/post_body'
import SideBar from '../components/sidebar'
import Layout from '../components/layout'
import { getTopicById } from '../lib/repo/topics_repo'
import Lists from './posts/lists'


export default function Post({ postData }) {

    if (postData === null) {
        return (<div>loading...</div>)
    }

    if (postData.error) {
        return (<div>error fetching data</div>)
    }


    const sideBarItemList = [
        { id: 4, title: "Popular Post 1", link: "#" },
        { id: 5, title: "Popular Post 2", link: "#" }
    ]



    return (
        <Layout>
            <div>

                <div className="flex flex-col md:flex-row">

                    <div className="w-full md:w-1/6 lg:fixed top-0 left-0 lg:h-screen p-4 sm:pt-20 pt-5 overflow-y-auto mx-auto">
                        <SideBar sideBarItems={sideBarItemList} />
                    </div>

                    <div className="w-full md:w-2/3 p-4 mx-auto">

                        <PostBody post={postData} />
                        <Lists topicData={postData} />
                    </div>

                    <div className="w-full md:w-1/6 lg:fixed top-0 right-0 lg:h-screen p-4 sm:pt-20 pt-5 overflow-y-auto mx-auto">

                        <SideBar sideBarItems={sideBarItemList} />
                    </div>


                </div>

            </div>
        </Layout>
    );
}
export async function getServerSideProps({ params, res }) {
    try {
        const { id } = params;

        const postData = await getTopicById(id);


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
