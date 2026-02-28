import { BarChart3, DollarSign, UploadCloud, Video } from 'lucide-react'

interface DashboardTabsProps {
	activeTab: string
	onTabChange: (tabId: string) => void
}

const CreatorDashboardTabs = ({
	activeTab,
	onTabChange
}: DashboardTabsProps) => {
	const tabs = [
		{ id: 'content', label: 'My Content', icon: Video },
		{ id: 'revenue', label: 'Revenue', icon: DollarSign },
		{ id: 'analytics', label: 'Analytics', icon: BarChart3 },
		{ id: 'upload', label: 'Upload', icon: UploadCloud }
	]

	return (
		<div className='mb-8 border-b border-gray-200'>
			<nav className='-mb-px flex space-x-8'>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => onTabChange(tab.id)}
						className={`flex items-center space-x-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
							activeTab === tab.id
								? 'border-purple-700 text-purple-700'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
						}`}
					>
						<tab.icon className='h-5 w-5' />
						<span>{tab.label}</span>
					</button>
				))}
			</nav>
		</div>
	)
}

export default CreatorDashboardTabs
