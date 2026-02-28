import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

import MediaCard from '../../../components/common/MediaCard.tsx'

interface ContentCarouselSectionProps {
	title: string
	items: any[]
	onCreateRoom: (mediaId: number) => void
}

function ContentCarouselSection({
	title,
	items,
	onCreateRoom
}: ContentCarouselSectionProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null)

	const scroll = (direction: 'left' | 'right') => {
		if (scrollContainerRef.current) {
			const { current } = scrollContainerRef
			const scrollAmount = current.offsetWidth
			current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth'
			})
		}
	}

	return (
		<div className='group relative mb-12'>
			<div className='mb-4 flex items-center justify-between'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
					{title}{' '}
					<span className='h-4 w-4 rounded-full text-purple-700'>.</span>
				</h2>
			</div>

			<div className='relative'>
				<button
					onClick={() => scroll('left')}
					className='absolute top-1/2 left-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-purple-700 opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100'
				>
					<ChevronLeft className='h-6 w-6 text-white' />
				</button>

				<div
					ref={scrollContainerRef}
					className='scrollbar-hide flex space-x-2 overflow-x-auto pb-4'
					style={{
						scrollSnapType: 'x mandatory',
						scrollbarWidth: 'none',
						msOverflowStyle: 'none'
					}}
				>
					{items.map((item) => (
						<div
							key={item.id}
							className='my-0 w-58 flex-shrink-0 cursor-pointer'
							onClick={() => onCreateRoom(item.id)}
						>
							<MediaCard
								id={item.id}
								title={item.title}
								posterUrl={item.posterUrl}
								year={item.year}
								rating={item.rating}
								description={item.description}
								quality={item.quality}
								videoUrl={item.videoUrl || ''}
								teaserUrl={item.teaserUrl}
								aspectRatio='aspect-[2/3]'
								isLive={item.liveNow}
							/>
						</div>
					))}
				</div>

				{/* Right Arrow */}
				<button
					onClick={() => scroll('right')}
					className='absolute top-1/2 right-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-purple-700 opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100'
				>
					<ChevronRight className='h-6 w-6 text-white' />
				</button>
			</div>
		</div>
	)
}
export default ContentCarouselSection
