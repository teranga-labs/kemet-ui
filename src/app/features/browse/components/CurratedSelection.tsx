import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { allItems, type MediaItem } from '../../../../data/shows.ts'

const curatedItems = allItems.slice(0, 18)

const MediaItemCard = ({ item }: { item: MediaItem }) => {
	const { t } = useTranslation()
	return (
		<Link to={`/details/${item.id}`} className='group block'>
			<div className='mb-3 aspect-[2/3] overflow-hidden rounded-md bg-zinc-800 transition-transform duration-300 group-hover:scale-105'>
				<img
					src={item.posterUrl}
					alt={item.title}
					className='h-full w-full object-cover'
				/>
			</div>
			<div className='text-left dark:text-gray-200'>
				<div className='dark:gray-200 mb-1 flex items-center space-x-1 text-xs'>
					<span className='font-bold'>{t('curatedSelection.rating')}</span>
					<span>&bull;</span>
					<span className='font-bold'>{item.year}</span>
					<span>&bull;</span>
					{item.genres && (
						<span className='font-bold'>{t(item.genres[0])}</span>
					)}
				</div>
				<h3 className='font-bold'>{item.title}</h3>
			</div>
		</Link>
	)
}

function CuratedSelection() {
	const { t } = useTranslation()

	return (
		<section className='bg-white py-20 dark:bg-zinc-800'>
			<div className='container mx-auto px-4 text-center'>
				<p className='text-sm font-bold tracking-widest text-zinc-700 uppercase dark:text-gray-200'>
					{t('curatedSelection.tagline')}
				</p>
				<h2 className='mt-2 mb-12 text-5xl font-extrabold md:text-5xl dark:text-gray-200'>
					{t('curatedSelection.title')}
				</h2>
				<div className='mb-12 grid grid-cols-2 gap-x-2 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
					{curatedItems.map((item) => (
						<MediaItemCard key={item.id} item={item} />
					))}
				</div>
				<Link to='/movies'>
					<button className='rounded-sm bg-purple-700 px-11 py-5 font-bold text-white transition-colors hover:bg-purple-800'>
						{t('curatedSelection.browseButton')}
					</button>
				</Link>
			</div>
		</section>
	)
}

export default CuratedSelection
