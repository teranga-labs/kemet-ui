import { Clock, MessageCircle, Share, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Footer from '../../../components/layout/Footer.tsx'
import Header from '../../../components/layout/Header.tsx'

function WatchPartyMenuPage() {
	const { t } = useTranslation()

	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />
			<main className='container mx-auto mt-8 mb-6 flex-1 px-4 pt-24 sm:px-6 lg:px-8'>
				<h1 className='mb-8 text-center text-4xl font-bold text-gray-900 dark:text-white'>
					{t('watchParty.menu.title')}
				</h1>
				<p className='mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400'>
					{t('watchParty.menu.subtitle')}
				</p>

				<div className='mb-16 flex flex-col justify-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8'>
					<Link
						to='/watch-party/create'
						className='w-full transform rounded-lg bg-purple-600 px-6 py-4 text-center text-lg font-bold text-white shadow-lg transition-colors hover:scale-105 hover:bg-purple-700 sm:w-64'
					>
						{t('watchParty.menu.createRoomButton')}
					</Link>
					<Link
						to='/watch-party/join'
						className='w-full transform rounded-lg border-2 border-purple-600 px-6 py-4 text-center text-lg font-bold text-purple-600 shadow-lg transition-colors hover:scale-105 hover:bg-purple-50 sm:w-64 dark:hover:bg-purple-500/10'
					>
						{t('watchParty.menu.joinRoomButton')}
					</Link>
				</div>

				<div className='mx-auto max-w-4xl'>
					<h2 className='mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white'>
						{t('watchParty.menu.featuresTitle')}
					</h2>

					<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
						<div className='rounded-lg bg-gray-50 p-6 text-center dark:bg-zinc-800'>
							<div className='mb-4 flex justify-center'>
								<div className='rounded-full bg-purple-100 p-3 dark:bg-purple-500/10'>
									<Clock className='h-8 w-8 text-purple-600 dark:text-purple-400' />
								</div>
							</div>
							<h3 className='mb-2 text-lg font-bold text-gray-900 dark:text-white'>
								{t('watchParty.menu.syncPlayingTitle')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('watchParty.menu.syncPlayingDesc')}
							</p>
						</div>

						<div className='rounded-lg bg-gray-50 p-6 text-center dark:bg-zinc-800'>
							<div className='mb-4 flex justify-center'>
								<div className='rounded-full bg-purple-100 p-3 dark:bg-purple-500/10'>
									<MessageCircle className='h-8 w-8 text-purple-600 dark:text-purple-400' />
								</div>
							</div>
							<h3 className='mb-2 text-lg font-bold text-gray-900 dark:text-white'>
								{t('watchParty.menu.realtimeChatTitle')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('watchParty.menu.realtimeChatDesc')}
							</p>
						</div>

						<div className='rounded-lg bg-gray-50 p-6 text-center dark:bg-zinc-800'>
							<div className='mb-4 flex justify-center'>
								<div className='rounded-full bg-purple-100 p-3 dark:bg-purple-500/10'>
									<Share className='h-8 w-8 text-purple-600 dark:text-purple-400' />
								</div>
							</div>
							<h3 className='mb-2 text-lg font-bold text-gray-900 dark:text-white'>
								{t('watchParty.menu.easySharingTitle')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('watchParty.menu.easySharingDesc')}
							</p>
						</div>

						<div className='rounded-lg bg-gray-50 p-6 text-center dark:bg-zinc-800'>
							<div className='mb-4 flex justify-center'>
								<div className='rounded-full bg-purple-100 p-3 dark:bg-purple-500/10'>
									<Users className='h-8 w-8 text-purple-600 dark:text-purple-400' />
								</div>
							</div>
							<h3 className='mb-2 text-lg font-bold text-gray-900 dark:text-white'>
								{t('watchParty.menu.groupWatchingTitle')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('watchParty.menu.groupWatchingDesc')}
							</p>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default WatchPartyMenuPage
