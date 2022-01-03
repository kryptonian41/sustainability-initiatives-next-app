import algoliasearch from 'algoliasearch/lite'
import Modal from 'components/Modal'
import {
	InstantSearch,
	SearchBox,
	Hits,
	InfiniteHits,
	Highlight,
} from 'react-instantsearch-dom'
import Link from 'next/link'

const searchClient = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
	process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
)

const Search = ({ showSearch, onClose }) => {
	const Hit = ({ hit }) => {
		return (
			<div>
				<Link href={`/articles/${hit.slug}`}>
					<div onClick={onClose} className="cursor-pointer">
						<h4 className="font-bold">
							<Highlight attribute="title" hit={hit} tagName="mark" />
						</h4>
						<p className="text-xs italic">
							<Highlight
								attribute="initiative.title"
								hit={hit}
								tagName="mark"
							/>
						</p>
						<p className="text-sm">
							<Highlight attribute="summary" hit={hit} tagName="mark" />
						</p>
					</div>
				</Link>
			</div>
		)
	}
	return (
		<Modal isOpen={showSearch} onClose={onClose}>
			<div style={{ minHeight: '60vh' }}>
				<InstantSearch
					searchClient={searchClient}
					indexName="projects"
				>
					<SearchBox
						translations={{ placeholder: 'Search projects' }}
						showLoadingIndicator
						autoFocus
					/>
					{/* <Hits hitComponent={Hit} /> */}
					<InfiniteHits hitComponent={Hit} />
				</InstantSearch>
			</div>
		</Modal>
	)
}

export default Search
