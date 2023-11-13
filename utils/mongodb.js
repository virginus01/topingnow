import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URL;
const MONGODB_DB = process.env.MONGODB_DATABASE;

// check connection 
async function connectToDB() {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    return client
}

async function connectDB() {
    const client = await connectToDB();
    return client.db(MONGODB_DB);
}

export { connectDB }