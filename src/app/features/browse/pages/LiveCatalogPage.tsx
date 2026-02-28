import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import MediaCard from '../../../components/common/MediaCard.tsx'
import SearchField from '../../../components/common/SearchField.tsx'
import Footer from '../../../components/layout/Footer.tsx'
import Header from '../../../components/layout/Header.tsx'
import { allItems } from '../../../../data/shows.ts'

const genreOptions = [
	{ value: 'All', labelKey: 'categories.all' },
	{ value: 'Action', labelKey: 'categories.action' },
	{ value: 'Adventure', labelKey: 'categories.adventure' },
	{ value: 'Animation', labelKey: 'categories.animation' },
	{ value: 'Comedy', labelKey: 'categories.comedy' },
	{ value: 'Crime', labelKey: 'categories.crime' },
	{ value: 'Documentary', labelKey: 'categories.documentary' },
	{ value: 'Drama', labelKey: 'categories.drama' },
	{ value: 'Family', labelKey: 'categories.family' },
	{ value: 'Fantasy', labelKey: 'categories.fantasy' },
	{ value: 'Historical', labelKey: 'categories.historical' },
	{ value: 'Horror', labelKey: 'categories.horror' },
	{ value: 'Music', labelKey: 'categories.music' },
	{ value: 'Mystery', labelKey: 'categories.mystery' },
	{ value: 'Romance', labelKey: 'categories.romance' },
	{ value: 'Sci-Fi', labelKey: 'categories.sciFi' },
	{ value: 'Sports', labelKey: 'categories.sports' },
	{ value: 'Thriller', labelKey: 'categories.thriller' },
	{ value: 'War', labelKey: 'categories.war' },
	{ value: 'Tech', labelKey: 'categories.tech' }
]

function LiveCatalogPage() {
	const { t } = useTranslation()
	const [activeTab, setActiveTab] = useState<'movies' | 'shows'>('movies')
	const [query, setQuery] = useState('')
	const [selectedGenre, setSelectedGenre] = useState('All')

	const handleSearch = (newQuery: string) => {
		setQuery(newQuery)
	}

	const handleGenreFilter = (genre: string) => {
		setSelectedGenre(genre)
	}

	const filteredItems = useMemo(() => {
		let items = allItems.filter((item) => {
			if (activeTab === 'movies') return item.type !== 'show'
			if (activeTab === 'shows') return item.type === 'show'
			return false
		})
		if (selectedGenre !== 'All') {
			items = items.filter((item) => item.genres?.includes(selectedGenre))
		}
		if (query) {
			const lowerCaseQuery = query.toLowerCase()
			items = items.filter(
				(item) =>
					item.title.toLowerCase().includes(lowerCaseQuery) ||
					item.description.toLowerCase().includes(lowerCaseQuery) ||
					item.cast?.some((actor) =>
						actor.toLowerCase().includes(lowerCaseQuery)
					)
			)
		}
		return items
	}, [activeTab, query, selectedGenre])

	const liveItems = filteredItems.filter((item) => item.liveNow)

	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />
			<main className='container mx-auto mt-6 mb-6 flex-1 px-4 pt-24 sm:px-6 lg:px-8'>
				<div className='mb-2 flex border-b border-gray-200 dark:border-zinc-800'>
					<button
						className={`px-4 py-2 font-medium transition-colors ${
							activeTab === 'movies'
								? 'border-b-2 border-purple-600 text-gray-900 dark:text-white'
								: 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
						}`}
						onClick={() => setActiveTab('movies')}
					>
						{t('liveCatalog.moviesTab')}
					</button>
					<button
						className={`px-4 py-2 font-medium transition-colors ${
							activeTab === 'shows'
								? 'border-b-2 border-purple-600 text-gray-900 dark:text-white'
								: 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
						}`}
						onClick={() => setActiveTab('shows')}
					>
						{t('liveCatalog.showsTab')}
					</button>
				</div>

				<div className='mb-6'>
					<SearchField
						onSubmit={handleSearch}
						placeholder={t('search.livePlaceholder', {
							category: activeTab
						})}
					/>
				</div>

				<div className='mb-8 flex flex-wrap gap-2'>
					{genreOptions.map((genre) => (
						<button
							key={genre.value}
							onClick={() => handleGenreFilter(genre.value)}
							className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
								selectedGenre === genre.value
									? 'bg-purple-600 text-white'
									: 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
							}`}
						>
							{t(genre.labelKey)}
						</button>
					))}
				</div>

				{filteredItems.length > 0 ? (
					<>
						{liveItems.length > 0 && (
							<div className='mb-12'>
								<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
									{t('liveCatalog.nowStreaming')}
								</h2>
								<div className='relative'>
									<div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
										{liveItems.map((item) => (
											<div key={`live-${item.id}`} className='w-58 flex-none'>
												<MediaCard {...item} videoUrl={item.videoUrl || ''} />
											</div>
										))}
									</div>
								</div>
							</div>
						)}

						<div>
							<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
								{t('liveCatalog.allSectionTitle', {
									category: t(`liveCatalog.${activeTab}`)
								})}
							</h2>
							<div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
								{filteredItems
									.filter((item) => !item.liveNow)
									.map((item) => (
										<div key={`all-${item.id}`} className='flex flex-col'>
											<MediaCard {...item} videoUrl={item.videoUrl || ''} />
										</div>
									))}
							</div>
						</div>
					</>
				) : (
					<div className='py-16 text-center'>
						<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
							{t('liveCatalog.noResultsTitle')}
						</h2>
						<p className='mt-2 text-gray-500 dark:text-gray-400'>
							{t('liveCatalog.noResultsSubtitle')}
						</p>
					</div>
				)}
			</main>
			<Footer />
		</div>
	)
}

export default LiveCatalogPage
