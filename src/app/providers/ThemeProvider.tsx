import { type ReactNode, useEffect, useState } from 'react'

import { ThemeContext } from '../contexts/ThemeContext.ts'

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<'light' | 'dark'>(() => {
		const savedTheme = localStorage.getItem('theme')
		const userPrefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches
		return (
			(savedTheme as 'light' | 'dark') || (userPrefersDark ? 'dark' : 'light')
		)
	})

	useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove(theme === 'light' ? 'dark' : 'light')
		root.classList.add(theme)
		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
	}

	const value = { theme, toggleTheme }

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
