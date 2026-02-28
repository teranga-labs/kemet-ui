import { useState } from 'react'

import { allItems, type MediaItem } from '../../../../data/shows.ts'
import AdminFooter from '../components/AdminFooter.tsx'
import AdminHeader from '../components/AdminHeader.tsx'
import AdminSidebar from '../components/AdminSidebar.tsx'

import AdminAnalytics from './AdminAnalytics.tsx'
import AdminContentDetails from './AdminContentDetails.tsx'
import AdminContentUpload from './AdminContentUpload.tsx'
import APIManagementPage from './APIManagementPage.tsx'
import ContentEditorForm from './ContentEditorForm.tsx'
import ContentManagement from './ContentManagement.tsx'
import DeploymentPage from './DeploymentPage.tsx'
import FinancialDashboard from './FinancialDashboard.tsx'
import MonitoringPage from './MonitoringPage.tsx'
import SecurityPage from './SecurityPage.tsx'
import SiteSettings from './SiteSettings.tsx'
import UserManagementTable from './UserManagementTable.tsx'

function AdminDashboard() {
	const [activeTab, setActiveTab] = useState('analytics')
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

	const [contentLibrary, setContentLibrary] = useState<MediaItem[]>(allItems)
	const [editingContentId, setEditingContentId] = useState<number | null>(null)

	const [viewingContentId, setViewingContentId] = useState<number | null>(null)

	const handleSaveSettings = (settings: any) => {
		console.log('Saving settings:', settings)
		alert('Settings saved successfully!')
	}

	const handleContentSubmit = (formData: Omit<MediaItem, 'id'>) => {
		const newContentItem: MediaItem = {
			...formData,
			id: Date.now()
		}

		setContentLibrary((prevLibrary) => [newContentItem, ...prevLibrary])

		setActiveTab('content')

		console.log('Content submitted and added to library:', newContentItem)
		alert(`"${formData.title}" was successfully added to the Content Library!`)
	}

	const handleUpdateContentSubmit = (formData: Omit<MediaItem, 'id'>) => {
		if (editingContentId === null) return

		const updatedItem: MediaItem = { ...formData, id: editingContentId }

		setContentLibrary((prev) =>
			prev.map((item) => (item.id === editingContentId ? updatedItem : item))
		)

		setActiveTab('content')
		setEditingContentId(null)
		alert(`Content "${formData.title}" updated successfully!`)
	}

	const toggleSidebar = () => {
		setIsSidebarCollapsed(!isSidebarCollapsed)
	}

	const handleEditRequest = (id: number) => {
		setEditingContentId(id)
		setActiveTab('edit')
	}

	const handleCancelEdit = () => {
		setEditingContentId(null)
		setActiveTab('content')
	}

	const handleViewDetails = (id: number) => {
		setViewingContentId(id)
		setActiveTab('details')
	}

	const renderActiveTab = () => {
		switch (activeTab) {
			case 'analytics':
				return <AdminAnalytics />
			case 'users':
				return <UserManagementTable />
			case 'finances':
				return <FinancialDashboard />
			case 'content':
				return (
					<ContentManagement
						items={contentLibrary}
						onTabChange={setActiveTab}
						onEditItem={handleEditRequest}
						onViewDetails={handleViewDetails}
					/>
				)
			case 'monitoring':
				return <MonitoringPage />
			case 'security':
				return <SecurityPage />
			case 'deployments':
				return <DeploymentPage />
			case 'apis':
				return <APIManagementPage />
			case 'settings':
				return <SiteSettings onSaveSettings={handleSaveSettings} />
			case 'upload':
				return <AdminContentUpload onSubmit={handleContentSubmit} />
			case 'details': {
				const itemToView = contentLibrary.find(
					(item) => item.id === viewingContentId
				)
				if (!itemToView) {
					setActiveTab('content')
					return null
				}
				return (
					<AdminContentDetails
						item={itemToView}
						onEditRequest={handleEditRequest}
						onBack={() => setActiveTab('content')}
					/>
				)
			}
			case 'edit': {
				const itemToEdit = contentLibrary.find(
					(item) => item.id === editingContentId
				)
				return (
					<ContentEditorForm
						initialData={itemToEdit}
						onSubmit={handleUpdateContentSubmit}
						onCancel={handleCancelEdit}
					/>
				)
			}
			default:
				return <AdminAnalytics />
		}
	}

	return (
		<div className='flex h-screen bg-white dark:bg-zinc-950'>
			<AdminSidebar
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
					<AdminHeader activeTab={activeTab} onToggleSidebar={toggleSidebar} />
				</div>

				<main className='flex-1 overflow-y-auto px-6 pb-6'>
					<div className='w-full rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-zinc-700 dark:bg-zinc-800'>
						{renderActiveTab()}
					</div>
				</main>
				<div className='mt-auto px-6 pb-6'>
					<AdminFooter />
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard
