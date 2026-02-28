import { createContext } from 'react'

export interface SubscriptionContextType {
	isSubscribed: boolean
	currentPlan: string | null
	subscribe: (plan: string) => void
	unsubscribe: () => void
}

export const SubscriptionContext = createContext<
	SubscriptionContextType | undefined
>(undefined)
