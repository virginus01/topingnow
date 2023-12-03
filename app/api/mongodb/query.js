import { connectDB } from '@/app/utils/mongodb'
import { ObjectId } from 'mongodb';

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


export async function getTopics(topId, limit) {

    const db = await connectDB();
    let findQuery = {};
    let defaultLimit = 10;

    if (topId) {
        findQuery = { topId };
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

export async function getTop(id) {
    const db = await connectDB();
    let top = await db.collection("tops").findOne({
        slug: id
    });

    if (!top) {
        top = await db.collection("tops").findOne({
            _id: new ObjectId(id)
        });
    }
    return top;
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


//POST

export async function addTopic(data) {
    const _id = new ObjectId();
    data._id = _id;
    const db = await connectDB();
    await db.collection("topics").insertOne(data);
    return _id;
}

export async function addTopics(data) {

    const db = await connectDB();

    const result = await db.collection("topics").insertMany(data);

    return result.insertedIds;

}

export async function updateATopic(id, data) {
    const _id = new ObjectId(id);
    const db = await connectDB();

    await db.collection("topics")
        .updateOne({ _id: _id }, { $set: data });

    return true;

}