import { ChevronDown, LogOut, Menu, Moon, Sun, User } from 'lucide-react'
import { useContext, useState } from 'react'

import { ThemeContext } from '../../contexts/ThemeContext.ts'
import { useAuth } from '../../hooks/useAuth.ts'

const pageTitles: { [key: string]: string } = {
	content: 'My Content',
	revenue: 'Revenue & Earnings',
	analytics: 'Creator Analytics',
	upload: 'Upload New Content'
}

interface CreatorHeaderProps {
	activeTab: string
	onToggleSidebar: () => void
}

function CreatorHeader({ activeTab, onToggleSidebar }: CreatorHeaderProps) {
	const [showDropdown, setShowDropdown] = useState(false)
	const { user, logout } = useAuth()

	const themeContext = useContext(ThemeContext)
	if (!themeContext)
		throw new Error('CreatorHeader must be used within a ThemeProvider')
	const { theme, toggleTheme } = themeContext

	const pageTitle = pageTitles[activeTab] || 'Creator Dashboard'

	return (
		<header className='mb-6 flex items-center justify-between rounded-xl bg-white p-4 shadow-lg dark:bg-zinc-800'>
			<div className='flex items-center'>
				<button
					onClick={onToggleSidebar}
					className='mr-4 rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-700'
					aria-label='Toggle sidebar'
				>
					<Menu size={24} />
				</button>
				<h1 className='text-xl font-semibold text-gray-800 dark:text-white'>
					{pageTitle}
				</h1>
			</div>

			<div className='flex items-center gap-4'>
				<button
					onClick={toggleTheme}
					className='rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-700'
					aria-label='Toggle theme'
				>
					{theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
				</button>

				<div className='relative'>
					<button
						onClick={() => setShowDropdown(!showDropdown)}
						className='flex items-center space-x-2 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700'
					>
						<div className='flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-700 dark:bg-purple-900/50 dark:text-purple-400'>
							{user?.name ? (
								user.name.charAt(0).toUpperCase()
							) : (
								<User size={20} />
							)}
						</div>
						<span className='hidden text-sm font-medium text-gray-700 md:block dark:text-gray-200'>
							{user?.name}
						</span>
						<ChevronDown
							size={16}
							className={`text-gray-600 transition-transform dark:text-gray-400 ${showDropdown ? 'rotate-180' : ''}`}
						/>
					</button>

					{showDropdown && (
						<div className='absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-100 bg-white py-1 shadow-xl dark:border-zinc-700 dark:bg-zinc-900'>
							<div className='border-b border-gray-100 px-4 py-2 dark:border-zinc-700'>
								<p className='text-sm font-semibold text-gray-800 dark:text-white'>
									{user?.name}
								</p>
								<p className='truncate text-xs text-gray-500 dark:text-gray-400'>
									{user?.email}
								</p>
							</div>
							<button
								onClick={logout}
								className='flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-zinc-800'
							>
								<LogOut size={16} className='mr-2' />
								Logout
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}

export default CreatorHeader
