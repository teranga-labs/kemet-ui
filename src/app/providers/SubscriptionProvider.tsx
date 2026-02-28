import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import { SubscriptionContext } from '../contexts/SubscriptionContext.ts'

export function SubscriptionProvider({ children }: { children: ReactNode }) {
	const [isSubscribed, setIsSubscribed] = useState(true)
	const [currentPlan, setCurrentPlan] = useState<string | null>(null)

	useEffect(() => {
		const subscription = localStorage.getItem('subscription')
		if (subscription) {
			setCurrentPlan(subscription)
			setIsSubscribed(true)
		}
	}, [])

	const subscribe = (plan: string) => {
		setCurrentPlan(plan)
		setIsSubscribed(true)
		localStorage.setItem('subscription', plan)
	}

	const unsubscribe = () => {
		setCurrentPlan(null)
		setIsSubscribed(false)
		localStorage.removeItem('subscription')
	}

	const value = { isSubscribed, currentPlan, subscribe, unsubscribe }

	return (
		<SubscriptionContext.Provider value={value}>
			{children}
		</SubscriptionContext.Provider>
	)
}
