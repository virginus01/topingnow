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

export async function getTopics(topId, page = 1, perPage = 10) {

    const skip = (page - 1) * perPage;

    const db = await connectDB();

    const filter = topId ? { topId } : {};

    const [result, total] = await Promise.all([
        db.collection("topics").find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(perPage)
            .toArray(),

        db.collection("topics")
            .estimatedDocumentCount(filter)
    ]);

    const numPages = Math.ceil(total / perPage);
    const hasNextPage = page < numPages;
    const hasPrevPage = page > 1;

    if (!result) {
        return "not_found";
    }


    return {
        result: result,
        metadata: {
            total,
            page,
            perPage,
            hasNextPage,
            hasPrevPage
        }
    };

}


export async function fetchImports(page = 1, perPage = 10) {

    try {

        const skip = (page - 1) * perPage;

        const db = await connectDB();

        const [result, total] = await Promise.all([
            db.collection("imports").find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(perPage)
                .toArray(),
            db.collection("imports").estimatedDocumentCount()
        ]);

        const numPages = Math.ceil(total / perPage);
        const hasNextPage = page < numPages;
        const hasPrevPage = page > 1;



        if (!result) {
            return "not_found";
        }

        return {
            result: result,
            metadata: {
                total,
                page,
                perPage,
                hasNextPage,
                hasPrevPage
            }
        };

    } catch (error) {

        console.log("Error in fetchImports", error);
        return "not_found";

    }

}

export async function getLists(topicId, page = 1, perPage = 10) {


    const skip = (page - 1) * perPage;

    const db = await connectDB();

    const filter = topicId ? { topicId } : {};

    const [result, total] = await Promise.all([
        db.collection("lists").find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(perPage)
            .toArray(),

        db.collection("lists")
            .estimatedDocumentCount(filter)
    ]);

    const numPages = Math.ceil(total / perPage);
    const hasNextPage = page < numPages;
    const hasPrevPage = page > 1;

    if (!result) {
        return "not_found";
    }

    return {
        result: result,
        metadata: {
            total,
            page,
            perPage,
            hasNextPage,
            hasPrevPage
        }
    };
}

export async function getList(listId) {

    try {

        const db = await connectDB();

        let topic = await db.collection("lists").findOne({
            slug: listId
        });

        if (!topic && isValidObjectId(listId)) {
            topic = await db.collection("lists").findOne({
                _id: new ObjectId(listId)
            });
        }

        if (!topic) {
            return "not_found";
        }

        return topic;

    } catch (error) {
        console.log("Error in getList", error);
        return "not_found";
    }

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

    try {

        const db = await connectDB();

        let topic = await db.collection("topics").findOne({
            slug: id
        });

        if (!topic && isValidObjectId(id)) {
            topic = await db.collection("topics").findOne({
                _id: new ObjectId(id)
            });
        }

        if (!topic) {
            return "not_found";
        }

        return topic;

    } catch (error) {
        console.log("Error in getTopic", error);
        return "not_found";
    }

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

export async function addLists(data) {

    const db = await connectDB();

    const result = await db.collection("lists").insertMany(data);

    return result.insertedIds;

}

export async function updateATopic(id, data) {
    try {
        const _id = new ObjectId(id);
        const db = await connectDB();
        await db.collection("topics")
            .updateOne({ _id: _id }, { $set: data });
        return true;
    } catch (error) {
        console.log("Error updating topic", error);
        return false;
    }
}


export async function updateAList(id, data) {
    const _id = new ObjectId(id);
    const db = await connectDB();

    await db.collection("lists")
        .updateOne({ _id: _id }, { $set: data });

    return true;

}



export async function addImport(data) {
    const _id = new ObjectId();
    data._id = _id;
    const db = await connectDB();
    await db.collection("imports").insertOne(data);
    return _id;
}

//DELETE

export async function deleteImportedTopics(importId) {

    const db = await connectDB();

    const filter = {
        importId: importId
    };

    let result = 0;
    let result2 = 0;

    try {
        result = await db.collection("topics").deleteMany(filter);
        result2 = await db.collection("lists").deleteMany(filter);
        const imResult = await deleteImport(importId)

    } catch (e) {
        console.log(`${e} error 8575775`)
    }

    return result.deletedCount + result2.deletedCount;
}


export async function deleteImport(importId) {

    const db = await connectDB();

    const filter = {
        _id: new ObjectId(importId)
    };


    try {
        const result = await db.collection("imports").deleteMany(filter);

    } catch (e) {
        console.log("error 7575775")
    }

    return result.deletedCount;
}



function isValidObjectId(id) {
    return ObjectId.isValid(id);
}