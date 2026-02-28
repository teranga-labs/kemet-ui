import { MessageSquare } from 'lucide-react'
import { useEffect } from 'react'

import Footer from '../../components/layout/Footer.tsx'
import Header from '../../components/layout/Header.tsx'

function SupportChatPage() {
	useEffect(() => {
		const timer = setTimeout(() => {
			alert('In a real application, a support chat window would open here.')
		}, 1000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			{/* 4. ADD the reusable Header component */}
			<Header />

			<main className='flex flex-grow flex-col items-center justify-center p-4 pt-24 text-center'>
				<div className='relative mb-6 flex items-center justify-center'>
					<MessageSquare className='h-16 w-16 text-purple-600 dark:text-purple-500' />
					<span className='absolute top-0 right-0 flex h-4 w-4'>
						<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75'></span>
						<span className='relative inline-flex h-4 w-4 rounded-full bg-purple-500'></span>
					</span>
				</div>
				<h1 className='mb-4 text-4xl font-bold text-zinc-900 dark:text-white'>
					Connecting to Support...
				</h1>
				<p className='text-xl text-zinc-500 dark:text-gray-400'>
					The chat window will open shortly.
				</p>
			</main>
			<Footer />
		</div>
	)
}

export default SupportChatPage
