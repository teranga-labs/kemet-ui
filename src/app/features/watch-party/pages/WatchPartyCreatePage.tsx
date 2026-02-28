import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Footer from '../../../components/layout/Footer.tsx'
import Header from '../../../components/layout/Header.tsx'
import { mockRooms } from '../../../../data/rooms.ts'
import { allItems } from '../../../../data/shows.ts'
import ContentCarouselSection from '../components/ContentCarouselSection.tsx'

function WatchPartyCreatePage() {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const handleCreateRoom = (mediaId: number) => {
		const newRoomId = `room-${Date.now()}`
		const mediaItem = allItems.find((item) => item.id === mediaId)

		if (!mediaItem) {
			alert(t('watchParty.create.mediaNotFoundAlert'))
			return
		}

		mockRooms.push({
			id: newRoomId,
			mediaId: mediaId,
			hostName: 'You',
			roomName: `${mediaItem.title} Watch Party`,
			participants: ['You'],
			isPublic: true
		})

		navigate(`/watch-party/room/${newRoomId}`)
	}

	const movies = allItems.filter((item) => item.type === 'movie')
	const shows = allItems.filter((item) => item.type === 'show')
	const originals = allItems.filter((item) => item.type === 'original')

	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />
			<main className='container mx-auto mt-6 mb-6 flex-1 px-4 pt-24 sm:px-6 lg:px-8'>
				<h1 className='mb-8 text-4xl font-bold text-gray-900 dark:text-white'>
					{t('watchParty.create.title')}{' '}
					<span className='h-4 w-4 rounded-full text-purple-700'>!</span>
				</h1>

				{movies.length > 0 && (
					<ContentCarouselSection
						title={t('liveCatalog.movies')}
						items={movies}
						onCreateRoom={handleCreateRoom}
					/>
				)}

				{shows.length > 0 && (
					<ContentCarouselSection
						title={t('liveCatalog.shows')}
						items={shows}
						onCreateRoom={handleCreateRoom}
					/>
				)}

				{originals.length > 0 && (
					<ContentCarouselSection
						title={t('watchParty.kemetOriginals')}
						items={originals}
						onCreateRoom={handleCreateRoom}
					/>
				)}
			</main>
			<Footer />
		</div>
	)
}
export default WatchPartyCreatePage
