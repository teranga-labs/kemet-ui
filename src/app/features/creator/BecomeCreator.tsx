import baobabs from '/images/banners/baobabs.jpg'
import logoWhite from '/images/misc/KEMET White Bigger.png'
import {
	BarChart,
	Check,
	Loader2,
	PartyPopper,
	Sparkles,
	UploadCloud,
	Users
} from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Footer from '../../components/layout/Footer.tsx'
import { ThemeContext } from '../../contexts/ThemeContext.ts'
import { useAuth } from '../../hooks/useAuth.ts'

const creatorBenefits = [
	{
		icon: UploadCloud,
		text: 'Upload and share your unique content with the world.'
	},
	{
		icon: Sparkles,
		text: 'Monetize your videos and earn from your passion.'
	},
	{
		icon: Users,
		text: 'Build a community and connect with a global audience.'
	},
	{
		icon: BarChart,
		text: 'Access detailed analytics to track your content performance.'
	}
]

function BecomeCreator() {
	const { user, login } = useAuth()
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const themeContext = useContext(ThemeContext)
	if (!themeContext) {
		throw new Error('Page must be used within a ThemeProvider')
	}
	const { theme } = themeContext
	const currentLogo = theme === 'dark' ? logoWhite : logoWhite

	const handleRequestUpgrade = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			if (user) {
				const updatedUser = { ...user, role: 'creator' as const }
				login(updatedUser)
			}
			setIsLoading(false)
			setIsSuccess(true)
		}, 2000)
	}

	if (user && user.role !== 'viewer') {
		return (
			<div className='relative flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center dark:bg-zinc-900'>
				<PartyPopper size={48} className='mb-4 text-purple-500' />
				<h1 className='text-2xl font-bold text-black sm:text-3xl dark:text-white'>
					You're Already a Creator!
				</h1>
				<p className='mt-2 text-gray-800 dark:text-gray-300'>
					You can start uploading and managing your content now.
				</p>
				<Link
					to='/creator'
					className='mt-6 rounded-lg bg-purple-600 px-6 py-2 font-bold text-white transition-colors hover:bg-purple-700'
				>
					Go to Creator Dashboard
				</Link>
			</div>
		)
	}

	return (
		<div className='relative flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<div className='relative flex-grow'>
				<div
					className='absolute inset-0 z-0 bg-cover bg-center'
					style={{ backgroundImage: `url(${baobabs})` }}
				/>
				<div className='absolute inset-0 z-0 bg-black/70'></div>

				<nav className='relative z-10 w-full p-4 sm:p-6'>
					<Link to='/' className='flex items-center space-x-3'>
						<img src={currentLogo} alt='logo' width='64' height='64' />
					</Link>
				</nav>

				<div className='relative z-10 flex flex-grow items-center justify-center p-4'>
					<div className='mb-6 w-full max-w-2xl rounded-lg border border-gray-300 bg-white p-6 text-center shadow-lg backdrop-blur-sm sm:p-10 dark:border-zinc-700 dark:bg-zinc-950'>
						{isSuccess ? (
							<div>
								<PartyPopper
									size={48}
									className='mx-auto mb-4 animate-bounce text-purple-500'
								/>
								<h1 className='text-2xl font-bold text-black sm:text-3xl dark:text-white'>
									Congratulations!
								</h1>
								<p className='mt-2 text-sm text-gray-800 sm:text-base dark:text-gray-300'>
									Your request has been approved. You are now a Creator.
								</p>
								<button
									onClick={() => navigate('/creator')}
									className='mt-8 w-full rounded-lg bg-purple-600 px-6 py-3 font-bold text-white transition-colors hover:bg-purple-700 sm:w-auto'
								>
									Go to Your Creator Dashboard
								</button>
							</div>
						) : (
							<>
								<Sparkles
									size={40}
									className='mx-auto mb-4 text-purple-500 dark:text-purple-400'
								/>
								<h1 className='text-2xl font-bold text-black sm:text-4xl dark:text-white'>
									Become a Creator
								</h1>
								<p className='mx-auto mt-3 max-w-lg text-sm text-gray-800 sm:text-base dark:text-gray-300'>
									Unleash your creativity and share your stories with a
									passionate community. Apply to become a creator on our
									platform today.
								</p>

								<div className='my-8 space-y-4 text-left'>
									{creatorBenefits.map((item, index) => (
										<div key={index} className='flex items-start space-x-3'>
											<div className='mt-1 flex-shrink-0'>
												<Check size={20} className='text-green-500' />
											</div>
											<p className='text-gray-900 dark:text-gray-200'>
												{item.text}
											</p>
										</div>
									))}
								</div>

								<div className='mb-6 text-xs text-gray-600 dark:text-gray-400'>
									<p>
										By clicking "Send Request", you agree to our Content Creator
										Terms of Service.
									</p>
								</div>

								<button
									onClick={handleRequestUpgrade}
									disabled={isLoading}
									className='w-full rounded-lg bg-purple-600 px-8 py-3 text-base font-bold text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-400 sm:w-auto'
								>
									{isLoading ? (
										<span className='flex items-center justify-center'>
											<Loader2 size={20} className='mr-2 animate-spin' />
											Processing...
										</span>
									) : (
										'Send Request'
									)}
								</button>
							</>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default BecomeCreator
