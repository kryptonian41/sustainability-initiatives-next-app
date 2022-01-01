import type { NextApiRequest, NextApiResponse } from 'next'
import algoliasearch from 'algoliasearch'
import { getArticles } from 'utils/api/client-side-api'

const client = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
	process.env.ALGOLIA_ADMIN_API_KEY
)

const index = client.initIndex('projects')

const updateAlgolioData = async () => {
	try {
		let articles = await getArticles()
		articles = articles.map((article) => ({
			...article,
			objectID: article.id,
		}))
		await index.replaceAllObjects(articles, { safe: true })
		return true
	} catch (err) {
		console.log('Error updating Algolia Index')
		console.log(err)
		return false
	}
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		if (!req.headers['x-strapi-event']) return res.status(422).json('')
		if (req.body.model === 'article') {
			const updated = await updateAlgolioData()
			if (!updated) return res.status(500).json('')
		}
		res.status(201).json('')
	} else res.status(405).json('')
}
