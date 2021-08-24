import { Article } from "utils/types";
import { format } from 'date-fns'

export const sortArticlesByDate = (articles: Article[]) => {
  const result = articles.sort((a, b) => {
    const dateA = new Date(a.created_at)
    const dateB = new Date(b.created_at)
    return dateA.getTime() - dateB.getTime()
  })
  return result
}
export const sortArticlesByLocation = (articles: Article[]) => {
  const result = articles.sort((a, b) => {
    if (a.location.label < b.location.label) return 1
    else if (a.location.label > b.location.label) return -1
    return 1
  })
  return result
}

export const prettyDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return format(date, 'd MMM yyyy')
}
