import { useNavigate, useParams } from 'react-router-dom'

import { allItems } from '../../../data/shows.ts'
import Player from '../player/Player.tsx'

function WatchPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const mediaItem = allItems.find((item) => item.id === Number(id))

	if (!mediaItem) {
		return (
			<div className='flex h-screen items-center justify-center text-white'>
				Content not found
			</div>
		)
	}

	const handleBack = () => {
		navigate(-1)
	}

	return (
		<div className='flex h-screen w-screen flex-col overflow-hidden bg-black text-white'>
			<div className='relative flex-grow'>
				<Player
					src={mediaItem.videoUrl || ''}
					title={mediaItem.title}
					onBack={handleBack}
					subtitles={[
						{
							lang: 'en',
							label: 'English',
							src: '/subtitles/movie-en.vtt'
						},
						{
							lang: 'fr',
							label: 'Français',
							src: '/subtitles/movie-fr.vtt'
						},
						{
							lang: 'wo',
							label: 'Wolof',
							src: '/subtitles/movie-wo.vtt'
						}
					]}
				/>
			</div>
		</div>
	)
}

export default WatchPage
