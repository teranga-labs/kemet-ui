import { PlusCircle, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import type { MediaItem } from '../../../../data/shows.ts'
import AdminMediaCard from '../components/AdminMediaCard.tsx'

interface ContentManagementProps {
	items: MediaItem[]
	onTabChange?: (tabId: string) => void
	onEditItem: (id: number) => void
	onViewDetails: (id: number) => void
}

const ContentManagement = ({
	items,
	onTabChange,
	onEditItem,
	onViewDetails
}: ContentManagementProps) => {
	const [searchTerm, setSearchTerm] = useState('')

	const { movies, shows, documentaries, originals } = useMemo(() => {
		const lowercasedTerm = searchTerm.toLowerCase()

		const filterBySearch = (item: MediaItem) => {
			if (!lowercasedTerm) return true
			return (
				item.title.toLowerCase().includes(lowercasedTerm) ||
				item.description.toLowerCase().includes(lowercasedTerm) ||
				item.cast.some((actor) =>
					actor.toLowerCase().includes(lowercasedTerm)
				) ||
				item.genres?.some((genre) =>
					genre.toLowerCase().includes(lowercasedTerm)
				)
			)
		}

		const filtered = items.filter(filterBySearch)

		return {
			movies: filtered.filter((item) => item.type === 'movie'),
			shows: filtered.filter((item) => item.type === 'show'),
			documentaries: filtered.filter((item) =>
				item.genres?.includes('Documentary')
			),
			originals: filtered.filter((item) => item.type === 'original')
		}
	}, [searchTerm, items])

	const handleFeature = (id: number) => {
		const item = items.find((i) => i.id === id)
		alert(`Featuring: ${item?.title}`)
	}

	const handleEdit = (id: number) => {
		onEditItem(id)
	}

	const handleUnpublish = (id: number) => {
		const item = items.find((i) => i.id === id)
		alert(`Unpublishing: ${item?.title}`)
	}

	const handleAddContent = () => {
		if (onTabChange) {
			onTabChange('upload')
		}
	}

	const renderSection = (title: string, sectionItems: MediaItem[]) => {
		if (sectionItems.length === 0) {
			return null
		}
		return (
			<section className='mb-10'>
				<h3 className='mb-4 text-xl font-semibold text-gray-900 dark:text-white'>
					{title}{' '}
					<span className='text-base font-normal text-gray-400 dark:text-gray-500'>
						({sectionItems.length})
					</span>
				</h3>
				<div className='grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7'>
					{sectionItems.map((item) => (
						<AdminMediaCard
							key={item.id}
							id={item.id}
							title={item.title}
							posterUrl={item.posterUrl}
							year={item.year}
							rating={item.rating}
							onFeature={handleFeature}
							onEdit={handleEdit}
							onUnpublish={handleUnpublish}
							onViewDetails={onViewDetails}
						/>
					))}
				</div>
			</section>
		)
	}

	const totalFilteredCount =
		movies.length + shows.length + documentaries.length + originals.length

	return (
		<div>
			<div className='mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row'>
				<h2 className='w-full text-2xl font-semibold text-gray-900 sm:w-auto dark:text-white'>
					Content Library <span className='text-purple-700'>.</span>
				</h2>
				<div className='flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row'>
					<div className='relative w-full sm:w-auto'>
						<Search
							size={20}
							className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400'
						/>
						<input
							type='text'
							placeholder='Search content...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='w-full rounded-lg border border-gray-300 bg-white p-3 pl-10 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:w-64 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
						/>
					</div>
					<button
						onClick={handleAddContent}
						className='flex w-full items-center justify-center space-x-2 rounded-lg bg-purple-600 px-4 py-3 text-white transition-colors hover:bg-purple-700 sm:w-auto'
					>
						<PlusCircle size={20} />
						<span className='hidden sm:inline'>Add New Content</span>
					</button>
				</div>
			</div>

			<div>
				{renderSection('Kemet Originals', originals)}
				{renderSection('Movies', movies)}
				{renderSection('TV Shows', shows)}
				{renderSection('Documentaries', documentaries)}

				{searchTerm && totalFilteredCount === 0 && (
					<div className='py-16 text-center'>
						<p className='text-lg text-gray-600 dark:text-gray-400'>
							No content found for "{searchTerm}"
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default ContentManagement
