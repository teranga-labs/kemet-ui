import { BookOpen, Compass, Home, Zap } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function MainNavigation() {
	const navItems = [
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

	return (
		<>
			{/* Desktop Navigation */}
			<nav className='fixed top-1/2 left-6 z-50 hidden -translate-y-1/2 flex-col items-center sm:flex'>
				<div className='flex flex-col gap-4 rounded-full border border-white/10 bg-black/20 p-4 backdrop-blur-md'>
					{navItems.map((item) => (
						<NavLink key={item.name} to={item.path}>
							{({ isActive }) => (
								<div className='group relative flex items-center justify-center rounded-full p-3 transition-all duration-300 hover:scale-105 hover:bg-white/10'>
									<item.icon
										size={26}
										fill={
											isActive || item.alwaysFilled ? 'currentColor' : 'none'
										}
										className={`transition-colors duration-300 ${
											isActive
												? item.activeColor
												: `text-white ${item.hoverColor}`
										}`}
									/>

									<span className='pointer-events-none absolute left-14 rounded-md bg-black/90 px-3 py-1 text-sm font-bold text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100'>
										{item.name}
									</span>
								</div>
							)}
						</NavLink>
					))}
				</div>
			</nav>

			<nav className='fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-8 rounded-full border border-white/10 bg-black/80 p-5 px-8 shadow-2xl backdrop-blur-lg sm:hidden'>
				{navItems.map((item) => (
					<NavLink key={item.name} to={item.path}>
						{({ isActive }) => (
							<div
								className={`transition-colors duration-300 ${
									isActive ? 'text-white' : 'text-gray-400'
								}`}
							>
								<item.icon
									size={24}
									fill={isActive || item.alwaysFilled ? 'currentColor' : 'none'}
								/>
							</div>
						)}
					</NavLink>
				))}
			</nav>
		</>
	)
}

export default MainNavigation
