import { createContext } from 'react'

export interface SavedContentContextType {
	savedItems: number[]
	addSavedItem: (id: number) => void
	removeSavedItem: (id: number) => void
	isItemSaved: (id: number) => boolean
}

export const SavedContentContext = createContext<
	SavedContentContextType | undefined
>(undefined)
