import { Bookmark } from 'lucide-react'

import MediaCard from '../../../components/common/MediaCard.tsx'
import Footer from '../../../components/layout/Footer.tsx'
import Header from '../../../components/layout/Header.tsx'
import { useSavedContent } from '../../../hooks/useSavedContent.ts'
import { allItems } from '../../../../data/shows.ts'

function SavedPage() {
	const { savedItems } = useSavedContent()
	const savedContent = allItems.filter((item) => savedItems.includes(item.id))

	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />
			<main className='container mx-auto mt-6 flex-1 px-4 pt-24 sm:px-6 lg:px-8'>
				<h1 className='mb-8 text-4xl font-bold text-gray-900 dark:text-white'>
					My Saved List{' '}
					<span className='h-4 w-4 rounded-full text-purple-700'>.</span>
				</h1>

				{savedContent.length > 0 ? (
					<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
						{savedContent.map((item) => (
							<MediaCard
								key={item.id}
								id={item.id}
								title={item.title}
								posterUrl={item.posterUrl}
								year={item.year}
								rating={item.rating}
								description={item.description}
								videoUrl={item.videoUrl || ''}
							/>
						))}
					</div>
				) : (
					<div className='flex flex-col items-center justify-center py-20 text-center'>
						<Bookmark
							size={64}
							className='mb-4 text-gray-300 dark:text-zinc-700'
						/>
						<h2 className='mb-2 text-2xl font-semibold text-gray-700 dark:text-gray-300'>
							Your list is empty
						</h2>
						<p className='max-w-md text-gray-500 dark:text-gray-400'>
							Add movies and shows to your list to watch them later. Look for
							the save icon on any title.
						</p>
					</div>
				)}
			</main>
			<Footer />
		</div>
	)
}

export default SavedPage
