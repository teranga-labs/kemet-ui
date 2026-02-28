import { createContext } from 'react'

import type { Profile } from './ProfileContext.ts'

export interface User {
	id: string
	name: string
	email: string
	subscriptionPlan: 'daily' | 'weekly' | 'monthly' | null
	profiles: Profile[]
	role: 'admin' | 'creator' | 'viewer'
}

export interface AuthContextType {
	isAuthenticated: boolean
	user: User | null
	login: (userData: User) => void
	logout: () => void
	updateUser: (updatedUserData: User) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
