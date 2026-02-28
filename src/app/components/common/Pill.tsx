import { BookOpen, Compass, Home, PanelLeftClose, PanelLeftOpen, Zap } from 'lucide-react'
import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { ThemeContext } from '../../contexts/ThemeContext.ts'

function Pill() {
	const [isVisible, setIsVisible] = useState(true)

	const themeContext = useContext(ThemeContext)
	if (!themeContext) throw new Error('Pill must be used within a ThemeProvider')
	const { theme } = themeContext

	const isDark = theme === 'dark'

	const pillItems = [
		{
			name: 'Home',
			path: '/',
			icon: Home,
			activeColor: 'text-purple-500',
			hoverColor: 'group-hover:text-purple-500',
			alwaysFilled: false
		},
		{
			name: 'Discover',
			path: '/discover',
			icon: Compass,
			activeColor: 'text-purple-500',
			hoverColor: 'group-hover:text-purple-500',
			alwaysFilled: false
		},
		{
			name: 'Library',
			path: '/library',
			icon: BookOpen,
			activeColor: 'text-purple-500',
			hoverColor: 'group-hover:text-purple-500',
			alwaysFilled: false
		},
		{
			name: 'Green Light',
			path: '/green-light',
			icon: Zap,
			activeColor: 'text-purple-500',
			hoverColor: 'group-hover:text-purple-500',
			alwaysFilled: false
		}
	]

	const navBg = isDark
		? 'bg-black/30 backdrop-blur-md'
		: 'bg-white/70 backdrop-blur-md shadow-lg border border-gray-200/60'

	const iconDefault = isDark ? 'text-white' : 'text-gray-600'
	const hoverBg = isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'

	const tooltipBg = isDark ? 'bg-black/90 text-white' : 'bg-white/95 text-gray-800 border border-gray-200 shadow-md'

	const toggleBtnStyle = isDark
		? 'bg-black/30 border-white/10 text-white hover:bg-white/10 backdrop-blur-md'
		: 'bg-white/80 border-gray-200 text-gray-600 hover:bg-gray-100 shadow-md backdrop-blur-md'

	const mobileBg = isDark ? 'bg-black/80 border-white/10' : 'bg-white/90 border-gray-200 shadow-xl'

	const mobileIcon = isDark ? 'text-gray-400' : 'text-gray-400'
	const mobileIconActive = isDark ? 'text-white' : 'text-purple-600'

	return (
		<>
			<button
				onClick={() => setIsVisible((v) => !v)}
				className={`fixed top-1/2 left-6 z-50 hidden -translate-y-1/2 items-center justify-center rounded-full border p-2 transition-all duration-300 sm:flex ${toggleBtnStyle} ${
					isVisible ? 'translate-x-[4.5rem]' : 'translate-x-0'
				}`}
				aria-label={isVisible ? 'Hide navigation' : 'Show navigation'}
			>
				{isVisible ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
			</button>

			<nav
				className={`fixed top-1/2 left-6 z-40 hidden -translate-y-1/2 flex-col items-center transition-all duration-300 ease-in-out sm:flex ${
					isVisible ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-14 opacity-0'
				}`}
			>
				<div className={`flex flex-col gap-4 rounded-2xl p-4 ${navBg}`}>
					{pillItems.map((item) => (
						<NavLink key={item.name} to={item.path}>
							{({ isActive }) => (
								<div
									className={`group relative flex items-center justify-center rounded-full p-3 transition-all duration-300 hover:scale-105 ${hoverBg}`}
								>
									<item.icon
										size={26}
										fill={isActive || item.alwaysFilled ? 'currentColor' : 'none'}
										className={`transition-colors duration-300 ${
											isActive ? item.activeColor : `${iconDefault} ${item.hoverColor}`
										}`}
									/>
									<span
										className={`pointer-events-none absolute left-14 rounded-md px-3 py-1 text-sm font-bold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${tooltipBg}`}
									>
										{item.name}
									</span>
								</div>
							)}
						</NavLink>
					))}
				</div>
			</nav>

			<nav
				className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-8 rounded-full border p-5 px-8 transition-all duration-300 sm:hidden ${mobileBg}`}
			>
				{pillItems.map((item) => (
					<NavLink key={item.name} to={item.path}>
						{({ isActive }) => (
							<div className={`transition-colors duration-300 ${isActive ? mobileIconActive : mobileIcon}`}>
								<item.icon size={24} fill={isActive || item.alwaysFilled ? 'currentColor' : 'none'} />
							</div>
						)}
					</NavLink>
				))}
			</nav>
		</>
	)
}

export default Pill
