import { BookOpen, Compass, Home, Zap } from 'lucide-react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { ThemeContext } from '../../contexts/ThemeContext.ts'

const sidebarItems = [
	{
		name: 'Home',
		path: '/',
		icon: Home
	},
	{
		name: 'Discover',
		path: '/discover',
		icon: Compass
	},
	{
		name: 'Library',
		path: '/library',
		icon: BookOpen
	},
	{
		name: 'Green',
		path: '/green-light',
		icon: Zap
	}
]

function Sidebar() {
	const themeContext = useContext(ThemeContext)
	if (!themeContext) throw new Error('Sidebar must be used within a ThemeProvider')
	const { theme } = themeContext

	const isDark = theme === 'dark'

	return (
		<>
			{/* Desktop Sidebar */}
			<aside className='hidden h-full w-[78px] shrink-0 flex-col items-center justify-center sm:flex'>
				<div className='flex flex-col items-center gap-2'>
					{sidebarItems.map((item) => (
						<NavLink key={item.name} to={item.path} end={item.path === '/'}>
							{({ isActive }) => (
								<div
									className={`group relative flex flex-col items-center justify-center rounded-2xl px-4 py-3 transition-all duration-200 ${
										isActive
											? isDark
												? 'bg-white/10'
												: 'bg-purple-50'
											: isDark
												? 'hover:bg-white/5'
												: 'hover:bg-gray-100'
									}`}
								>
									<item.icon
										size={20}
										fill={isActive ? 'currentColor' : 'none'}
										className={`transition-colors duration-200 ${
											isActive
												? 'text-purple-500'
												: isDark
													? 'text-gray-400 group-hover:text-gray-200'
													: 'text-gray-500 group-hover:text-gray-700'
										}`}
									/>
									<span
										className={`mt-1.5 text-[10px] font-bold transition-colors duration-200 ${
											isActive
												? 'text-purple-500'
												: isDark
													? 'text-gray-500 group-hover:text-gray-300'
													: 'text-gray-400 group-hover:text-gray-600'
										}`}
									>
										{item.name}
									</span>
								</div>
							)}
						</NavLink>
					))}
				</div>
			</aside>

			{/* Mobile Bottom Nav */}
			<nav
				className={`fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t px-4 py-3 backdrop-blur-xl sm:hidden ${
					isDark ? 'border-white/10 bg-zinc-950/90' : 'border-gray-200 bg-white/90'
				}`}
			>
				{sidebarItems.map((item) => (
					<NavLink key={item.name} to={item.path} end={item.path === '/'}>
						{({ isActive }) => (
							<div
								className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
									isActive ? 'text-purple-500' : isDark ? 'text-gray-500' : 'text-gray-400'
								}`}
							>
								<item.icon size={20} fill={isActive ? 'currentColor' : 'none'} />
								<span className='text-[10px] font-bold'>{item.name}</span>
							</div>
						)}
					</NavLink>
				))}
			</nav>
		</>
	)
}

export default Sidebar
