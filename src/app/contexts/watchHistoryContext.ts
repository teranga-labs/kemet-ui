import { createContext } from 'react'

export interface WatchProgress {
	progress: number
	lastWatched: string
}

export interface WatchHistory {
	[itemId: number]: WatchProgress
}

export interface WatchHistoryContextType {
	history: WatchHistory
	updateWatchProgress: (id: number, progress: number) => void
	getWatchProgress: (id: number) => number
}

export const WatchHistoryContext = createContext<
	WatchHistoryContextType | undefined
>(undefined)
