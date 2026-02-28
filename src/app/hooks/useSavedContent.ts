import { useContext } from 'react'

import {
	SavedContentContext,
	type SavedContentContextType
} from '../contexts/SavedContentContext.ts'

export const useSavedContent = (): SavedContentContextType => {
	const context = useContext(SavedContentContext)
	if (context === undefined) {
		throw new Error(
			'useSavedContent must be used within a SavedContentProvider'
		)
	}
	return context
}
