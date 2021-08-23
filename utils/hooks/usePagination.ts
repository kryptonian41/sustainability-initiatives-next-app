import { useCallback, useEffect, useMemo, useState } from "react"

interface Options {
  initialItemsPerPage: number,
  initialPageNumber: number,
  totalItems: number
}

export const usePagination = ({ totalItems, initialItemsPerPage, initialPageNumber }: Options) => {

  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)
  const [currentPage, setCurrentPage] = useState(initialPageNumber)
  const [startIndex, setStartIndex] = useState(1)
  const [endIndex, setEndIndex] = useState(1)

  const numberOfPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage)
  }, [totalItems, itemsPerPage])

  const setPageNumber = useCallback((arg) => {
    if (arg instanceof Function) {
      arg = arg(currentPage)
    }
    if (arg <= 0 || arg > numberOfPages) return
    setCurrentPage(arg)

  }, [currentPage, numberOfPages])

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems)
    setStartIndex(startIndex)
    setEndIndex(endIndex)
  }, [currentPage, itemsPerPage, totalItems])

  return { numberOfPages, startIndex, endIndex, setItemsPerPage, setCurrentPage: setPageNumber, currentPage }
}