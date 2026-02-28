import { createContext } from 'react'

export interface Profile {
	id: string
	name: string
	avatar: string
	isKid?: boolean
}

export interface ProfileContextType {
	activeProfile: Profile | null
	setActiveProfile: (profile: Profile) => void
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
	undefined
)
