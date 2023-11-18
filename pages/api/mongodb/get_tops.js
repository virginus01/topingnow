import { getTops } from './query';

export default async function handler(req, res) {

    switch (req.method) {

        case 'GET':
            const { limit } = req.query;

            const data = await getTops({ limit });

            if (!data) {
                res.status(500).json({ error: 'Failed to fetch tops' })
            } else {
                res.status(200).json({ data })
            }
            break;

        default:
            res.status(405).end()
    }

}