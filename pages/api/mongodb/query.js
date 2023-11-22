import { connectDB } from '../../../utils/mongodb'
import { ObjectId } from 'mongodb';

export async function getTops({ limit }) {
    const db = await connectDB();
    const tops = await db
        .collection("tops")
        .find({})
        .sort({ metacritic: -1 })
        .limit(parseInt(limit, 10))
        .toArray();
    return tops;
}


export async function getTopics({ top_id }) {
    const db = await connectDB();
    const tops = await db
        .collection("topics")
        .find({ "top_id": top_id })
        .sort({ metacritic: -1 })
        .limit(parseInt(10, 10))
        .toArray();
    return tops;
}

export async function getLists({ topicId }) {
    const db = await connectDB();
    const lists = await db
        .collection("lists")
        .find({ "topic_id": topicId })
        .sort({ metacritic: -1 })
        .limit(parseInt(10, 10))
        .toArray();
    return lists;
}

export async function getList({ listId }) {

    const db = await connectDB();
    const result = await db
        .collection("lists")
        .findOne({ slug: listId })
    return result;
}

export async function getPopularTopics() {
    const db = await connectDB();
    const result = await db.collection("topics")
        .find({}).sort({ list_count: -1 })
        .limit(10)
        .toArray();
    return result;
}

export async function stat() {

    const db = await connectDB();
    const result = await db.collection.find().explain("executionStats");
    return result;
}



export async function getTopic({ id }) {
    const db = await connectDB();
    const topic = await db
        .collection("topics")
        .findOne({ slug: id })
    return topic;
}

export async function getPost({ id }) {
    const db = await connectDB();
    const post = await db
        .collection("level-1")
        .findOne({ slug: id })

    return post;
}