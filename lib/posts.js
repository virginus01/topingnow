import { connectDB } from '../utils/mongodb'
import html from 'remark-html';


export async function getSortedPostsData() {
    try {
        const client = await connectDB();
        const db = client.db("topingnow");

        const posts = await db
            .collection("level-1")
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();

        const serializedAllPostsData = posts.map((post) => {
            post._id = String(post._id);
            return post;
        });

        return serializedAllPostsData;
    } catch (e) {
        console.log(e);
        return []; // Return an empty array or handle the error appropriately
    }
}



export async function getAllPostIds() {
    const client = await connectDB();
    const db = client.db("topingnow");

    const posts = await db
        .collection("level-1")
        .find({})
        .sort({ metacritic: -1 })
        .limit(10)
        .toArray();

    const serializedAllPostsData = posts.map((post) => {
        post._id = String(post._id);
        return post;
    });

    return serializedAllPostsData.map((post) => {
        return {
            params: {
                id: post.slug,
            },
        };
    });
}




export async function getPostData(id) {
    const posts = await getSortedPostsData();
    const post = posts.find((post) => post._id === id);
    const serializedAllPostsData = posts.map((post) => {
        post._id = String(post._id);
        return post;
    });
    return {
        serializedAllPostsData,
    };
}