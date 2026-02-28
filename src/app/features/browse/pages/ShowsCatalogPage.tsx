import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import MediaCard from '../../../components/common/MediaCard.tsx'
import SearchField from '../../../components/common/SearchField.tsx'
import Footer from '../../../components/layout/Footer.tsx'
import Header from '../../../components/layout/Header.tsx'
import { allItems } from '../../../../data/shows.ts'

const genreOptions = [
	{ value: 'All', labelKey: 'categories.all' },
	{ value: 'Drama', labelKey: 'categories.drama' },
	{ value: 'History', labelKey: 'categories.history' },
	{ value: 'Crime', labelKey: 'categories.crime' },
	{ value: 'Thriller', labelKey: 'categories.thriller' },
	{ value: 'Tech', labelKey: 'categories.tech' },
	{ value: 'Fantasy', labelKey: 'categories.fantasy' },
	{ value: 'Adventure', labelKey: 'categories.adventure' },
	{ value: 'Sci-Fi', labelKey: 'categories.sciFi' },
	{ value: 'Animation', labelKey: 'categories.animation' }
]

function ShowsCatalogPage() {
	const { t } = useTranslation()
	const [query, setQuery] = useState('')
	const [selectedGenre, setSelectedGenre] = useState('All')

	const handleSearch = (newQuery: string) => {
		setQuery(newQuery)
	}

	const handleGenreFilter = (genre: string) => {
		setSelectedGenre(genre)
	}

	const filteredShows = useMemo(() => {
		let shows = allItems.filter((item) => item.type === 'show')
		if (selectedGenre !== 'All') {
			shows = shows.filter((show) => show.genres?.includes(selectedGenre))
		}
		if (query) {
			const lowerCaseQuery = query.toLowerCase()
			shows = shows.filter(
				(show) =>
					show.title.toLowerCase().includes(lowerCaseQuery) ||
					show.description.toLowerCase().includes(lowerCaseQuery) ||
					show.cast?.some((actor) =>
						actor.toLowerCase().includes(lowerCaseQuery)
					)
			)
		}
		return shows
	}, [query, selectedGenre])

	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />
			<main className='container mx-auto mt-6 mb-6 flex-1 px-4 pt-24 sm:px-6 lg:px-8'>
				<h1 className='mb-2 text-4xl font-bold text-gray-900 dark:text-white'>
					{t('showCatalog.title')}{' '}
					<span className='h-4 w-4 rounded-full text-purple-700'>.</span>
				</h1>

				<p className='mb-6 text-gray-600 dark:text-gray-400'>
					{t('showCatalog.description')}
				</p>

				<div className='mb-6'>
					<SearchField
						onSubmit={handleSearch}
						placeholder={t('search.showsPlaceholder')}
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
									: 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700'
							}`}
						>
							{t(genre.labelKey)}
						</button>
					))}
				</div>

				{filteredShows.length > 0 ? (
					<div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
						{filteredShows.map((item) => (
							<div key={item.id} className='flex flex-col'>
								<MediaCard
									id={item.id}
									title={item.title}
									posterUrl={item.posterUrl}
									year={item.year}
									rating={item.rating}
									description={item.description}
									quality={item.quality}
									videoUrl={item.videoUrl || ''}
									vimeoId={item.vimeoId}
									teaserUrl={item.teaserUrl}
									aspectRatio='aspect-[2/3]'
									isLive={item.liveNow}
								/>
							</div>
						))}
					</div>
				) : (
					<div className='py-16 text-center'>
						<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
							{t('showCatalog.noResultsTitle')}
						</h2>
						<p className='mt-2 text-gray-500 dark:text-gray-400'>
							{t('showCatalog.noResultsSubtitle')}
						</p>
					</div>
				)}
			</main>
			<Footer />
		</div>
	)
}

export default ShowsCatalogPage
