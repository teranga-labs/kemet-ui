import baobabs from '/images/banners/baobabs.jpg'
import logo from '/images/misc/logo.png'
import { ChevronRight, CreditCard, Smartphone } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import Footer from '../../components/layout/Footer.tsx'

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

function PaymentOptionsPage() {
	const query = useQuery()
	const planTitle = query.get('plan') || 'Selected Plan'
	const price = query.get('price') || '0'

	const paymentOptions = [
		{
			name: 'Orange Money',
			icon: 'https://placehold.co/40x40/FF7900/000000?text=OM',
			bgColor: 'bg-orange-500',
			textColor: 'text-white'
		},
		{
			name: 'Wave',
			icon: 'https://placehold.co/40x40/00A9E0/000000?text=W',
			bgColor: 'bg-blue-500',
			textColor: 'text-white'
		},
		{
			name: 'Yas',
			icon: 'https://placehold.co/40x40/FFD700/000000?text=Y',
			bgColor: 'bg-yellow-400',
			textColor: 'text-black'
		}
	]

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
					<div className='mb-6 w-full max-w-lg rounded-sm border border-gray-700 bg-white p-6 shadow-lg backdrop-blur-sm sm:p-10'>
						<div className='mb-6 text-center sm:mb-8'>
							<h1 className='text-2xl font-bold text-black sm:text-3xl'>
								Choose Payment Method
							</h1>
							<p className='mt-2 text-sm text-black sm:text-base'>
								You are subscribing to the{' '}
								<span className='font-bold text-purple-700'>{planTitle}</span>{' '}
								for{' '}
								<span className='font-bold text-purple-700'>FCFA {price}</span>.
							</p>
						</div>

						<div className='space-y-4 sm:space-y-6'>
							{/* Mobile Money Section */}
							<div>
								<h2 className='mb-3 flex items-center text-lg font-semibold text-black'>
									<Smartphone className='mr-2 h-5 w-5 text-purple-700' /> Mobile
									Money
								</h2>
								<div className='rounded-sm border border-gray-200 bg-white'>
									{paymentOptions.map((option, index) => (
										<Link
											to={`/payment-details?plan=${planTitle}&price=${price}&method=${option.name}`}
											key={option.name}
											className={`flex items-center justify-between p-3 transition-colors hover:scale-105 sm:p-4 ${index < paymentOptions.length - 1 ? 'border-b border-gray-100' : ''}`}
										>
											<div className='flex items-center'>
												<img
													src={option.icon}
													alt={option.name}
													className='mr-3 h-8 w-8 rounded-full sm:mr-4'
												/>
												<span className='font-medium text-black'>
													{option.name}
												</span>
											</div>
											<ChevronRight className='h-5 w-5 text-black' />
										</Link>
									))}
								</div>
							</div>

							{/* Credit Card Section */}
							<div>
								<h2 className='mb-3 flex items-center text-lg font-semibold text-black'>
									<CreditCard className='mr-2 h-5 w-5 text-purple-700' /> Credit
									Card
								</h2>
								<Link
									to={`/payment-details?plan=${planTitle}&price=${price}&method=Credit+Card`}
									className='flex items-center justify-between rounded-sm border border-gray-200 bg-white p-3 transition-colors hover:scale-105 sm:p-4'
								>
									<span className='font-medium text-black'>
										Pay with Visa or Mastercard
									</span>
									<ChevronRight className='h-5 w-5 text-black' />
								</Link>
							</div>
						</div>

						<div className='mt-6 text-center sm:mt-8'>
							<Link
								to='/subscribe'
								className='text-sm text-purple-700 hover:underline'
							>
								&larr; Back to plans
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<Footer />
		</div>
	)
}

export default PaymentOptionsPage
