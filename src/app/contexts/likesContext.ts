import { createContext } from 'react'

export interface LikesContextType {
	likedItems: number[]
	addLikedItem: (id: number) => void
	removeLikedItem: (id: number) => void
	isItemLiked: (id: number) => boolean
}

export const LikesContext = createContext<LikesContextType | undefined>(
	undefined
)
