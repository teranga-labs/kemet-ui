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
	{ value: 'War', labelKey: 'categories.war' }
]

function MoviesCatalogPage() {
	const { t } = useTranslation()
	const [query, setQuery] = useState('')
	const [selectedGenre, setSelectedGenre] = useState('All')

	const handleSearch = (newQuery: string) => {
		setQuery(newQuery)
	}

	const handleGenreFilter = (genre: string) => {
		setSelectedGenre(genre)
	}

	const filteredMovies = useMemo(() => {
		let movies = allItems.filter((item) => item.type !== 'show')
		if (selectedGenre !== 'All') {
			movies = movies.filter((movie) => movie.genres?.includes(selectedGenre))
		}
		if (query) {
			const lowerCaseQuery = query.toLowerCase()
			movies = movies.filter(
				(movie) =>
					movie.title.toLowerCase().includes(lowerCaseQuery) ||
					movie.description.toLowerCase().includes(lowerCaseQuery) ||
					movie.cast?.some((actor) =>
						actor.toLowerCase().includes(lowerCaseQuery)
					)
			)
		}
		return movies
	}, [query, selectedGenre])

	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />
			<main className='container mx-auto mt-6 mb-6 flex-1 px-4 pt-24 sm:px-6 lg:px-8'>
				{/* 4. Translate all static text */}
				<h1 className='mb-2 text-4xl font-bold text-gray-900 dark:text-white'>
					{t('movieCatalog.title')}{' '}
					<span className='h-4 w-4 rounded-full text-purple-700'>.</span>
				</h1>

				<p className='mb-6 text-gray-600 dark:text-gray-400'>
					{t('movieCatalog.description')}
				</p>

				<div className='mb-6'>
					<SearchField
						onSubmit={handleSearch}
						placeholder={t('search.moviesPlaceholder')}
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

				{filteredMovies.length > 0 ? (
					<div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
						{filteredMovies.map((item) => (
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
							{t('movieCatalog.noResultsTitle')}
						</h2>
						<p className='mt-2 text-gray-500 dark:text-gray-400'>
							{t('movieCatalog.noResultsSubtitle')}
						</p>
					</div>
				)}
			</main>
			<Footer />
		</div>
	)
}

export default MoviesCatalogPage
