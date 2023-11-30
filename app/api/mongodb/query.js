import { connectDB } from '@/app/utils/mongodb'

export async function getTops(limit) {
    const db = await connectDB();
    const tops = await db
        .collection("tops")
        .find({})
        .sort({ metacritic: -1 })
        .limit(parseInt(limit, 10))
        .toArray();
    return tops;
}


export async function getTopics(top_id, limit) {

    const db = await connectDB();
    let findQuery = {};
    let defaultLimit = 10;

    if (top_id) {
        findQuery = { top_id };
    }

    try {
        limit = parseInt(limit, 10) || defaultLimit;
    } catch {
        limit = defaultLimit;
    }

    const tops = await db
        .collection("topics")
        .find(findQuery)
        .sort({ metacritic: -1 })
        .limit(limit)
        .toArray();

    return tops;
}




export async function getLists(topicId, limit) {
    const db = await connectDB();
    const lists = await db
        .collection("lists")
        .find({ "topic_id": topicId })
        .sort({ metacritic: -1 })
        .limit(parseInt(limit, 10))
        .toArray();
    return lists;
}

export async function getList(listId) {
    const db = await connectDB();
    const result = await db
        .collection("lists")
        .findOne({ slug: listId })
    return result;
}

export async function getPopularTopics(limit) {
    const db = await connectDB();
    const result = await db.collection("topics")
        .find({}).sort({ list_count: -1 })
        .limit(parseInt(limit, 10))
        .toArray();
    return result;
}

export async function stat() {
    const db = await connectDB();
    const result = await db.collection.find().explain("executionStats");
    return result;
}

export async function getTopic(id) {
    const db = await connectDB();
    let topic = await db.collection("topics").findOne({
        slug: id
    });
    if (!topic) {
        topic = await db.collection("topics").findOne({
            _id: id
        });
    }
    return topic;
}

export async function getPost(id) {
    const db = await connectDB();
    const post = await db
        .collection("level-1")
        .findOne({ slug: id })

    return post;
}

export async function getUser(uid) {
    const db = await connectDB();
    const user = await db
        .collection("users")
        .findOne({ uid: uid })
    return user;
}