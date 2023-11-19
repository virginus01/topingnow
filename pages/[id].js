import React, { useEffect, useState } from 'react'
import PostBody from './posts/post_body'
import SideBar from '../components/sidebar'
import Layout from '../components/layout'
import { getTopicById } from '../lib/repo/topics_repo'
import Lists from './posts/lists'
import { getLists } from "../lib/repo/lists_repo";
import ListTable from '../components/list_table'


export default function Post({ postData, lists }) {


    if (postData === null) {
        return <div>loading...</div>;
    }

    const { id } = postData;

    const sideBarItemList = [
        { id: 4, title: "Popular Post 1", link: "#" },
        { id: 5, title: "Popular Post 2", link: "#" }
    ]



    return (
        <Layout>
            <React.Fragment>
                <h1 className="text-2xl font-bold text-center pt-12">{postData.title}</h1>
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/6 lg:fixed top-0 left-0 lg:h-screen p-4 sm:pt-20 pt-5 overflow-y-auto mx-auto">
                        <ListTable key="left" sideBarItems={lists} />
                    </div>

                    <section className="w-full md:w-2/3 p-4 mx-auto">
                        <article className='mb-10'>
                            <PostBody post={postData} />
                        </article>
                        <article className='mb-10'>
                            <Lists topicData={postData} lists={lists} />
                        </article>
                    </section>

                    <div className="w-full md:w-1/6 lg:fixed top-0 right-0 lg:h-screen p-4 sm:pt-20 pt-5 overflow-y-auto mx-auto">

                        <SideBar sideBarItems={sideBarItemList} />
                    </div>

                </div>
            </React.Fragment>
        </Layout>
    );
}
export async function getServerSideProps({ params, res }) {
    try {
        const { id } = params;

        const postData = await getTopicById(id);

        if (postData.error || !postData) {
            return { props: {} };
        }

        const lists = await getLists(postData.id);

        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

        if (lists.error || !lists) {
            return {
                props: {
                    postData,
                }
            };
        }

        return {
            props: {
                postData,
                lists
            }
        };

    } catch (err) {
        console.error(err);

        return {
            props: {}
        };
    }
}
