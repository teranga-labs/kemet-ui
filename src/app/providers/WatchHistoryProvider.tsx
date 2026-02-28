import React, { type ReactNode, useEffect, useState } from 'react'

import {
	type WatchHistory,
	WatchHistoryContext,
	type WatchHistoryContextType
} from '../contexts/watchHistoryContext'
import { useAuth } from '../hooks/useAuth'

interface WatchHistoryProviderProps {
	children: ReactNode
}

const mockHistory: WatchHistory = {
	'1': { progress: 0.5, lastWatched: new Date().toISOString() }, // Horizons
	'7': { progress: 0.25, lastWatched: new Date().toISOString() }, // Leuk
	'12': { progress: 0.7, lastWatched: new Date().toISOString() }, // Silent Witness
	'27': { progress: 0.3, lastWatched: new Date().toISOString() }, // Harmattan Winds
	'16': { progress: 0.8, lastWatched: new Date().toISOString() }, // The Crown
	'21': { progress: 0.15, lastWatched: new Date().toISOString() }, // Nile Mysteries
	'30': { progress: 0.6, lastWatched: new Date().toISOString() } // Jazz Nights
}

export const WatchHistoryProvider: React.FC<WatchHistoryProviderProps> = ({
	children
}) => {
	const { user } = useAuth()
	const [history, setHistory] = useState<WatchHistory>(mockHistory)

	/*
      useEffect(() => {
        if (user) {
          const storageKey = `watchHistory_${user.id}`
          try {
            const items = window.localStorage.getItem(storageKey)
            setHistory(items ? JSON.parse(items) : {})
          } catch (error) {
            console.error('Could not parse watch history from localStorage', error)
            setHistory({})
          }
        } else {
          setHistory({})
        }
      }, [user])
      */

	useEffect(() => {
		if (user) {
			const storageKey = `watchHistory_${user.id}`
			window.localStorage.setItem(storageKey, JSON.stringify(history))
		}
	}, [history, user])

	const updateWatchProgress = (id: number, progress: number) => {
		setHistory((prevHistory) => ({
			...prevHistory,
			[id]: {
				progress,
				lastWatched: new Date().toISOString()
			}
		}))
	}

	const getWatchProgress = (id: number): number => {
		return history[id]?.progress || 0
	}

	const value: WatchHistoryContextType = {
		history,
		updateWatchProgress,
		getWatchProgress
	}

	return (
		<WatchHistoryContext.Provider value={value}>
			{children}
		</WatchHistoryContext.Provider>
	)
}
