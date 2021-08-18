import Axios, { AxiosRequestConfig } from 'axios'
import { Initiative, StakeHolder } from 'utils/types'

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_CMS_ENDPOINT
})

export const getArticles = async (config?: AxiosRequestConfig) => {
  const { data } = await axios.get('/articles', config || {})
  return data
}

export const getRecentArticles = async () => {
  return await getArticles({
    params: {
      '_sort': 'created_at:desc'
    }
  })
}

export const getArticlesByAuthor = async (authorId) => {
  return await getArticles({
    params: {
      'author.id': authorId
    }
  })
}
export const getArticledByInitiative = async (initiativeId) => {
  return await getArticles({
    params: {
      'initiative.id': initiativeId
    }
  })
}

export const getInitiatives = async () => {
  const { data } = await axios.get<Initiative[]>('/initiatives')
  return data
}

export const getStakeHolders = async () => {
  const { data } = await axios.get<StakeHolder[]>('/stake-holders')
  return data
}