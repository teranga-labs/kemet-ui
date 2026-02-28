import baobabs from '/images/banners/baobabs.jpg'
import logoBlack from '/images/misc/KEMET Black Bigger.png'
import logoWhite from '/images/misc/KEMET White Bigger.png'
import {
	ChevronLeft,
	CreditCard,
	Globe,
	Lock,
	Mail,
	Smartphone
} from 'lucide-react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Footer from '../../components/layout/Footer.tsx'
import { ThemeContext } from '../../contexts/ThemeContext.ts'
import { useAuth } from '../../hooks/useAuth.ts'
import { useSubscription } from '../../hooks/useSubscription.ts'

function AccountSettingsPage() {
	const navigate = useNavigate()
	const { user, logout } = useAuth()
	const { currentPlan } = useSubscription()

	const themeContext = useContext(ThemeContext)
	if (!themeContext)
		throw new Error('Header must be used within a ThemeProvider')
	const { theme } = themeContext

	const currentLogo = theme === 'dark' ? logoWhite : logoBlack

	const handleSignOut = () => {
		logout()
		navigate('/signin')
	}

	const navigateToPayment = () => {
		navigate('/payment-flow')
	}

	const staticAccountInfo = {
		phone: '+221 77 123 45 67',
		paymentMethod: 'Visa **** 4242',
		language: 'English',
		region: 'Senegal/Dakar'
	}

	if (!user) {
		return (
			<div className='flex min-h-screen items-center justify-center bg-white text-black dark:bg-zinc-900 dark:text-white'>
				Loading...
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
					<Link to='/profiles' className='flex items-center space-x-3'>
						<img src={currentLogo} alt='logo' width='64' height='64' />
					</Link>
				</nav>
				<div className='relative z-10 flex flex-grow flex-col items-center justify-center p-4'>
					<div className='mb-6 w-full max-w-2xl rounded-lg border border-gray-200 bg-white/95 p-6 shadow-lg backdrop-blur-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/90'>
						<Link
							to='/profiles'
							className='mb-6 flex items-center font-medium text-gray-800 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400'
						>
							<ChevronLeft size={20} className='mr-1' />
							<span>Back to profiles</span>
						</Link>
						<div className='mb-8 text-center'>
							<h1 className='mb-2 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white'>
								Account Settings
							</h1>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								Manage your account details and preferences
							</p>
						</div>
						<div className='space-y-4'>
							<div className='rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-zinc-700 dark:bg-zinc-800'>
								<div className='mb-2 flex items-center'>
									<Mail className='mr-3 h-5 w-5 text-purple-700 dark:text-purple-400' />
									<h3 className='font-medium text-gray-900 dark:text-white'>
										Email Address
									</h3>
								</div>
								<p className='pl-8 text-sm text-gray-700 dark:text-gray-300'>
									{user.email}
								</p>
								<button className='mt-2 pl-8 text-sm text-purple-700 hover:underline dark:text-purple-400'>
									Change email
								</button>
							</div>
							<div className='rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-zinc-700 dark:bg-zinc-800'>
								<div className='mb-2 flex items-center'>
									<Lock className='mr-3 h-5 w-5 text-purple-700 dark:text-purple-400' />
									<h3 className='font-medium text-gray-900 dark:text-white'>
										Password
									</h3>
								</div>
								<p className='pl-8 text-sm text-gray-700 dark:text-gray-300'>
									•••••••••••
								</p>
								<button className='mt-2 pl-8 text-sm text-purple-700 hover:underline dark:text-purple-400'>
									Change password
								</button>
							</div>
							<div className='rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-zinc-700 dark:bg-zinc-800'>
								<div className='mb-2 flex items-center'>
									<Smartphone className='mr-3 h-5 w-5 text-purple-700 dark:text-purple-400' />
									<h3 className='font-medium text-gray-900 dark:text-white'>
										Phone Number
									</h3>
								</div>
								<p className='pl-8 text-sm text-gray-700 dark:text-gray-300'>
									{staticAccountInfo.phone}
								</p>
								<button className='mt-2 pl-8 text-sm text-purple-700 hover:underline dark:text-purple-400'>
									Change phone number
								</button>
							</div>
							<div className='rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-zinc-700 dark:bg-zinc-800'>
								<div className='mb-2 flex items-center'>
									<CreditCard className='mr-3 h-5 w-5 text-purple-700 dark:text-purple-400' />
									<h3 className='font-medium text-gray-900 dark:text-white'>
										Subscription
									</h3>
								</div>
								<div className='flex items-center justify-between pl-8'>
									<div>
										<p className='text-sm text-gray-700 dark:text-gray-300'>
											Plan:{' '}
											<span className='font-medium capitalize'>
												{currentPlan || 'Free'}
											</span>
										</p>
										<p className='text-sm text-gray-700 dark:text-gray-300'>
											Payment: {staticAccountInfo.paymentMethod}
										</p>
									</div>
									<button
										onClick={navigateToPayment}
										className='text-sm text-purple-700 hover:underline dark:text-purple-400'
									>
										Manage
									</button>
								</div>
							</div>
							<div className='rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-zinc-700 dark:bg-zinc-800'>
								<div className='mb-2 flex items-center'>
									<Globe className='mr-3 h-5 w-5 text-purple-700 dark:text-purple-400' />
									<h3 className='font-medium text-gray-900 dark:text-white'>
										Language & Region
									</h3>
								</div>
								<div className='flex items-center justify-between pl-8'>
									<div>
										<p className='text-sm text-gray-700 dark:text-gray-300'>
											Language:{' '}
											<span className='font-medium'>
												{staticAccountInfo.language}
											</span>
										</p>
										<p className='text-sm text-gray-700 dark:text-gray-300'>
											Region:{' '}
											<span className='font-medium'>
												{staticAccountInfo.region}
											</span>
										</p>
									</div>
									<button className='text-sm text-purple-700 hover:underline dark:text-purple-400'>
										Change
									</button>
								</div>
							</div>
							<div className='border-t border-gray-200 pt-4 dark:border-zinc-700'>
								<button
									onClick={handleSignOut}
									className='w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 font-medium text-red-500 transition-colors hover:border-red-500 hover:bg-red-500/10 dark:border-zinc-600'
								>
									Sign Out of All Devices
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default AccountSettingsPage
