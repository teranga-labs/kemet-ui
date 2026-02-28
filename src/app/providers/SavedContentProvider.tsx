import React, { type ReactNode, useEffect, useState } from 'react'

import {
	SavedContentContext,
	type SavedContentContextType
} from '../contexts/SavedContentContext.ts'
import { useAuth } from '../hooks/useAuth.ts'

interface SavedContentProviderProps {
	children: ReactNode
}

export const SavedContentProvider: React.FC<SavedContentProviderProps> = ({
	children
}) => {
	const { user } = useAuth()
	const [savedItems, setSavedItems] = useState<number[]>([])

	useEffect(() => {
		if (user) {
			const storageKey = `savedContent_${user.id}`
			try {
				const items = window.localStorage.getItem(storageKey)
				setSavedItems(items ? JSON.parse(items) : [])
			} catch (error) {
				console.error('Could not parse saved content from localStorage', error)
				setSavedItems([])
			}
		} else {
			setSavedItems([])
		}
	}, [user])

	useEffect(() => {
		if (user) {
			const storageKey = `savedContent_${user.id}`
			window.localStorage.setItem(storageKey, JSON.stringify(savedItems))
		}
	}, [savedItems, user])

	const addSavedItem = (id: number) => {
		setSavedItems((prevItems) => [...prevItems, id])
	}

	const removeSavedItem = (id: number) => {
		setSavedItems((prevItems) => prevItems.filter((itemId) => itemId !== id))
	}

	const isItemSaved = (id: number) => {
		return savedItems.includes(id)
	}

	const value: SavedContentContextType = {
		savedItems,
		addSavedItem,
		removeSavedItem,
		isItemSaved
	}

	return (
		<SavedContentContext.Provider value={value}>
			{children}
		</SavedContentContext.Provider>
	)
}
