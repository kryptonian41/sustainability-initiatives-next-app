import type { NextApiRequest, NextApiResponse } from "next";
import { API } from "utils/api";

export const getArticlesServerSide = async () => {
  return await API.getArticles()
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await getArticlesServerSide();
  res.json(data);
};
