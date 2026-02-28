import { createContext } from 'react'

import type { MediaItem } from '../../data/shows.ts'

export interface SearchContextType {
	searchQuery: string
	searchResults: MediaItem[]
	showResults: boolean
	showSearchField: boolean
	setSearchQuery: (query: string) => void
	setSearchResults: (results: MediaItem[]) => void
	setShowResults: (show: boolean) => void
	setShowSearchField: (show: boolean) => void
	handleSearch: (query: string) => void
	handleToggleSearch: () => void
	hideSearchField: () => void
	closeResults: () => void
}

export const SearchContext = createContext<SearchContextType | undefined>(
	undefined
)
