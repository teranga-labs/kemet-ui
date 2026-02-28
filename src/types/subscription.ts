export interface SubscriptionContextType {
	isSubscribed: boolean
	currentPlan: string | null
	subscribe: (plan: string) => void
	unsubscribe: () => void
}
