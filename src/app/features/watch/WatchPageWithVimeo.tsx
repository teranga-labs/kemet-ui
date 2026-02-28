import { throttle } from 'lodash'
import { ChevronLeft } from 'lucide-react'
import { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { allItems } from '../../../data/shows.ts'
import { useWatchHistory } from '../../hooks/useWatchHistory.ts'
import VimeoPlayer from '../player/VimeoPlayer.tsx'

function WatchPageWithVimeo() {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const { updateWatchProgress } = useWatchHistory()

	const videoData =
		location.state || allItems.find((item) => item.id.toString() === id)

	const { vimeoId } = videoData || {}
	const numericId = id ? parseInt(id, 10) : null

	const throttledUpdate = useMemo(
		() =>
			throttle(
				(currentId: number, progress: number) => {
					updateWatchProgress(currentId, progress)
				},
				5000,
				{ trailing: true }
			),
		[updateWatchProgress]
	)

	const handleTimeUpdate = (data: { seconds: number; duration: number }) => {
		if (numericId && data.duration > 0) {
			const progress = data.seconds / data.duration
			throttledUpdate(numericId, progress)
		}
	}

	const handleEnd = () => {
		if (numericId) {
			updateWatchProgress(numericId, 1)
			console.log('Video ended and marked as complete.')
		}
	}

	return (
		<div className='min-h-screen bg-black'>
			<div className='relative flex h-screen w-full items-center justify-center'>
				{vimeoId ? (
					<>
						<button
							onClick={() => navigate(-1)}
							className='bg-opacity-50 absolute top-4 left-4 z-10 rounded-full bg-black p-2 text-white transition-colors hover:text-purple-400 focus:ring-2 focus:ring-white focus:outline-none'
							aria-label='Go back'
						>
							<ChevronLeft size={24} />
						</button>

						<div className='aspect-video w-full'>
							<VimeoPlayer
								videoId={vimeoId}
								autoplay={true}
								controls={true}
								onTimeUpdate={handleTimeUpdate}
								onEnd={handleEnd}
							/>
						</div>
					</>
				) : (
					<div className='text-center'>
						<h2 className='text-2xl font-semibold text-white'>
							Video Not Found
						</h2>
						<p className='mt-2 text-gray-400'>
							The video you are looking for does not exist or could not be
							loaded.
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default WatchPageWithVimeo
