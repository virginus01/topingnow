import { connectDB } from '@/app/utils/mongodb'
import { ObjectId } from 'mongodb';
import { dataProcess, dataProcess2, tempProcess } from '@/app/utils/custom_helpers';
import { isNull } from '@/app/utils/custom_helpers';

export async function getTops(page = 1, perPage = 10, q = '') {
    const skip = (page - 1) * perPage;

    const db = await connectDB();
    let filter = {};

    if (!isNull(q)) {
        filter = { title: { $regex: new RegExp(q, 'i') } }
    } else {
        filter = {};
    }

    let [result, total] = await Promise.all([
        db.collection("tops").find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(perPage)
            .toArray(),

        db.collection("tops")
            .estimatedDocumentCount(filter)
    ]);

    const numPages = Math.ceil(total / perPage);
    const hasNextPage = page < numPages;
    const hasPrevPage = page > 1;

    if (!result) {
        return "not_found";
    }

    const topTopicsPromises = result.map(async (data) => {
        const tTopics = await getTopics(String(data._id), 1, 10);
        return {
            ...data,
            topTopics: tTopics
        };
    });

    result = await Promise.all(topTopicsPromises);


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




export async function getTopics(topId, page = 1, perPage = 10, process = 'yes') {

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


    if (process === 'yes') {
        dataProcess(result)
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


export async function getTopicsWithLists(topId, page = 1, perPage = 10) {



    result.map(async (data) => {
        const tLists = await getLists(data._id, page = 1, perPage = 10)
        result.lists = tLists;
    })


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

export async function fetchTemplates(page = 1, perPage = 10) {

    try {

        const skip = (page - 1) * perPage;

        const db = await connectDB();

        const [result, total] = await Promise.all([
            db.collection("templates").find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(perPage)
                .toArray(),
            db.collection("templates").estimatedDocumentCount()
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
        console.log("Error in fetchTemplates", error);
        return "not_found";

    }

}


export async function fetchTemplate(templateId, rand = 'no') {

    try {

        const db = await connectDB();

        let temp = await db.collection("templates").findOne({
            title: templateId
        });

        if (!temp && isValidObjectId(templateId)) {
            temp = await db.collection("templates").findOne({
                _id: new ObjectId(templateId)
            });
        }

        if (!temp) {
            return "not_found";
        }

        return temp;

    } catch (error) {
        console.log("Error in getTemplate", error);
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

export async function getPopularTopics(excludeId = '', page = 1, perPage = 10) {
    const skip = (page - 1) * perPage;

    const db = await connectDB();

    const filter = excludeId ? { _id: { $ne: new ObjectId(excludeId) } } : {};

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

export async function stat() {
    const db = await connectDB();
    const result = await db.collection.find().explain("executionStats");
    return result;
}

export async function getTopic(id, process = 'yes') {

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

        if (process === 'yes') {
            dataProcess(topic)
        }

        return topic;

    } catch (error) {
        console.log("Error in getTopic", error);
        return "not_found";
    }

}

export async function getTopicWithEssentials(id, page = 1, process = 'yes') {

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

        const tTop = await getTop(String(topic.topId))
        topic.topicTop = tTop;

        const tLists = await getLists(String(topic._id), page, parseInt(tTop.name, 10))
        topic.lists = tLists;

        if (process === 'yes') {
            topic = dataProcess(topic)
            // topic = await tempProcess(topic)
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

export async function addList(data) {

    const _id = new ObjectId();
    data._id = _id;
    const db = await connectDB();
    await db.collection("lists").insertOne(data);
    return _id;
}


export async function addTemplate(data) {

    const db = await connectDB();

    const result = await db.collection("templates").insertMany(data);

    return result.insertedIds;
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


export async function updateATemplate(id, data) {


    const _id = new ObjectId(id);
    const db = await connectDB();

    await db.collection("templates")
        .updateOne({ _id: _id }, { $set: data });

    return true;
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

export async function removeTopicsWithLists(topicId) {

    const db = await connectDB();

    const filter = { _id: new ObjectId(topicId) };

    const filter2 = {
        topicId: topicId
    };

    let result = 0;
    let result2 = 0;

    try {
        result = await db.collection("topics").deleteOne(filter);
        result2 = await db.collection("lists").deleteMany(filter2);

    } catch (e) {
        console.log(`${e} error 85843775`)
    }

    const res = result.deletedCount + result2.deletedCount;


    return res;
}


export async function removeList(listId) {

    const db = await connectDB();

    const filter = { _id: new ObjectId(listId) };

    let result = 0;
    let result2 = 0;

    try {
        result = await db.collection("lists").deleteOne(filter);

    } catch (e) {
        console.log(`${e} error 88364575`)
    }

    const res = result.deletedCount + result2.deletedCount;

    return res;
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