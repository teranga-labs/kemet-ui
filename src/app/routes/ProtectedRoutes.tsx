import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import type { User } from '../contexts/AuthContext.ts'
import { useAuth } from '../hooks/useAuth.ts'
import { useSubscription } from '../hooks/useSubscription.ts'

export function ProtectedRoute({ children }: { children: ReactNode }) {
	const { isAuthenticated } = useAuth()
	return isAuthenticated ? <>{children}</> : <Navigate to='/signin' replace />
}

export function SubscriptionRoute({ children }: { children: ReactNode }) {
	const { isAuthenticated } = useAuth()
	const { isSubscribed } = useSubscription()

	if (!isAuthenticated) {
		return <Navigate to='/signin' replace />
	}

	if (!isSubscribed) {
		return <Navigate to='/payment-flow' replace />
	}

	return <>{children}</>
}

interface RoleRouteProps {
	children: ReactNode
	allowedRoles: User['role'][]
}

export function RoleRoute({ children, allowedRoles }: RoleRouteProps) {
	const { isAuthenticated, user } = useAuth()

	if (!isAuthenticated) {
		return <Navigate to='/signin' replace />
	}

	if (!user || !allowedRoles.includes(user.role)) {
		return <Navigate to='/' replace />
	}
	return <>{children}</>
}
