import { MongoClient } from 'mongodb'
import dotenv from 'dotenv';

dotenv.config();


const MONGODB_URI = process.env.MONGODB_URL;
const MONGODB_DB = process.env.MONGODB_DATABASE;

// check connection 
async function connectDB() {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    return client
}


// get collection 
async function getCollection(client, name) {
    const db = client.db(MONGODB_DB)
    return db.collection(name)
}

export { connectDB, getCollection }