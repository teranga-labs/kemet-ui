import React, { type ReactNode, useEffect, useState } from 'react'

import {
	LikesContext,
	type LikesContextType
} from '../contexts/likesContext.ts'
import { useAuth } from '../hooks/useAuth.ts'

interface LikesProviderProps {
	children: ReactNode
}

export const LikesProvider: React.FC<LikesProviderProps> = ({ children }) => {
	const { user } = useAuth()
	const [likedItems, setLikedItems] = useState<number[]>([])

	useEffect(() => {
		if (user) {
			const storageKey = `likedContent_${user.id}`
			try {
				const items = window.localStorage.getItem(storageKey)
				setLikedItems(items ? JSON.parse(items) : [])
			} catch (error) {
				console.error('Could not parse liked content from localStorage', error)
				setLikedItems([])
			}
		} else {
			setLikedItems([])
		}
	}, [user])

	useEffect(() => {
		if (user) {
			const storageKey = `likedContent_${user.id}`
			window.localStorage.setItem(storageKey, JSON.stringify(likedItems))
		}
	}, [likedItems, user])

	const addLikedItem = (id: number) => {
		setLikedItems((prevItems) => {
			if (prevItems.includes(id)) return prevItems
			return [...prevItems, id]
		})
	}

	const removeLikedItem = (id: number) => {
		setLikedItems((prevItems) => prevItems.filter((itemId) => itemId !== id))
	}

	const isItemLiked = (id: number) => {
		return likedItems.includes(id)
	}

	const value: LikesContextType = {
		likedItems,
		addLikedItem,
		removeLikedItem,
		isItemLiked
	}

	return <LikesContext.Provider value={value}>{children}</LikesContext.Provider>
}
