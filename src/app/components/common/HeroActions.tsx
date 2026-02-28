import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface HeroActionsProps {
	id: number
	onHoverStart: () => void
	onHoverEnd: () => void
}

function HeroActions({ id, onHoverStart, onHoverEnd }: HeroActionsProps) {
	const { t } = useTranslation()

	return (
		<div className='animate-fade-in-up animation-delay-600 mt-8 flex flex-col space-y-4 sm:mt-0 sm:flex-row sm:space-y-0 sm:space-x-4'>
			<Link
				to={`watch/${id}`}
				className='rounded-md bg-purple-600 px-10 py-4 text-center text-lg font-extrabold text-white transition-colors hover:bg-purple-700'
			>
				{t('homePage.heroActions.watchNow')}
			</Link>
			<Link
				to={`/details/${id}`}
				className='rounded-md border-2 border-gray-400 px-10 py-4 text-center text-lg font-extrabold text-white transition-colors hover:border-white hover:bg-white hover:text-black'
				onMouseEnter={onHoverStart}
				onMouseLeave={onHoverEnd}
			>
				{t('homePage.heroActions.learnMore')}
			</Link>
		</div>
	)
}

export default HeroActions
