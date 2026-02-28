const SkeletonCard = () => (
	<div className='my-2 w-72 flex-shrink-0 animate-pulse'>
		<div className='h-80 w-58 rounded-lg bg-gray-300 dark:bg-zinc-700'></div>
	</div>
)

function CarouselSkeleton({ title }: { title: string }) {
	return (
		<div className='mb-12'>
			<div className='mb-4 flex items-center justify-between px-4'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
					{title}{' '}
					<span className='h-4 w-4 rounded-full text-purple-700'>.</span>
				</h2>
				<div className='h-5 w-16 rounded bg-gray-300 dark:bg-zinc-700'></div>
			</div>
			<div className='flex space-x-2 overflow-hidden px-4 pb-4'>
				{Array.from({ length: 5 }).map((_, index) => (
					<SkeletonCard key={index} />
				))}
			</div>
		</div>
	)
}

export default CarouselSkeleton
