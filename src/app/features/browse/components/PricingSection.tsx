import baobabs from '/images/banners/baobabs.jpg'
import kemetHand from '/images/icons/KW-Hand-1.webp'
import kemetPlayMac from '/images/icons/KW-Play-Mac-1.webp'
import kemetPremium from '/images/icons/KW-Premium-1.webp'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const plans = [
	{
		icon: <img src={kemetHand} width={80} height={80} alt='KemetHand' />,
		titleKey: 'pricing.dailyPlan.title',
		priceFCFA: '300',
		priceUSD: '0.54',
		periodKey: 'pricing.dailyPlan.period'
	},
	{
		icon: <img src={kemetPlayMac} width={80} height={80} alt='KemetHand' />,
		titleKey: 'pricing.weeklyPlan.title',
		priceFCFA: '1500',
		priceUSD: '2.71',
		periodKey: 'pricing.weeklyPlan.period'
	},
	{
		icon: <img src={kemetPremium} width={80} height={80} alt='KemetHand' />,
		titleKey: 'pricing.monthlyBundle.title',
		priceFCFA: '4800',
		priceUSD: '8.66',
		periodKey: 'pricing.monthlyBundle.period'
	}
]

const PricingCard = ({ plan }: { plan: (typeof plans)[0] }) => {
	const { t } = useTranslation()

	return (
		<div className='mx-auto flex w-full max-w-xs flex-col rounded-sm bg-white p-6 text-center shadow-2xl sm:p-8 md:max-w-none'>
			<div className='mb-1 flex justify-center'>{plan.icon}</div>
			<h3 className='text-xl font-bold text-zinc-800'>{t(plan.titleKey)}</h3>
			<div className='my-3'>
				<span className='text-5xl font-extrabold text-black'>
					{plan.priceFCFA}
				</span>
				<span className='text-2xl font-bold text-zinc-700'>
					{' '}
					{t('pricing.currencyFCFA')}
				</span>
				<p className='text-sm font-medium text-zinc-600'>{t(plan.periodKey)}</p>
			</div>
			<p className='mb-4 text-sm font-bold text-zinc-800 sm:mb-6'>
				{t('pricing.orInUSD', { priceUSD: plan.priceUSD })}
			</p>
			<Link to='/payment-flow' className='mt-auto'>
				<button className='w-full rounded-sm bg-purple-700 px-6 py-4 text-base font-bold text-white transition-colors hover:bg-purple-800 sm:py-4 sm:text-base'>
					{t('pricing.subscribeButton')}
				</button>
			</Link>
		</div>
	)
}

function PricingSection() {
	const { t } = useTranslation()

	return (
		<section className='relative min-h-1/2 bg-zinc-800 py-20 text-white'>
			<div className='absolute inset-0'>
				<img
					src={baobabs}
					alt='Baobab trees'
					className='h-full w-full object-cover opacity-30 grayscale filter'
				/>
				<div className='absolute inset-0 bg-black/40'></div>
			</div>

			<div className='relative container mx-auto mb-8 px-4 text-center'>
				<p className='text-sm font-bold tracking-widest text-zinc-300 uppercase'>
					{t('pricingSection.tagline')}
				</p>
				<h2 className='mt-2 mb-12 text-4xl font-extrabold text-white md:text-5xl'>
					{t('pricingSection.title')}
				</h2>
				<div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3'>
					{plans.map((plan, index) => (
						<PricingCard key={index} plan={plan} />
					))}
				</div>
			</div>
		</section>
	)
}

export default PricingSection
