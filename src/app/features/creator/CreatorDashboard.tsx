import { useState } from 'react'

import { useAuth } from '../../hooks/useAuth.ts'
import { allItems } from '../../../data/shows.ts'

import CreatorAnalytics from './CreatorAnalytics.tsx'
import CreatorContent from './CreatorContent.tsx'
import CreatorContentUpload from './CreatorContentUpload.tsx'
import CreatorFooter from './CreatorFooter.tsx'
import CreatorHeader from './CreatorHeader.tsx'
import CreatorRevenue from './CreatorRevenue.tsx'
import CreatorSidebar from './CreatorSidebar.tsx'


function CreatorDashboard() {
	const [activeTab, setActiveTab] = useState('content')
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
	const { user } = useAuth()

	const myContent = allItems.filter((item) => item.creatorId === user?.id)

	const handleContentSubmit = (formData: any) => {
		console.log('Content submitted:', formData)
		alert('Content submitted successfully!')
	}

	const toggleSidebar = () => {
		setIsSidebarCollapsed(!isSidebarCollapsed)
	}

	const renderActiveTab = () => {
		switch (activeTab) {
			case 'content':
				return <CreatorContent myContent={myContent} />
			case 'revenue':
				return <CreatorRevenue myContent={myContent} />
			case 'analytics':
				return <CreatorAnalytics />
			case 'upload':
				return <CreatorContentUpload onSubmit={handleContentSubmit} />
			default:
				return <CreatorContent myContent={myContent} />
		}
	}

	return (
		<div className='flex h-screen bg-gray-100 dark:bg-zinc-900'>
			<CreatorSidebar
				activeTab={activeTab}
				onTabChange={setActiveTab}
				isCollapsed={isSidebarCollapsed}
			/>

			<div
				className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${
					isSidebarCollapsed ? 'ml-28' : 'ml-72'
				}`}
			>
				<div className='p-6'>
					<CreatorHeader
						activeTab={activeTab}
						onToggleSidebar={toggleSidebar}
					/>
				</div>

				<main className='flex-1 overflow-y-auto px-6 pb-6'>
					<div className='w-full rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-800'>
						{renderActiveTab()}
					</div>
				</main>

				<div className='mt-auto px-6 pb-6'>
					<CreatorFooter />
				</div>
			</div>
		</div>
	)
}

export default CreatorDashboard
