import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URL;
const MONGODB_DB = process.env.MONGODB_DATABASE;

// Cache the database connection
let cachedDb = null;

async function connectToDatabase(uri) {
    if (cachedDb && cachedDb.serverConfig) {
        if (cachedDb.serverConfig.isConnected()) {
            console.log('=> using cached database instance');
            return cachedDb;
        } else {
            console.log('=> cached connection closed, reconnecting...');
        }
    }

    try {
        const client = await MongoClient.connect(uri);
        cachedDb = client.db(MONGODB_DB);
        return cachedDb;

    } catch (err) {
        console.error('Failed to reconnect: ', err);
        throw err;
    }


}

async function connectDB() {
    const client = await connectToDatabase(MONGODB_URI);
    return client;
}

export { connectDB };