import { BadgeCheck, Calendar, Tv } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
	{
		icon: <Tv className='mx-auto mb-4 h-10 w-10 text-purple-400' />,
		title: 'Daily Plan',
		priceFCFA: '300',
		priceUSD: '0.54',
		period: 'per day'
	},
	{
		icon: <Calendar className='mx-auto mb-4 h-10 w-10 text-purple-400' />,
		title: 'Weely Plan',
		priceFCFA: '1500',
		priceUSD: '2.71',
		period: 'per week'
	},
	{
		icon: <BadgeCheck className='mx-auto mb-4 h-10 w-10 text-purple-400' />,
		title: 'Monthly Plan',
		priceFCFA: '4800',
		priceUSD: '8.66',
		period: 'per month'
	}
]

function OurPlans() {
	return (
		<div className='mb-12 px-4 sm:px-6 lg:px-8'>
			<div className='mb-8'>
				<h2 className='text-3xl font-bold text-gray-900'>Choose Your Plan</h2>
			</div>

			<div className='flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-8'>
				{plans.map((plan) => (
					<div
						key={plan.title}
						className='flex w-64 flex-col rounded-md bg-black p-4 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:w-72 sm:p-6 md:p-8'
					>
						{plan.icon}
						<h2 className='mb-2 text-xl font-bold text-white'>{plan.title}</h2>
						<p className='mb-2 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl'>
							<span className='align-top text-xs font-normal'>FCFA</span>
							{plan.priceFCFA}
						</p>
						<p className='mb-4 text-xs text-white sm:text-sm'>
							or <span className='font-medium'>${plan.priceUSD}</span> in US
							currency
						</p>
						<p className='mb-4 text-xs text-white sm:mb-6 sm:text-sm'>
							{plan.period}
						</p>
						<Link
							to={`/payment-options?plan=${encodeURIComponent(plan.title)}&price=${plan.priceFCFA}`}
							className='mt-auto block w-full rounded-sm bg-purple-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-purple-700'
						>
							SUBSCRIBE
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}

export default OurPlans
