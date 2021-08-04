import { Article } from "utils/types";

export const sortArticlesByDate = (articles: Article[]) => {
  return articles.sort((a, b) => {
    const dateA = new Date(a.created_at)
    const dateB = new Date(b.created_at)
    return dateA.getTime() - dateB.getTime()
  })
}
export const sortArticlesByLocation = (articles: Article[]) => {
  return articles.sort((a, b) => {
    if (a.location.label < b.location.label) return 1
    else if (a.location.label === b.location.label) return 1
    return -1
  })
}