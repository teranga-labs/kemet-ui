import { useEffect, useRef } from 'react'

import { useSearch } from '../../hooks/useSearch'

import SearchField from './SearchField'
import SearchResults from './SearchResults'

function SearchOverlay() {
	const {
		showSearchField,
		hideSearchField,
		showResults,
		searchResults,
		searchQuery,
		handleSearch,
		closeResults
	} = useSearch()

	const searchRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				hideSearchField()
			}
		}

		if (showSearchField) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [showSearchField, hideSearchField])

	return (
		<>
			{showSearchField && (
				<div
					ref={searchRef}
					className='fixed top-[120px] left-0 z-40 w-full bg-transparent'
				>
					<SearchField
						onSubmit={handleSearch}
						placeholder='Search for movies, shows, actors...'
					/>
				</div>
			)}
			{showResults && (
				<SearchResults
					results={searchResults}
					query={searchQuery}
					onClose={closeResults}
				/>
			)}
		</>
	)
}

export default SearchOverlay
