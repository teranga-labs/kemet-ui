import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import { AuthContext, type User } from '../contexts/AuthContext.ts'

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		const storedUser = localStorage.getItem('user')
		if (storedUser) {
			const parsedUser: User = JSON.parse(storedUser)
			setUser(parsedUser)
			setIsAuthenticated(true)

			if (parsedUser.subscriptionPlan) {
				localStorage.setItem('subscription', parsedUser.subscriptionPlan)
			} else {
				localStorage.removeItem('subscription')
			}
		}
	}, [])

	const login = (userData: User) => {
		setUser(userData)
		setIsAuthenticated(true)
		localStorage.setItem('user', JSON.stringify(userData))

		if (userData.subscriptionPlan) {
			localStorage.setItem('subscription', userData.subscriptionPlan)
		} else {
			localStorage.removeItem('subscription')
		}
	}

	const logout = () => {
		setUser(null)
		setIsAuthenticated(false)
		localStorage.removeItem('user')
		localStorage.removeItem('subscription')
		localStorage.removeItem('activeProfile')
	}

	const updateUser = (updatedUserData: User) => {
		setUser(updatedUserData)
		localStorage.setItem('user', JSON.stringify(updatedUserData))

		if (updatedUserData.subscriptionPlan) {
			localStorage.setItem('subscription', updatedUserData.subscriptionPlan)
		} else {
			localStorage.removeItem('subscription')
		}
	}

	const value = { isAuthenticated, user, login, logout, updateUser }

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
