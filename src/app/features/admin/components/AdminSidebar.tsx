import logoBlack from '/images/misc/KEMET Black Bigger.png'
import logoWhite from '/images/misc/KEMET White Bigger.png'
import {
	ArrowLeftToLine,
	Banknote,
	Construction,
	FileText,
	HeartPulse,
	LayoutDashboard,
	Rocket,
	Settings,
	Shield,
	Upload,
	Users
} from 'lucide-react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { ThemeContext } from '../../../contexts/ThemeContext.ts'

interface AdminSidebarProps {
	activeTab: string
	onTabChange: (tab: string) => void
	isCollapsed: boolean
}

const navItems = [
	{ key: 'analytics', label: 'Analytics', icon: LayoutDashboard },

	{ key: 'users', label: 'User Management', icon: Users },
	{ key: 'finances', label: 'Financials', icon: Banknote },
	{ key: 'content', label: 'Content Management', icon: FileText },
	{ key: 'upload', label: 'Upload Content', icon: Upload },
    { key: 'monitoring', label: 'Monitoring', icon: HeartPulse },
    { key: 'security', label: 'Security', icon: Shield },
    { key: 'deployments', label: 'Deployments', icon: Rocket },
    { key: 'apis', label: 'APIs', icon: Construction },
	{ key: 'settings', label: 'Site Settings', icon: Settings }
]

function AdminSidebar({
	activeTab,
	onTabChange,
	isCollapsed
}: AdminSidebarProps) {
	const themeContext = useContext(ThemeContext)
	if (!themeContext)
		throw new Error('Header must be used within a ThemeProvider')
	const { theme } = themeContext

	const currentLogo = theme === 'dark' ? logoWhite : logoBlack

	return (
		<aside
			className={`fixed top-4 left-4 mt-2 flex h-[calc(100vh-3rem)] flex-col rounded-2xl border border-gray-200 bg-white shadow-xl transition-all duration-300 ease-in-out dark:border-zinc-700 dark:bg-zinc-800 ${
				isCollapsed ? 'w-20' : 'w-64'
			}`}
		>
			<div
				className={`mb-2 flex items-center border-b border-gray-100 p-4 dark:border-zinc-700 ${
					isCollapsed ? 'justify-center' : 'justify-start'
				}`}
			>
				<img src={currentLogo} alt='logo' width='40' height='40' />
				{!isCollapsed && (
					<div className='ml-3 flex items-baseline'>
						<span className='text-xl font-bold text-gray-900 dark:text-white'>
							Admin
						</span>
						<span className='ml-2'>
							<Shield
								size={16}
								className='text-purple-600 dark:text-purple-400'
							/>
						</span>
					</div>
				)}
			</div>

			<nav className='flex-1 p-2'>
				<ul>
					{navItems.map((item) => (
						<li key={item.key} className='mb-2'>
							<button
								onClick={() => onTabChange(item.key)}
								className={`flex w-full items-center rounded-lg p-3 text-sm font-medium transition-colors ${
									isCollapsed ? 'justify-center' : ''
								} ${
									activeTab === item.key
										? 'bg-purple-600 text-white shadow'
										: 'text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-700'
								}`}
								title={item.label}
							>
								<item.icon
									size={20}
									className={!isCollapsed ? 'mr-3' : ''}
								/>
								{!isCollapsed && <span>{item.label}</span>}
							</button>
						</li>
					))}
				</ul>
			</nav>

			<div
				className={`mt-auto border-t border-gray-100 p-4 dark:border-zinc-700 ${
					isCollapsed ? 'flex justify-center' : ''
				}`}
			>
				<Link
					to='/'
					className='flex items-center text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400'
					title='Back to Main Site'
				>
					<ArrowLeftToLine
						size={20}
						className={!isCollapsed ? 'mr-2' : ''}
					/>
					{!isCollapsed && (
						<span className='text-sm'>Back to Main Site</span>
					)}
				</Link>
			</div>
		</aside>
	)
}

export default AdminSidebar
