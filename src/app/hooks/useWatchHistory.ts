import { useContext } from 'react'

import {
	WatchHistoryContext,
	type WatchHistoryContextType
} from '../contexts/watchHistoryContext'

export const useWatchHistory = (): WatchHistoryContextType => {
	const context = useContext(WatchHistoryContext)
	if (context === undefined) {
		throw new Error(
			'useWatchHistory must be used within a WatchHistoryProvider'
		)
	}
	return context
}
