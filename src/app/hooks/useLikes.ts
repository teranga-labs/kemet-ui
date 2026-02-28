import { useContext } from 'react'

import {
	LikesContext,
	type LikesContextType
} from '../contexts/likesContext.ts'

export const useLikes = (): LikesContextType => {
	const context = useContext(LikesContext)
	if (context === undefined) {
		throw new Error('useLikes must be used within a LikesProvider')
	}
	return context
}
