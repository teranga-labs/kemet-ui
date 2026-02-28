import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import MediaCard from '../../../components/common/MediaCard.tsx'

interface CarouselItem {
	id: number
	title: string
	posterUrl: string
	year?: number
	rating?: string
	description?: string
	quality?: string
	isLive?: boolean
	videoUrl?: string
	vimeoId?: number
	teaserUrl?: string
}

interface CarouselProps {
	title: string
	items: CarouselItem[]
	viewAllLink?: string
}

function ContentCarousel({ title, items, viewAllLink = '#' }: CarouselProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const { t } = useTranslation()

	const scroll = (direction: 'left' | 'right') => {
		if (scrollContainerRef.current) {
			const { current } = scrollContainerRef
			const scrollAmount = current.offsetWidth * 0.8
			current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth'
			})
		}
	}

	return (
		<div className='group relative mb-12'>
			<div className='mb-1 flex items-center justify-between px-4'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
					{title}{' '}
					<span className='h-4 w-4 rounded-full text-purple-700'>.</span>
				</h2>
				<Link
					to={viewAllLink}
					className='text-sm font-bold text-purple-700 transition-colors hover:text-purple-500 dark:text-white dark:hover:text-purple-400'
				>
					{t('homePage.contentCarousel.viewAll')}
				</Link>
			</div>

			<div className='relative'>
				<button
					onClick={() => scroll('left')}
					className='absolute top-1/2 left-2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-purple-700/80 opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100'
				>
					<ChevronLeft className='h-6 w-6 text-white' />
				</button>

				<div
					ref={scrollContainerRef}
					className='scrollbar-hide flex space-x-2 overflow-x-auto overflow-y-hidden px-4 pb-4'
					style={{
						scrollSnapType: 'x mandatory',
						scrollbarWidth: 'none',
						msOverflowStyle: 'none'
					}}
				>
					{items.map((item) => (
						<div key={item.id} className='w-58 flex-shrink-0 overflow-hidden'>
							<MediaCard
								id={item.id}
								title={item.title}
								posterUrl={item.posterUrl}
								year={item.year}
								rating={item.rating}
								description={item.description}
								quality={item.quality}
								isLive={item.isLive}
								videoUrl={item.videoUrl || ''}
								vimeoId={item.vimeoId}
								teaserUrl={item.teaserUrl}
							/>
						</div>
					))}
				</div>

				<button
					onClick={() => scroll('right')}
					className='absolute top-1/2 right-2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-purple-700/80 opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100'
				>
					<ChevronRight className='h-6 w-6 text-white' />
				</button>
			</div>
		</div>
	)
}

export default ContentCarousel
