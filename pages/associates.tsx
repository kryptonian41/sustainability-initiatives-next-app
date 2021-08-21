import { Container } from 'components/Container'
import Pagination from 'components/Pagination'
import PhotoGrid from 'components/PhotoGrid'
import { GridItemProps } from 'components/PhotoGrid/GridPhoto'
import { GetStaticProps } from 'next'
import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import { getAssociates } from 'utils/api/client-side-api'
import { Associate } from 'utils/types'

interface Props {
  associates: Associate[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      associates: await getAssociates()
    }
  }
}


const Associates: React.FC<Props> = ({ associates }) => {
  const [itemsPerPage, setItemPerPage] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)
  const [showPaginationBar, numberOfPages] = useMemo(() => {
    return [associates.length > itemsPerPage, Math.ceil(associates.length / itemsPerPage)]
  }, [associates, itemsPerPage])

  const gridItems = useMemo<GridItemProps[]>(() => {
    return associates.map(associate => {
      return {
        title: associate.name,
        imgSrc: associate.logo.url
      }
    })
  }, [associates])

  const paginatedItems = useMemo<GridItemProps[]>(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = currentPage * itemsPerPage
    return gridItems.splice(startIndex, endIndex)
  }, [gridItems, currentPage])

  const createPaginationActionHandler = useCallback((action) => (arg) => {
    switch (action) {
      case 'prev': {
        if (currentPage === 1) return
        setCurrentPage(page => page - 1)
        break;
      }

      case 'next': {
        if (currentPage === numberOfPages) return
        setCurrentPage(page => page + 1)
        break;
      }

      case 'number': {
        if (arg) setCurrentPage(arg)
      }

      default:
        break;
    }
  }, [currentPage, numberOfPages])

  return (
    <div>
      <Container>
        <PhotoGrid items={paginatedItems} heading="Associates who stand with us" itemsPerRow={4} containerStyles={{
          // @ts-ignore
          '--gap': '10rem'
        }} />

        {
          showPaginationBar &&
          <div className="mt-20">
            <Pagination
              numberOfPages={numberOfPages}
              selectedPage={currentPage}
              prevClickAction={createPaginationActionHandler('prev')}
              nextClickAction={createPaginationActionHandler('next')}
              pageBtnAction={createPaginationActionHandler('number')} />
          </div>
        }
      </Container>
    </div>
  )
}

export default Associates
