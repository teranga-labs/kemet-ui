import type { MediaItem } from '../../../data/shows.ts'
import Header from '../layout/Header.tsx'

import MediaCard from './MediaCard.tsx'

interface SearchResultsProps {
	results: MediaItem[]
	query: string
	onClose: () => void
}

function SearchResults({ results, query, onClose }: SearchResultsProps) {
	return (
		<div className='fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-zinc-900'>
			<Header />

			<div className='container mx-auto mt-12 px-4 pt-24 pb-8'>
				<div className='mb-6 flex items-center justify-between'>
					<h2 className='text-2xl font-bold text-black dark:text-white'>
						Search Results for "{query}"{' '}
						<span className='text-purple-700'>.</span>
					</h2>
					<button
						onClick={onClose}
						className='rounded-lg bg-gray-100 px-4 py-2 text-lg font-medium text-black transition-colors hover:bg-gray-200 hover:text-purple-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 dark:hover:text-purple-400'
					>
						Close
					</button>
				</div>

				{results.length === 0 ? (
					<div className='flex min-h-[50vh] flex-col items-center justify-center'>
						<p className='mb-4 text-center text-xl text-black dark:text-white'>
							No results found for "{query}"
						</p>
						<p className='text-center text-gray-600 dark:text-gray-400'>
							Try different keywords or browse our categories
						</p>
					</div>
				) : (
					<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
						{results.map((item) => (
							<div key={item.id} className='flex flex-col'>
								<MediaCard
									id={item.id}
									title={item.title}
									posterUrl={item.posterUrl}
									year={item.year}
									rating={item.rating}
									description={item.description}
									isLive={item.liveNow}
									videoUrl={item.videoUrl || ''}
								/>
								<div className='mt-3 px-2'>
									<div className='flex items-start justify-between'>
										<div>
											<h3 className='line-clamp-1 text-sm font-semibold text-gray-900 dark:text-white'>
												{item.title}
											</h3>
											{item.year && (
												<p className='mt-1 text-xs text-gray-600 dark:text-gray-400'>
													{item.year}
												</p>
											)}
										</div>
										{item.quality && (
											<p className='flex items-center text-xs font-medium text-gray-900 dark:text-gray-300'>
												{item.quality}
											</p>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchResults
