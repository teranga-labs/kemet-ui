import { Film } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Footer from '../../components/layout/Footer.tsx'
import Header from '../../components/layout/Header.tsx'

function AccountPage() {
	const navigate = useNavigate()

	useEffect(() => {
		const isAuthenticated = true
		setTimeout(() => {
			if (!isAuthenticated) {
				navigate('/signin')
			} else {
				navigate('/profiles')
			}
		}, 1500)
	}, [navigate])

	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />

			<main className='flex flex-grow flex-col items-center justify-center p-4 pt-24 text-center'>
				<Film className='mb-6 h-16 w-16 animate-spin text-purple-600 dark:text-purple-500' />
				<h1 className='mb-4 text-4xl font-bold text-zinc-900 dark:text-white'>
					Redirecting to Your Account...
				</h1>
				<p className='text-xl text-zinc-500 dark:text-gray-400'>Please wait.</p>
			</main>
			<Footer />
		</div>
	)
}

export default AccountPage
