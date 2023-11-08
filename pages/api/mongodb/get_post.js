import { getPost } from './query';

export default async function handler(req, res) {

    switch (req.method) {

        case 'GET':
            const { id } = req.query;

            const data = await getPost({ id });

            if (!data) {
                res.status(500).json({ error: 'Failed to fetch post data' })
            } else {
                res.status(200).json({ data })
            }
            break;

        default:
            res.status(405).end()
    }

}