import Axios, { AxiosRequestConfig } from 'axios'
import { Article, Associate, Initiative, Quote, StakeHolder } from 'utils/types'

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_CMS_ENDPOINT,
});

export const getArticles = async (config?: AxiosRequestConfig) => {
  const { data } = await axios.get<Article[]>('/articles', config || {})
  return data
}

export const getRecentArticles = async () => {
  return await getArticles({
    params: {
      _sort: "created_at:desc",
    },
  });
};

export const getArticleById = async (id: number) => {
  const { data } = await axios.get<Article[]>('/articles', {
    params: {
      id
    }
  })
  return data[0]
}


export const getArticlesByAuthor = async (authorId) => {
  return await getArticles({
    params: {
      "author.id": authorId,
    },
  });
};
export const getArticledByInitiative = async (initiativeId) => {
  return await getArticles({
    params: {
      "initiative.id": initiativeId,
    },
  });
};

export const getInitiatives = async () => {
  const { data } = await axios.get<Initiative[]>("/initiatives");
  return data;
};

export const getInitiaveById = async (initiativeId: number) => {
  const { data } = await axios.get<Initiative[]>("/initiatives", {
    params: {
      id: initiativeId,
    },
  });
  return data[0];
};

export const getStakeHolders = async (config?: AxiosRequestConfig) => {
  const { data } = await axios.get<StakeHolder[]>(
    "/stake-holders",
    config || {}
  );
  return data;
};

export const getStakeHolderBySlug = async (slug) => {
  return await getStakeHolders({
    params: {
      slug,
    },
  });
};

export const getAssociates = async () => {
  const { data } = await axios.get<Associate[]>("/associates");
  return data;
};

export const getQuotes = async () => {
  const { data } = await axios.get<Quote[]>("/quotes");
  return data;
};
