import { connectToDatabase } from '../../utils/mongodb'


export default async function getMongoDBCollection(req, res) {

    // Get client
    const client = await connectToDatabase();

    // Get collection 
    const collection = client.db(MONGODB_DB).collection('users');

    // Find documents
    const users = await collection.find({}).toArray();

    // Return data 
    res.status(200).json(users);

    // Close client
    client.close();
}