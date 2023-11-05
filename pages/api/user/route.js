import { connectDB, getCollection } from '../../../utils/mongodb'

export default async function handler(req, res) {
    const { email, uid, name } = req.body
    // Connect to DB
    const client = await connectDB()

    // Get collection
    const collection = await getCollection(client, 'users')

    // Create new item
    const newItem = {
        email: email,
        uid: uid,
        name: name,
    }

    // Insert item into collection 
    const result = await collection.insertOne(newItem)

    // Close connection
    client.close()

    // Return result
    res.status(201).json(result)

}