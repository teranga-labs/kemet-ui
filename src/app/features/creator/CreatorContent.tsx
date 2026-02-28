import type { MediaItem } from '../../../data/shows.ts'
import CreatorMediaCard from './CreatorMediaCard.tsx'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

interface CreatorContentTabProps {
	myContent: MediaItem[]
}

const CreatorContent = ({ myContent }: CreatorContentTabProps) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [activeFilter, setActiveFilter] = useState('all')

	const filters = [
		{ label: 'All', value: 'all' },
		{ label: 'Kemet Originals', value: 'original' },
		{ label: 'Movies', value: 'movie' },
		{ label: 'TV Shows', value: 'show' },
		{ label: 'Documentaries', value: 'documentary' }
	]

	const filteredContent = useMemo(() => {
		return myContent
			.filter((item) => {
				// Filter by the active category tab
				if (activeFilter === 'all') return true
				if (activeFilter === 'movie') return item.type === 'movie'
				if (activeFilter === 'show') return item.type === 'show'
				if (activeFilter === 'original') return item.type === 'original'
				if (activeFilter === 'documentary')
					return item.genres?.includes('Documentary')
				return true
			})
			.filter((item) => {
				// Filter by the search term
				const lowercasedTerm = searchTerm.toLowerCase()
				if (!lowercasedTerm) return true
				return (
					item.title.toLowerCase().includes(lowercasedTerm) ||
					item.description.toLowerCase().includes(lowercasedTerm)
				)
			})
	}, [myContent, searchTerm, activeFilter])

	const handleEdit = (id: number) => {
		const item = myContent.find((i) => i.id === id)
		alert(`Editing: ${item?.title}`)
	}

	const handleAnalytics = (id: number) => {
		const item = myContent.find((i) => i.id === id)
		alert(`Showing analytics for: ${item?.title}`)
	}

	const handleDelete = (id: number) => {
		const item = myContent.find((i) => i.id === id)
		if (
			window.confirm(
				`Are you sure you want to delete "${item?.title}"? This action cannot be undone.`
			)
		) {
			alert(`Deleting: ${item?.title}`)
		}
	}

	return (
		<div>
			<h2 className='mb-2 text-2xl font-semibold text-gray-900 dark:text-white'>
				My Content <span className='text-purple-700'>.</span>
			</h2>
			<p className='mb-6 text-gray-500 dark:text-gray-400'>
				Manage, edit, and view analytics for all your uploaded content.
			</p>

			<div className='mb-6 flex flex-col items-center justify-between gap-4 md:flex-row'>
				{/* Filter Tabs */}
				<div className='flex w-full items-center gap-2 overflow-x-auto rounded-lg bg-gray-100 p-1 md:w-auto dark:bg-zinc-800'>
					{filters.map((filter) => (
						<button
							key={filter.value}
							onClick={() => setActiveFilter(filter.value)}
							className={`rounded-md px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
								activeFilter === filter.value
									? 'bg-purple-600 text-white shadow'
									: 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-zinc-700'
							}`}
						>
							{filter.label}
						</button>
					))}
				</div>

				{/* Search Input */}
				<div className='relative w-full md:w-auto'>
					<Search
						size={20}
						className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400'
					/>
					<input
						type='text'
						placeholder='Search your content...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='w-full rounded-lg border border-gray-300 bg-white p-3 pl-10 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 md:w-64 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
					/>
				</div>
			</div>

			<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
				{filteredContent.map((item) => (
					<CreatorMediaCard
						key={item.id}
						id={item.id}
						title={item.title}
						posterUrl={item.posterUrl}
						year={item.year}
						totalViews={item.totalViews}
						onEdit={handleEdit}
						onAnalytics={handleAnalytics}
						onDelete={handleDelete}
					/>
				))}
			</div>

			{/* ADDED: Message to display when no content matches filter */}
			{filteredContent.length === 0 && (
				<div className='py-16 text-center'>
					<p className='text-lg text-gray-600 dark:text-gray-400'>
						No content found matching your criteria.
					</p>
				</div>
			)}
		</div>
	)
}

export default CreatorContent
