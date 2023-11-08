import { connectDB } from '../../../utils/mongodb'
import { ObjectId } from 'mongodb';

export async function getPosts({ limit }) {
    const db = await connectDB();
    const posts = await db
        .collection("level-1")
        .find({})
        .sort({ metacritic: -1 })
        .limit(parseInt(limit, 10))
        .toArray();

    return posts;
}

export async function getPost({ id }) {
    const db = await connectDB();
    const post = await db
        .collection("level-1")
        .findOne({ slug: id })

    return post;
}