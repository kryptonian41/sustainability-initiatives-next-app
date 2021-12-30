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
	'VVU6QVGRGK',
	'1c9f93c2dc5960b701a909eafbdaea2d'
)

const Search = ({ showSearch, onClose }) => {
	const Hit = ({ hit }) => {
		return (
			<div>
				<Link href={`/articles/${hit.slug}`}>
					<div onClick={onClose}>
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
						{/* <p className='text-xs italic'>in {hit.initiative?.title}</p> */}
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
