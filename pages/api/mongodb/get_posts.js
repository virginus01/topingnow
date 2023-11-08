import { getPosts } from './query';

export default async function handler(req, res) {

    switch (req.method) {

        case 'GET':
            const { limit } = req.query;

            const data = await getPosts({ limit });

            if (!data) {
                res.status(500).json({ error: 'Failed to fetch posts' })
            } else {
                res.status(200).json({ data })
            }
            break;

        default:
            res.status(405).end()
    }

}