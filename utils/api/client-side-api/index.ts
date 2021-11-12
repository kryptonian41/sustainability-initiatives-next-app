import Axios, { AxiosRequestConfig } from "axios";
import {
  Article,
  Associate,
  Initiative,
  Quote,
  StakeHolder,
} from "utils/types";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_CMS_ENDPOINT,
});

export const getArticles = async (config?: AxiosRequestConfig) => {
  const { data } = await axios.get<Article[]>("/articles", config || {});
  return data;
};

export const getRecentArticles = async () => {
  return await getArticles({
    params: {
      _sort: "created_at:desc",
    },
  });
};

export const getArticleById = async (id: number) => {
  const { data } = await axios.get<Article[]>("/articles", {
    params: {
      id,
    },
  });
  return data[0];
};

export const getArticleBySlug = async (slug: string) => {
  const { data } = await axios.get<Article[]>("/articles", {
    params: {
      slug,
    },
  });
  return data[0];
};

export const getArticlesByAuthor = async (authorId, sortByLatest = false) => {
  let params: Object = {
    "author.id": authorId,
  };
  if (sortByLatest)
    params = {
      ...params,
      _sort: "published_at:desc",
    };
  return await getArticles({
    params,
  });
};

export const getArticledByInitiativeSlug = async (slug: string) => {
  return await getArticles({
    params: {
      "initiative.slug": slug,
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

export const getInitiaveBySlug = async (slug: string) => {
  const { data } = await axios.get<Initiative[]>("/initiatives", {
    params: {
      slug,
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

export const getAnnualReports = async () => {
  const { data } = await axios.get<Quote[]>("/annual-reports");
  return data;
}