import React, { useEffect, useState } from 'react'
import PostBody from './posts/post_body'
import SideBar from '../components/sidebar'
import Layout from '../components/layout'
import { getTopicById } from '../lib/repo/topics_repo'
import Lists from './posts/lists'


export default function Post({ postData }) {

    const [lists, setLists] = useState([]);
    const [sideBarItemList, setSideBarItemList] = useState([]);
    const [loadingList, setLoading] = useState(true);

    if (postData === null) {
        return <div>loading...</div>;
    }

    const { id } = postData;

    useEffect(() => {
        async function fetchData() {
            try {
                const lists = await getLists(id);
                setLists(lists);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        }
        fetchData();
    }, [id]);

    if (loadingList === false && lists) {
        setSideBarItemList(
            lists.map(({ _id, id, name, slug }) => ({
                id: 5,
                title: name,
                link: "#"
            }))
        );
    }

    return (
        <Layout>
            <React.Fragment>
                <div className="flex flex-col md:flex-row">

                    <div className="w-full md:w-1/6 lg:fixed top-0 left-0 lg:h-screen p-4 sm:pt-20 pt-5 overflow-y-auto mx-auto">
                        <SideBar key="left" sideBarItems={sideBarItemList} />
                    </div>

                    <section className="w-full md:w-2/3 p-4 mx-auto">
                        <article className='mb-10'>
                            <PostBody post={postData} />
                        </article>

                    </section>

                    <div className="w-full md:w-1/6 lg:fixed top-0 right-0 lg:h-screen p-4 sm:pt-20 pt-5 overflow-y-auto mx-auto">
                        <SideBar key="right" sideBarItems={sideBarItemList} />
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
