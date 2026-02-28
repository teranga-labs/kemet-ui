import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useWatchHistory } from '../../../hooks/useWatchHistory.ts'
import {
	allItems,
	kemetOriginals,
	type MediaItem,
	movieItems,
	showItems
} from '../../../../data/shows.ts'

import CarouselSkeleton from './CarouselSkeleton.tsx'
import ContentCarousel from './ContentCarousel.tsx'
import ShowCategory from './ShowCategory.tsx'

interface ContentProps {
	aiRecommendations: MediaItem[]
	isAiLoading: boolean
}

function Content({ aiRecommendations, isAiLoading }: ContentProps) {
	const { t } = useTranslation()
	const { history } = useWatchHistory()

	const continueWatchingItems = useMemo(() => {
		const itemsById = new Map(allItems.map((item) => [item.id, item]))

		return Object.entries(history)
			.filter(
				([, progressData]) =>
					progressData.progress > 0.05 && progressData.progress < 0.95
			)
			.sort(
				([, a], [, b]) =>
					new Date(b.lastWatched).getTime() - new Date(a.lastWatched).getTime()
			)
			.map(([itemId]) => itemsById.get(Number(itemId)))
			.filter((item): item is MediaItem => item !== undefined)
	}, [history])

	return (
		<div className='py-6'>
			{continueWatchingItems.length > 0 && (
				<ContentCarousel
					title={t('homePage.content.continueWatching')}
					items={continueWatchingItems}
				/>
			)}
			{isAiLoading ? (
				<CarouselSkeleton title={t('homePage.content.recommended')} />
			) : (
				<ContentCarousel
					title={t('homePage.content.recommended')}
					items={aiRecommendations}
					viewAllLink='/movies'
				/>
			)}
			<ShowCategory />
			<ContentCarousel
				title={t('homePage.content.popularMovies')}
				items={movieItems}
				viewAllLink='/movies'
			/>
			<ContentCarousel
				title={t('homePage.content.bingeWorthy')}
				items={showItems}
				viewAllLink='/shows'
			/>
			<ContentCarousel
				title={t('homePage.content.onlyOnKemet')}
				items={kemetOriginals}
				viewAllLink='/movies'
			/>
		</div>
	)
}

export default Content
