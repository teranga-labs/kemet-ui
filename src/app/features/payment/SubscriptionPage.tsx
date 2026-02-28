import baobabs from '/images/banners/baobabs.jpg'
import logo from '/images/misc/logo.png'
import { BadgeCheck, Calendar, Tv } from 'lucide-react'
import { Link } from 'react-router-dom'

import Footer from '../../components/layout/Footer.tsx'
import { useAuth } from '../../hooks/useAuth.ts'

const plans = [
	{
		icon: <Tv className='mx-auto mb-4 h-10 w-10 text-purple-700' />,
		title: 'Daily Plan',
		priceFCFA: '600',
		priceUSD: '0.99',
		period: 'per day'
	},
	{
		icon: <Calendar className='mx-auto mb-4 h-10 w-10 text-purple-700' />,
		title: 'Weekly Plan',
		priceFCFA: '2500',
		priceUSD: '3.99',
		period: 'per week'
	},
	{
		icon: <BadgeCheck className='mx-auto mb-4 h-10 w-10 text-purple-700' />,
		title: 'Monthly Plan',
		priceFCFA: '7000',
		priceUSD: '11.99',
		period: 'per month'
	}
]

function SubscriptionPage() {
	const { user } = useAuth()
	const currentPlan = user?.subscriptionPlan

	const getPlanTitleFromKey = (planKey: string | null | undefined): string => {
		if (!planKey) return ''

		const planMap: Record<string, string> = {
			daily: 'Daily Plan',
			weekly: 'Weekly Plan',
			monthly: 'Monthly Plan'
		}

		return planMap[planKey] || planKey
	}

	return (
		<div className='relative flex min-h-screen flex-col'>
			{/* Background Section */}
			<div className='relative flex-grow'>
				<div
					className='absolute inset-0 z-0 bg-cover bg-center'
					style={{ backgroundImage: `url(${baobabs})` }}
				/>
				<div className='absolute inset-0 z-0 bg-black/70'></div>

				{/* Navbar */}
				<nav className='relative z-10 w-full p-4 sm:p-6'>
					<Link to='/' className='flex items-center space-x-3'>
						<img src={logo} alt='logo' width='50' height='50' />
					</Link>
				</nav>

				{/* Main Content */}
				<div className='relative z-10 flex flex-grow items-center justify-center p-4'>
					<div className='w-full max-w-5xl'>
						{/* Header */}
						<div className='mb-8 text-center sm:mb-12'>
							<p className='text-xs tracking-widest text-gray-300 sm:text-sm'>
								CINEMA WITHOUT BORDERS
							</p>
							<h1 className='mt-2 text-3xl font-bold text-white sm:text-5xl'>
								{currentPlan ? 'Manage Your Subscription' : 'Join Our Journey!'}
							</h1>
						</div>

						{/* Plans */}
						<div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3'>
							{plans.map((plan) => {
								// Use the mapping function for comparison
								const isCurrentPlan =
									plan.title === getPlanTitleFromKey(currentPlan)

								return (
									<div
										key={plan.title}
										className={`relative flex flex-col rounded-sm border bg-white p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 sm:p-8 ${
											isCurrentPlan
												? 'border-2 border-purple-700'
												: 'border-gray-700 hover:border-purple-700'
										}`}
									>
										{isCurrentPlan && (
											<div className='absolute top-0 right-0 rounded-tr-sm rounded-bl-sm bg-purple-700 px-3 py-1 text-xs font-bold text-white'>
												CURRENT PLAN
											</div>
										)}

										{plan.icon}
										<h2 className='mb-2 text-xl font-bold text-black sm:text-2xl'>
											{plan.title}
										</h2>
										<p className='mb-2 text-4xl font-extrabold text-black sm:text-5xl'>
											<span className='align-top text-xs font-normal sm:text-sm'>
												FCFA
											</span>
											{plan.priceFCFA}
										</p>
										<p className='mb-4 text-xs text-black sm:mb-6 sm:text-sm'>
											or <span className='font-medium'>${plan.priceUSD}</span>{' '}
											in US currency
										</p>
										<p className='mb-6 text-sm text-black sm:mb-8'>
											{plan.period}
										</p>

										{/* Conditional rendering for the button */}
										{isCurrentPlan ? (
											<button
												disabled
												className='mt-auto block w-full cursor-not-allowed rounded-sm bg-gray-400 px-4 py-2 font-bold text-white sm:py-3'
											>
												Currently Active
											</button>
										) : (
											<Link
												to={`/payment-options?plan=${encodeURIComponent(
													plan.title
												)}&price=${plan.priceFCFA}`}
												className='mt-auto block w-full rounded-sm bg-purple-700 px-4 py-2 text-sm font-bold text-white transition-colors hover:scale-105 sm:py-3 sm:text-base'
											>
												{currentPlan ? 'Switch Plan' : 'SUBSCRIBE'}
											</Link>
										)}
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<Footer />
		</div>
	)
}

export default SubscriptionPage
