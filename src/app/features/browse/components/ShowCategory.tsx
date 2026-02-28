import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const predefinedCategories = [
	{
		name: 'Action',
		nameKey: 'categories.action',
		imageUrl: 'https://placehold.co/600x400/3B3486/FFFFFF?text=Action'
	},
	{
		name: 'Comedy',
		nameKey: 'categories.comedy',
		imageUrl: 'https://placehold.co/600x400/7858A6/FFFFFF?text=Comedy'
	},
	{
		name: 'Drama',
		nameKey: 'categories.drama',
		imageUrl: 'https://placehold.co/600x400/4C4C6D/FFFFFF?text=Drama'
	},
	{
		name: 'Sci-Fi',
		nameKey: 'categories.sciFi',
		imageUrl: 'https://placehold.co/600x400/1D267D/FFFFFF?text=Sci-Fi'
	},
	{
		name: 'Animation',
		nameKey: 'categories.animation',
		imageUrl: 'https://placehold.co/600x400/5C4B99/FFFFFF?text=Animation'
	},
	{
		name: 'Documentary',
		nameKey: 'categories.documentary',
		imageUrl: 'https://placehold.co/600x400/0C134F/FFFFFF?text=Documentary'
	},
	{
		name: 'Adventure',
		nameKey: 'categories.adventure',
		imageUrl: 'https://placehold.co/600x400/3B3486/FFFFFF?text=Adventure'
	},
	{
		name: 'Fantasy',
		nameKey: 'categories.fantasy',
		imageUrl: 'https://placehold.co/600x400/7858A6/FFFFFF?text=Fantasy'
	}
]

function ShowCategory() {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const handleCategoryClick = (categoryName: string) => {
		navigate(`/category/${categoryName.toLowerCase()}`)
	}

	return (
		<div className='mb-12'>
			<div className='flex items-center justify-between px-4'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
					{t('homePage.showCategory.browseByCategory')}{' '}
					<span className='text-purple-700'>.</span>
				</h2>
				<button
					onClick={() => navigate('/categories')}
					className='text-sm font-bold text-purple-700 transition-colors hover:text-purple-500 dark:text-white dark:hover:text-purple-400'
				>
					{t('homePage.contentCarousel.viewAll')}
				</button>
			</div>

			<div className='grid grid-cols-2 gap-2 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8'>
				{predefinedCategories.map((category) => (
					<button
						key={category.name}
						onClick={() => handleCategoryClick(category.name)}
						className='group/card block text-left'
					>
						<div className='relative aspect-video overflow-hidden rounded-lg transition-transform duration-300 ease-in-out group-hover/card:scale-105'>
							<img
								src={category.imageUrl}
								alt={t(category.nameKey)}
								className='h-full w-full object-cover'
							/>
							<div className='absolute inset-0 bg-black/40 transition-colors duration-300 group-hover/card:bg-black/20'></div>
						</div>

						<div className='mt-3 text-center'>
							<h3 className='text-lg font-bold text-gray-900 transition-colors duration-300 group-hover/card:text-purple-700 dark:text-gray-100 dark:group-hover/card:text-purple-400'>
								{t(category.nameKey)}
							</h3>
						</div>
					</button>
				))}
			</div>
		</div>
	)
}

export default ShowCategory
