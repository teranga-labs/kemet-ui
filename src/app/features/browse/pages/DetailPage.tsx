import {
	Award,
	BookOpen,
	Calendar,
	CheckCircle,
	Clock,
	Film,
	Globe,
	Mic,
	PlayCircle,
	PlusCircle,
	Star,
	Users,
	X
} from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { mockRooms } from '../../../../data/rooms.ts'
import { allItems } from '../../../../data/shows.ts'
import SearchOverlay from '../../../components/common/SearchOverlay.tsx'
import Footer from '../../../components/layout/Footer.tsx'
import Header from '../../../components/layout/Header.tsx'
import { useSavedContent } from '../../../hooks/useSavedContent.ts'
import ContentCarousel from '../components/ContentCarousel.tsx'

const getGenreKey = (genre: string) => {
	const key =
		genre.charAt(0).toLowerCase() +
		genre.slice(1).replace(/(\s|-)(\w)/g, (g) => g[2].toUpperCase())
	return `categories.${key}`
}

function DetailsPage() {
	const { t } = useTranslation()
	const { id } = useParams()
	const navigate = useNavigate()
	const item = allItems.find((i) => i.id === parseInt(id || ''))

	const [showTeaser, setShowTeaser] = useState(false)
	const videoRef = useRef<HTMLVideoElement>(null)

	const [selectedSeason, setSelectedSeason] = useState(1)

	const { isItemSaved, addSavedItem, removeSavedItem } = useSavedContent()
	const isSaved = item ? isItemSaved(item.id) : false

	const handleToggleSave = () => {
		if (!item) return
		if (isSaved) {
			removeSavedItem(item.id)
		} else {
			addSavedItem(item.id)
		}
	}

	const handlePlay = () => navigate(`/watch/${id}`)
	const handleTrailer = () => navigate(`/watch/${id}`)

	const handleTeaserClose = () => {
		setShowTeaser(false)
		if (videoRef.current) {
			videoRef.current.pause()
			videoRef.current.currentTime = 0
		}
	}

	const handleWatchParty = () => {
		if (!item) return
		const newRoomId = `room-${Date.now()}`
		mockRooms.push({
			id: newRoomId,
			mediaId: item.id,
			hostName: 'You',
			roomName: `${item.title} Watch Party`,
			participants: ['You'],
			isPublic: true
		})
		navigate(`/watch-party/room/${newRoomId}`)
	}

	const formatDate = (dateStr: string) => {
		if (!dateStr || dateStr.length !== 6) return ''
		const year = `20${dateStr.substring(0, 2)}`
		const month = new Date(
			`${year}-${dateStr.substring(2, 4)}-01`
		).toLocaleString('default', { month: 'long' })
		const day = parseInt(dateStr.substring(4, 6))
		return `${month} ${day}, ${year}`
	}

	const similarItems = item
		? allItems.filter(
				(i) =>
					i.id !== item.id &&
					i.type === item.type &&
					i.genres &&
					i.genres.some((g) => item.genres?.includes(g))
			)
		: []

	const recommendedItems = item
		? allItems
				.filter((i) => i.id !== item.id)
				.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
				.slice(0, 15)
		: []

	if (!item) {
		return (
			<div className='flex min-h-screen items-center justify-center bg-white text-black dark:bg-zinc-900 dark:text-white'>
				<h1 className='text-2xl'>{t('detailsPage.itemNotFound')}</h1>
				<Link to='/' className='ml-4 text-purple-600 dark:text-purple-400'>
					{t('detailsPage.goHome')}
				</Link>
			</div>
		)
	}

	const currentSeasonData =
		item?.seasons?.find((s) => s.seasonNumber === selectedSeason) || null

	const backgroundImageUrl = item.bannerUrl
		? `url(${item.bannerUrl})`
		: `url(https://placehold.co/400x600/4C4C6D/FFE9B1?text=${encodeURIComponent(
				item.title
			)})`

	return (
		<div className='relative min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white'>
			<Header />
			<SearchOverlay />

			{showTeaser && item.teaserUrl && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4'>
					<div className='relative aspect-video w-full max-w-4xl'>
						<button
							onClick={handleTeaserClose}
							className='absolute -top-10 right-0 z-10 text-white hover:text-gray-300'
						>
							<X className='h-8 w-8' />
						</button>
						<video
							ref={videoRef}
							src={item.teaserUrl}
							controls
							autoPlay
							muted
							className='h-full w-full rounded-lg object-contain'
						/>
					</div>
				</div>
			)}

			<div
				className='relative flex h-auto min-h-[70vh] flex-col bg-cover bg-center md:h-screen'
				style={{ backgroundImage: backgroundImageUrl }}
			>
				<div className='absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent' />
				<div className='relative z-10 container mx-auto mt-auto w-full px-4 pt-28 pb-10 sm:px-6 md:px-8 lg:px-10'>
					<h1 className='mb-4 text-3xl font-extrabold text-white sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl xl:text-7xl'>
						{item.title}
					</h1>

					<div className='mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-300 md:mb-6 md:gap-4 md:text-base'>
						<span className='flex items-center'>
							<Calendar className='mr-1 h-4 w-4 md:h-5 md:w-5' />
							{formatDate(item.releaseDate)}
						</span>
						<span className='flex items-center'>
							<Star className='mr-1 h-4 w-4 text-yellow-400 md:h-5 md:w-5' />
							{item.rating}
						</span>
						{item.genres?.map((genre, index) => (
							<span key={index} className='text-sm md:text-base'>
								{t(getGenreKey(genre))}
							</span>
						))}
						{item.quality && (
							<span className='rounded border border-gray-500 px-2 py-0.5 text-xs md:px-3 md:py-1 md:text-sm'>
								{item.quality}
							</span>
						)}
						{item.duration && (
							<span className='flex items-center'>
								<Clock className='mr-1 h-4 w-4 md:h-5 md:w-5' />
								{item.duration}
							</span>
						)}
						{item.languages && (
							<span className='flex items-center'>
								<Mic className='mr-1 h-4 w-4 md:h-5 md:w-5' />
								{t(`languages.${item.languages[0]}`)}
								{item.languages.length > 1 && ` +${item.languages.length - 1}`}
							</span>
						)}
					</div>

					<p className='mb-6 line-clamp-3 max-w-2xl text-base text-gray-200 md:mb-8 md:text-lg lg:text-xl'>
						{item.description}
					</p>

					<div className='mb-6 flex flex-wrap items-center gap-3 md:mb-8 md:gap-4'>
						<button
							onClick={handlePlay}
							className='flex items-center space-x-1 rounded-md bg-white px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-gray-200 md:space-x-2 md:px-6 md:py-3 md:text-base'
						>
							<PlayCircle className='h-5 w-5 md:h-6 md:w-6' />
							<span>{t('detailsPage.play')}</span>
						</button>
						{item.trailerUrl && (
							<button
								onClick={handleTrailer}
								className='flex items-center space-x-1 rounded-md bg-gray-700/80 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-600/80 md:space-x-2 md:px-6 md:py-3 md:text-base'
							>
								<PlayCircle className='h-5 w-5 md:h-6 md:w-6' />
								<span>{t('detailsPage.trailer')}</span>
							</button>
						)}
						<button
							onClick={handleWatchParty}
							className='flex items-center space-x-1 rounded-md bg-gray-700/80 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-600/80 md:space-x-2 md:px-6 md:py-3 md:text-base'
						>
							<Users className='h-5 w-5 md:h-6 md:w-6' />
							<span>{t('header.watchParty')}</span>
						</button>
						<button
							onClick={handleToggleSave}
							aria-label={
								isSaved
									? t('detailsPage.removeFromList')
									: t('detailsPage.addToList')
							}
							className={`rounded-full p-2 text-sm transition-colors md:p-3 md:text-base ${
								isSaved
									? 'bg-purple-600 text-white hover:bg-purple-700'
									: 'bg-gray-700/80 text-white hover:bg-gray-600/80'
							}`}
						>
							{isSaved ? (
								<CheckCircle className='h-5 w-5 md:h-6 md:w-6' />
							) : (
								<PlusCircle className='h-5 w-5 md:h-6 md:w-6' />
							)}
						</button>
					</div>

					<div className='mb-6 grid grid-cols-1 gap-4 rounded-lg bg-black/0 p-4 backdrop-blur-sm sm:grid-cols-2 md:mb-8 md:gap-6 md:p-6 lg:grid-cols-3'>
						<div className='mb-4 sm:mb-0'>
							<h3 className='mb-2 flex items-center text-base font-semibold text-white md:text-lg'>
								<Users className='mr-2 h-4 w-4 md:h-5 md:w-5' />{' '}
								{t('detailsPage.cast')}
							</h3>
							<ul className='space-y-1 text-sm text-gray-300 md:text-base'>
								{item.cast.slice(0, 4).map((person, index) => (
									<li key={index}>{person}</li>
								))}
								{item.cast.length > 4 && (
									<li className='text-gray-400'>
										{t('detailsPage.moreCast', { count: item.cast.length - 4 })}
									</li>
								)}
							</ul>
						</div>

						<div className='mb-4 sm:mb-0'>
							<h3 className='mb-2 flex items-center text-base font-semibold text-white md:text-lg'>
								<Film className='mr-2 h-4 w-4 md:h-5 md:w-5' />{' '}
								{t('detailsPage.production')}
							</h3>
							<div className='space-y-2 text-sm text-gray-300 md:text-base'>
								<div className='flex items-start'>
									<BookOpen className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0' />
									<span>{item.production}</span>
								</div>
								<div className='flex items-start'>
									<Globe className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0' />
									<span>{item.country}</span>
								</div>
								{item.director && (
									<div className='flex items-start'>
										<Award className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0' />
										<span>
											{t('detailsPage.directorLabel')} {item.director}
										</span>
									</div>
								)}
								{item.seasons && item.seasons.length > 0 && (
									<div className='flex items-start'>
										<Clock className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0' />
										<span>
											{t('detailsPage.seasons', { count: item.seasons.length })}
										</span>
									</div>
								)}
							</div>
						</div>

						<div>
							<h3 className='mb-2 text-base font-semibold text-white md:text-lg'>
								{t('detailsPage.details')}
							</h3>
							<div className='space-y-2 text-sm text-gray-300 md:text-base'>
								<div className='flex items-center'>
									<span className='w-16 font-medium md:w-20'>
										{t('detailsPage.typeLabel')}
									</span>
									<span className='ml-3 capitalize'>{item.type}</span>
								</div>
								{item.quality && (
									<div className='flex items-center'>
										<span className='w-16 font-medium md:w-20'>
											{t('detailsPage.qualityLabel')}
										</span>
										<span className='ml-3'>{item.quality}</span>
									</div>
								)}
								{item.features && (
									<div className='flex items-center'>
										<span className='w-16 font-medium md:w-20'>
											{t('detailsPage.featuresLabel')}
										</span>
										<span className='ml-3'>{item.features.join(', ')}</span>
									</div>
								)}
								{item.languages && item.languages.length > 1 && (
									<div className='flex items-start'>
										<span className='w-16 font-medium md:w-20'>
											{t('detailsPage.languagesLabel')}
										</span>
										<span className='ml-3'>
											{item.languages
												.map((lang) => t(`languages.${lang}`))
												.join(', ')}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='container mx-auto px-4 py-4'>
				{item.type === 'show' && item.seasons && item.seasons.length > 0 && (
					<section className='my-6 md:my-8'>
						<div className='mb-4 flex items-center justify-between'>
							<h2 className='text-2xl font-bold'>
								{t('detailsPage.episodes', 'Episodes')}
							</h2>
							{item.seasons.length > 1 && (
								<div className='relative'>
									<select
										value={selectedSeason}
										onChange={(e) => setSelectedSeason(Number(e.target.value))}
										// UPDATED: Theme-aware classes
										className='appearance-none rounded-md border border-zinc-300 bg-zinc-100 py-2 pr-10 pl-4 text-zinc-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
									>
										{item.seasons.map((season) => (
											<option
												key={season.seasonNumber}
												value={season.seasonNumber}
											>
												{t(
													'detailsPage.seasonLabel',
													`Season ${season.seasonNumber}`
												)}
											</option>
										))}
									</select>
									<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500 dark:text-gray-400'></div>
								</div>
							)}
						</div>

						<div className='space-y-4'>
							{currentSeasonData?.episodes.map((episode, index) => (
								<div
									key={episode.id}
									className='flex cursor-pointer flex-col gap-4 rounded-lg p-3 transition-colors hover:bg-zinc-100 md:flex-row dark:hover:bg-zinc-800/50'
								>
									<div className='text-xl font-semibold text-zinc-500 md:w-12 dark:text-zinc-400'>
										{index + 1}
									</div>
									<div className='relative w-full flex-shrink-0 md:w-48'>
										<img
											src={episode.thumbnailUrl}
											alt={episode.title}
											className='aspect-video w-full rounded-md object-cover'
										/>
										<div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100'>
											<PlayCircle className='h-10 w-10 text-white' />
										</div>
									</div>
									<div className='flex-grow'>
										<div className='flex items-center justify-between'>
											<h3 className='text-lg font-bold'>{episode.title}</h3>
											<span className='text-sm text-zinc-600 dark:text-zinc-400'>
												{episode.duration}
											</span>
										</div>
										<p className='mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300'>
											{episode.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</section>
				)}

				{similarItems.length > 0 && (
					<div className='my-4 w-full'>
						<ContentCarousel
							title={t('detailsPage.moreLikeThis')}
							items={similarItems}
							viewAllLink={`/browse?type=${item.type}`}
						/>
					</div>
				)}

				{recommendedItems.length > 0 && (
					<div className='my-6 w-full md:my-8'>
						<ContentCarousel
							title={t('detailsPage.youMightAlsoLike')}
							items={recommendedItems}
						/>
					</div>
				)}
			</div>
			<Footer />
		</div>
	)
}

export default DetailsPage
