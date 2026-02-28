import { useParams } from 'react-router-dom'

import MediaCard from '../../../components/common/MediaCard.tsx'
import Footer from '../../../components/layout/Footer.tsx'
import Header from '../../../components/layout/Header.tsx'
import { allItems } from '../../../../data/shows.ts'

function CategoryListPage() {
	const { categoryName } = useParams()

	const categoryItems = allItems.filter((item) =>
		item.genres?.some(
			(genre) => genre.toLowerCase() === categoryName?.toLowerCase()
		)
	)

	return (
		<div className='flex min-h-screen flex-col bg-white transition-colors duration-300 dark:bg-zinc-900'>
			<Header />

			<main className='container mx-auto mt-12 flex-1 px-2 py-3 pt-20 sm:px-6 lg:px-8'>
				<h1 className='mb-8 text-3xl font-bold text-gray-900 capitalize dark:text-white'>
					{categoryName} Content{' '}
					<span className='h-4 w-4 rounded-full text-purple-700'>.</span>
				</h1>

				{categoryItems.length > 0 ? (
					<div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-2 lg:grid-cols-5 xl:grid-cols-6'>
						{categoryItems.map((item) => (
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
						))}
					</div>
				) : (
					<div className='py-12 text-center'>
						<p className='text-lg text-gray-600 dark:text-gray-400'>
							No content found for the "{categoryName}" category.
						</p>
					</div>
				)}
			</main>
			<Footer />
		</div>
	)
}

export default CategoryListPage
