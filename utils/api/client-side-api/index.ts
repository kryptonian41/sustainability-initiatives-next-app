import Axios, { AxiosRequestConfig } from 'axios'

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