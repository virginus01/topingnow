import { connectDB } from '@/app/utils/mongodb'
import { ObjectId } from 'mongodb';
import { dataProcess, removeById } from '@/app/utils/custom_helpers';
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


export async function getTopsByImport(importId, page = 1, perPage = 10, q = '') {
    const skip = (page - 1) * perPage;

    const db = await connectDB();
    let filter = { importId: importId };

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


export async function getListsByImport(importId, page = 1, perPage = 10, q = '') {
    const skip = (page - 1) * perPage;

    const db = await connectDB();
    let filter = { importId: importId };

    if (!isNull(q)) {
        filter = { title: { $regex: new RegExp(q, 'i') } }
    } else {
        filter = {};
    }

    let [result, total] = await Promise.all([
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


export async function getTopicsByImport(importId, page = 1, perPage = 10, process = 'yes') {

    const skip = (page - 1) * perPage;

    const db = await connectDB();

    const filter = importId ? { importId } : {};

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
        await dataProcess(result)
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

export async function getTopics(topId, page = 1, perPage = 10, process = 'yes', q) {

    const skip = (page - 1) * perPage;

    const db = await connectDB();

    let filter = topId ? { topId } : {};

    if (!isNull(q)) {
        filter = { title: { $regex: new RegExp(q, 'i') } }
    }

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
        await dataProcess(result)
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


export async function fetchFiles(page = 1, perPage = 10) {

    try {

        const skip = (page - 1) * perPage;

        const db = await connectDB();

        const [result, total] = await Promise.all([
            db.collection("files").find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(perPage)
                .toArray(),
            db.collection("files").estimatedDocumentCount()
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

        console.log("Error in fetchFiles", error);
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


export async function fetchAQandA(id, rand = 'no') {


    try {

        const db = await connectDB();

        let temp = await db.collection("qandas").findOne({
            slug: id
        });

        if (!temp && isValidObjectId(id)) {
            temp = await db.collection("qandas").findOne({
                _id: new ObjectId(id)
            });
        }

        if (!temp) {
            return "not_found";
        }

        return temp;

    } catch (error) {
        console.log("Error in getQandA", error);
        return "not_found";
    }

}


export async function fetchQandAs(listId, page = 1, perPage = 10, process = 'yes') {
    try {

        listId = String(listId);

        const skip = (page - 1) * perPage;

        const db = await connectDB();

        const filter = listId ? { listId } : {};

        const [result, total] = await Promise.all([
            db.collection("qandas").find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(perPage))
                .toArray(),

            db.collection("qandas")
                .estimatedDocumentCount(filter)
        ]);

        const numPages = Math.ceil(total / perPage);
        const hasNextPage = page < numPages;
        const hasPrevPage = page > 1;

        if (!result) {
            return "not_found";
        }

        if (process === 'yes') {
            await dataProcess(result)
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

        console.error(error);
        return { success: false };

    }

}


export async function getLists(topicId, page = 1, perPage = 10, process = 'yes') {


    const skip = (page - 1) * perPage;

    const db = await connectDB();

    const filter = topicId ? { topicId } : {};

    const [result, total] = await Promise.all([
        db.collection("lists").find(filter)
            .sort({ rankingScore: -1 })
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

    if (process === 'yes') {
        await dataProcess(result)
    }

    if (!isNull(result)) {
        const ids = result.map((t) => String(t.topicId));
        const topics = await Promise.all(ids.map((t) => getTopic(t, 'no', 1, 10, 'yes')));
        result.map((post, i) => {
            result[i].topicData = topics[i]
            result[i].postSlug = `${topics[i].slug}/${result[i].slug}`
        })
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

export async function getList(listId, essentials = 'yes', process = "yes") {

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
        if (process === 'yes') {
            await dataProcess(topic)
        }

        if (essentials == 'yes') {
            const tTop = await getTopic(String(topic.topicId), "no", 1, 10, process)
            topic.topicData = tTop;

            const tQ = await fetchQandAs(topic._id, 1, 10, process)
            topic.qanda = tQ;

        }

        return topic;

    } catch (error) {
        console.log("Error in getList", error);
        return "not_found";
    }

}

export async function getPopularTopics(excludeId = '', page = 1, perPage = 10, process = 'yes') {
    const skip = (page - 1) * perPage;

    const db = await connectDB();

    const filter = excludeId ? { _id: { $ne: new ObjectId(excludeId) } } : {};

    const [result, total] = await Promise.all([
        db.collection("topics").find(filter)
            .sort({ views: -1 })
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
        await dataProcess(result)
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


export async function getPopularLists(excludeId = '', essentials = '', page = 1, perPage = 10, process = 'yes') {
    const skip = (page - 1) * perPage;

    const db = await connectDB();

    const filter = excludeId ? { _id: { $ne: new ObjectId(excludeId) } } : {};

    const [result, total] = await Promise.all([
        db.collection("lists").find(filter)
            .sort({ views: -1 })
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

    if (process === 'yes') {
        await dataProcess(result)
    }

    if (!isNull(result)) {
        const ids = result.map((t) => String(t.topicId));
        const topics = await Promise.all(ids.map((t) => getTopic(t, 'no', 1, 10, 'yes')));
        result.map((post, i) => {
            result[i].topicData = topics[i]
            result[i].postSlug = `${topics[i].slug}/${result[i].slug}`
        })
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


export async function getTopic(id, essentials = 'yes', page = 1, perPage = 10, process = 'yes',) {

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

        if (essentials == 'yes') {
            const tTop = await getTop(String(topic.topId))
            topic.topicTop = tTop;

            const tLists = await getLists(String(topic._id), page, parseInt(tTop.name, 10), "yes")

            topic.lists = tLists;

        }

        if (process === 'yes') {
            await dataProcess(topic)
        }

        return topic;

    } catch (error) {
        console.log("Error in getTopic", error);
        return "not_found";
    }


}


export async function getTop(id, process = 'yes') {

    try {

        const db = await connectDB();

        let topic = await db.collection("tops").findOne({
            slug: id
        });

        if (!topic && isValidObjectId(id)) {
            topic = await db.collection("tops").findOne({
                _id: new ObjectId(id)
            });
        }

        if (isNull(topic)) {
            return "not_found";
        }

        if (process === 'yes') {
            await dataProcess(topic)
        }

        return topic;

    } catch (error) {
        console.log("Error in getTop", error);
        return "not_found";
    }

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


export async function addQandAs(data) {

    const db = await connectDB();

    const result = await db.collection("qandas").insertMany(data);

    return { success: true, ids: result.insertedIds };
}

export async function addFiles(data) {

    const db = await connectDB();

    const result = await db.collection("files").insertMany(data);

    return result.insertedIds;
}


export async function addTops(data) {

    const db = await connectDB();

    const result = await db.collection("tops").insertMany(data);

    return { success: true, ids: result.insertedIds, data: data };
}



export async function addTopics(data) {
    const db = await connectDB();

    const result = await db.collection("topics").insertMany(data);

    return { success: true, ids: result.insertedIds };
}

export async function addLists(data) {

    const db = await connectDB();

    const result = await db.collection("lists").insertMany(data);

    return { success: true, ids: result.insertedIds };
}

export async function updateATopic(id, data) {
    try {
        const _id = new ObjectId(id);
        const db = await connectDB();
        await db.collection("topics")
            .updateOne({ _id: _id }, { $set: data });
        return { success: true };
    } catch (error) {
        console.log("Error updating topic", error);
        return { success: false };
    }
}


export async function updateATemplate(id, data) {


    const _id = new ObjectId(id);
    const db = await connectDB();

    await db.collection("templates")
        .updateOne({ _id: _id }, { $set: data });

    return true;
}

export async function updateAQandA(id, data) {

    const _id = new ObjectId(id);
    const db = await connectDB();

    await db.collection("qandas")
        .updateOne({ _id: _id }, { $set: data });

    return true;
}


export async function updateAList(id, data) {

    try {
        const _id = new ObjectId(String(id));
        const db = await connectDB();
        await db.collection("lists")
            .updateOne({ _id: _id }, { $set: data });
        return { success: true };
    } catch (error) {
        console.log(error)
        return { success: false }
    }

}

export async function updateATop(id, data) {

    const _id = new ObjectId(id);
    const db = await connectDB();

    await db.collection("tops")
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

export async function removeTopics(id, topId, importId) {


    const db = await connectDB();

    let result;


    try {

        if (importId) {
            const res = await getTopicsByImport(importId, 1, 1000000, 'no');
            if (!isNull(res.result)) {
                const ids = res.result.map((t) => String(t._id));
                const delLists = await Promise.all(ids.map((t) => removeList(null, t, null)));
            }
            result = await db.collection("topics").deleteMany({ importId: importId });
        }

        if (topId) {
            const res = await getTopics(topId, 1, 1000000, 'no');
            if (!isNull(res.result)) {
                const ids = res.result.map((t) => String(t._id));
                const delLists = await Promise.all(ids.map((t) => removeList(null, t, null)));
            }
            result = await db.collection("topics").deleteMany({ topId: topId });
        }

        if (id && isValidObjectId(id)) {
            result = await db.collection("topics").deleteMany({ _id: new ObjectId(id) });
            const delLists = await removeList(null, id, null);
        }


    } catch (error) {
        console.log('Error removing topics:', error);
        return 0;
    }

    return result;
}



export async function removeList(id, topicId, importId) {

    const db = await connectDB();

    let result;

    try {
        if (importId) {
            result = await db.collection("lists").deleteMany({ importId: importId });
            const res = await getListsByImport(importId, 1, 1000000, '');

            if (!isNull(res.result)) {
                const ids = res.result.map((t) => String(t._id));
                const delLists = await Promise.all(ids.map((t) => removeQandA(t, null, null)));
            }

        }

        if (topicId) {
            result = await db.collection("lists").deleteMany({ topicId: topicId });
        }

        if (id && isValidObjectId(id)) {
            result = await db.collection("lists").deleteMany({ _id: new ObjectId(id) });
            await removeQandA(null, null, id)
        }


    } catch (error) {
        console.log('Error removing lists:', error);
        return 0;
    }

    return result.deletedCount;
}




export async function removeQandA(id, importId, listId) {

    const db = await connectDB();

    let result;

    try {
        if (importId) {
            result = await db.collection("qandas").deleteMany({ importId: importId });

        }

        if (listId) {
            result = await db.collection("qandas").deleteMany({ listId: listId });

        }

        if (id && isValidObjectId(id)) {

            result = await db.collection("qandas").deleteMany({ _id: new ObjectId(id) });
        }


    } catch (error) {
        console.log('Error removing lists:', error);
        return 0;
    }

    return { success: true, count: result.deletedCount };
}



export async function removeTop(id, importId) {

    const db = await connectDB();

    let result = 0;
    let result2 = 0;

    try {
        if (id) {
            result = await db.collection("tops").deleteOne({ _id: new ObjectId(id) });
            await removeTopics(null, id, null);
        }

        if (importId) {
            const res = await getTopsByImport(importId, 1, 1000000, '');

            if (!isNull(res.result)) {
                const ids = res.result.map((t) => String(t._id));
                const delLists = await Promise.all(ids.map((t) => removeTopics(null, t, null)));
            }
            result = await db.collection("tops").deleteMany({ importId: importId });
        }

        return { success: true }

    } catch (e) {
        console.log(`${e} error 88364575`)
        return { success: false }
    }
}


export async function removeImport(importId) {

    const db = await connectDB();

    const filter = {
        _id: new ObjectId(importId)
    };


    try {
        const result = await db.collection("imports").deleteMany(filter);
        await removeTop(null, importId);
        await removeList(null, null, importId);
        await removeTopics(null, null, importId);

    } catch (e) {
        console.log("error 7575775")
    }

    return result;
}



function isValidObjectId(id) {
    return ObjectId.isValid(id);
}