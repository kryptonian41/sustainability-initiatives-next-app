import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const updateAlgolioData = async (body) => {
	console.log(body)
	return true
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		if (!req.headers['x-strapi-event']) return res.status(422).json('')
		if (req.body.model === 'article') await updateAlgolioData(req.body)
		res.status(201).json('')
	} else res.status(405).json('')
}
