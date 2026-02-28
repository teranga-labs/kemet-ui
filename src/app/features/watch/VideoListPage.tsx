import { Link } from 'react-router-dom'

import videoItems from '../../../data/video.ts'

function VideoListPage() {
	return (
		<div className='min-h-screen bg-gray-900 p-8'>
			<h1 className='mb-8 text-4xl font-bold text-white'>Featured Videos</h1>
			<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{videoItems.map((video) => (
					<div
						key={video.id}
						className='overflow-hidden rounded-lg bg-zinc-800'
					>
						<Link to={`/vimeo/${video.id}`} state={video}>
							<img
								src={video.posterUrl}
								alt={video.title}
								className='h-48 w-full object-cover transition-opacity hover:opacity-80'
							/>
							<div className='p-4'>
								<h3 className='text-lg font-semibold text-white'>
									{video.title}
								</h3>
								<p className='text-sm text-gray-400'>{video.year}</p>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}

export default VideoListPage
