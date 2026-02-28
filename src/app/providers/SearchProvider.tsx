import { type ReactNode, useEffect, useState } from 'react'

import type { MediaItem } from '../../data/shows.ts'
import { SearchContext } from '../contexts/SearchContext.ts'

interface SearchProviderProps {
	children: ReactNode
	allItems: MediaItem[]
}

export function SearchProvider({ children, allItems }: SearchProviderProps) {
	const [searchQuery, setSearchQuery] = useState('')
	const [searchResults, setSearchResults] = useState<MediaItem[]>([])
	const [showResults, setShowResults] = useState(false)
	const [showSearchField, setShowSearchField] = useState(false)

	useEffect(() => {
		const savedSearchQuery = localStorage.getItem('searchQuery')
		if (savedSearchQuery) {
			setSearchQuery(savedSearchQuery)
		}
	}, [])

	const handleToggleSearch = () => {
		setShowSearchField((prev) => !prev)
		setShowResults(false)
	}

	const handleSearch = (query: string) => {
		setSearchQuery(query)
		localStorage.setItem('searchQuery', query)

		const results = allItems.filter(
			(item) =>
				item.title.toLowerCase().includes(query.toLowerCase()) ||
				item.description?.toLowerCase().includes(query.toLowerCase()) ||
				item.genres?.some((genre) =>
					genre.toLowerCase().includes(query.toLowerCase())
				) ||
				(item.cast &&
					item.cast.some((actor) =>
						actor.toLowerCase().includes(query.toLowerCase())
					))
		)

		setSearchResults(results)
		setShowResults(true)
		setShowSearchField(false)
	}

	const hideSearchField = () => {
		setShowSearchField(false)
	}

	const closeResults = () => {
		setShowResults(false)
		setSearchQuery('')
		localStorage.removeItem('searchQuery')
	}

	const value = {
		searchQuery,
		searchResults,
		showResults,
		showSearchField,
		setSearchQuery,
		setSearchResults,
		setShowResults,
		setShowSearchField,
		handleSearch,
		handleToggleSearch,
		hideSearchField,
		closeResults
	}

	return (
		<SearchContext.Provider value={value}>{children}</SearchContext.Provider>
	)
}
