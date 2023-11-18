import React from 'react'
import ListBody from '../posts/list_body'
import SideBar from '../../components/sidebar'
import Layout from '../../components/layout'
import { getListById } from '../../lib/repo/lists_repo'



export default function ListView({ postData }) {

    if (postData === null) {
        return (<div>loading...</div>)
    }
    const { id, name } = postData;

    const sideBarItemList = [
        { id: 4, title: "Popular Post 1", link: "#" },
        { id: 5, title: "Popular Post 2", link: "#" }
    ]




    return (
        <Layout>
            <div>
                <div className="flex flex-col md:flex-row">

                    <div className="w-full md:w-2/3 p-4">

                        <ListBody post={postData} />

                    </div>


                    <div className="w-full md:w-1/4 lg:fixed top-0 right-0 lg:h-screen p-4 sm:pt-20 pt-5 overflow-y-auto mx-auto">

                        <SideBar sideBarItems={sideBarItemList} />
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
