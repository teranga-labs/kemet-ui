import { type ReactNode, useEffect, useState } from 'react'

import { type Profile, ProfileContext } from '../contexts/ProfileContext.ts'

export function ProfileProvider({ children }: { children: ReactNode }) {
	const [activeProfile, setActiveProfile] = useState<Profile | null>(null)

	useEffect(() => {
		const storedProfile = localStorage.getItem('activeProfile')
		if (storedProfile) {
			setActiveProfile(JSON.parse(storedProfile))
		}
	}, [])

	const handleSetActiveProfile = (profile: Profile) => {
		setActiveProfile(profile)
		localStorage.setItem('activeProfile', JSON.stringify(profile))
	}

	const value = {
		activeProfile,
		setActiveProfile: handleSetActiveProfile
	}

	return (
		<ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
	)
}
