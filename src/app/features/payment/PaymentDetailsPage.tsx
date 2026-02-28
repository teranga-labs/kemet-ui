import baobabs from '/images/banners/baobabs.jpg'
import logo from '/images/misc/logo.png'
import { Calendar, Lock, Phone, User } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Footer from '../../components/layout/Footer.tsx'

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

const formatCardNumber = (value: string) => {
	const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
	const matches = v.match(/\d{4,16}/g)
	const match = (matches && matches[0]) || ''
	const parts = []
	for (let i = 0, len = match.length; i < len; i += 4) {
		parts.push(match.substring(i, i + 4))
	}
	if (parts.length) {
		return parts.join(' ')
	}
	return value
}

function PaymentDetailsPage() {
	const query = useQuery()
	const planTitle = query.get('plan') || 'Selected Plan'
	const price = query.get('price') || '0'
	const method = query.get('method') || 'Payment Method'

	const isCreditCard = method === 'Credit Card'

	// State for form inputs
	const [cardNumber, setCardNumber] = useState('')
	const [cardHolder, setCardHolder] = useState('')
	const [expiryDate, setExpiryDate] = useState('')
	const [cvv, setCvv] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	// Check if all required fields are filled
	const isFormComplete = () => {
		if (isCreditCard) {
			return (
				cardNumber.trim() &&
				cardHolder.trim() &&
				expiryDate.trim() &&
				cvv.trim()
			)
		} else {
			return phoneNumber.trim()
		}
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
					<div className='mb-6 w-full max-w-lg overflow-hidden rounded-sm border border-gray-200 bg-white shadow-lg backdrop-blur-sm'>
						{/* Card Header */}
						<div className='border-b border-gray-200 p-6'>
							<h1 className='text-center text-2xl font-bold text-black sm:text-3xl'>
								Payment Details
							</h1>
							<p className='mt-2 text-center text-sm text-black sm:text-base'>
								Paying{' '}
								<span className='font-medium text-purple-700'>
									{price} FCFA
								</span>{' '}
								for{' '}
								<span className='font-medium text-purple-700'>{planTitle}</span>
							</p>
							<div className='mt-4 flex justify-center'>
								<span className='rounded-sm bg-purple-700 px-3 py-1 text-xs text-white sm:text-sm'>
									{method}
								</span>
							</div>
						</div>

						{/* Card Body */}
						<div className='p-6 sm:p-8'>
							{isCreditCard ? (
								// Credit Card Form
								<div className='space-y-4 sm:space-y-6'>
									<div>
										<label className='mb-2 block text-sm font-medium text-black'>
											Card Number
										</label>
										<div className='relative'>
											<input
												type='text'
												value={cardNumber}
												onChange={(e) =>
													setCardNumber(formatCardNumber(e.target.value))
												}
												className='w-full rounded-sm border border-gray-300 bg-white px-4 py-2 text-black focus:ring-2 focus:ring-purple-500 focus:outline-none sm:py-3'
												placeholder='0000 0000 0000 0000'
												required
											/>
										</div>
									</div>

									<div>
										<label className='mb-2 block text-sm font-medium text-black'>
											Card Holder
										</label>
										<div className='relative'>
											<User className='absolute top-3 left-3 h-5 w-5 text-black' />
											<input
												type='text'
												value={cardHolder}
												onChange={(e) => setCardHolder(e.target.value)}
												className='w-full rounded-sm border border-gray-300 bg-white py-2 pr-4 pl-10 text-black focus:ring-2 focus:ring-purple-500 focus:outline-none sm:py-3'
												placeholder='John Doe'
												required
											/>
										</div>
									</div>

									<div className='grid grid-cols-2 gap-4'>
										<div>
											<label className='mb-2 block text-sm font-medium text-black'>
												Expiry Date
											</label>
											<div className='relative'>
												<Calendar className='absolute top-3 left-3 h-5 w-5 text-black' />
												<input
													type='text'
													value={expiryDate}
													onChange={(e) => setExpiryDate(e.target.value)}
													className='w-full rounded-sm border border-gray-300 bg-white py-2 pr-4 pl-10 text-black focus:ring-2 focus:ring-purple-500 focus:outline-none sm:py-3'
													placeholder='MM/YY'
													required
												/>
											</div>
										</div>

										<div>
											<label className='mb-2 block text-sm font-medium text-black'>
												CVV
											</label>
											<div className='relative'>
												<Lock className='absolute top-3 left-3 h-5 w-5 text-black' />
												<input
													type='text'
													value={cvv}
													onChange={(e) => setCvv(e.target.value)}
													className='w-full rounded-sm border border-gray-300 bg-white py-2 pr-4 pl-10 text-black focus:ring-2 focus:ring-purple-500 focus:outline-none sm:py-3'
													placeholder='123'
													required
												/>
											</div>
										</div>
									</div>
								</div>
							) : (
								// Mobile Money Form
								<div className='space-y-4 sm:space-y-6'>
									<div>
										<label className='mb-2 block text-sm font-medium text-black'>
											Phone Number
										</label>
										<div className='relative'>
											<Phone className='absolute top-3 left-3 h-5 w-5 text-black' />
											<input
												type='tel'
												value={phoneNumber}
												onChange={(e) => setPhoneNumber(e.target.value)}
												className='w-full rounded-sm border border-gray-300 bg-white py-2 pr-4 pl-10 text-black focus:ring-2 focus:ring-purple-500 focus:outline-none sm:py-3'
												placeholder='77 123 45 67'
												required
											/>
										</div>
										<p className='mt-2 text-xs text-black'>
											You'll receive a payment prompt on your phone
										</p>
									</div>
								</div>
							)}

							<div className='mt-6 sm:mt-8'>
								<Link
									to={`/confirm-payment?plan=${planTitle}&price=${price}&method=${method}`}
									className={`block w-full rounded-sm px-4 py-2 text-center text-sm font-bold transition-colors sm:py-3 sm:text-base ${
										isFormComplete()
											? 'bg-purple-700 text-white hover:scale-105'
											: 'cursor-not-allowed bg-gray-400 text-gray-200'
									}`}
									onClick={(e) => !isFormComplete() && e.preventDefault()}
								>
									Confirm Payment
								</Link>
							</div>
						</div>

						{/* Card Footer */}
						<div className='border-t border-gray-200 p-4 text-center'>
							<Link
								to={`/payment-options?plan=${planTitle}&price=${price}`}
								className='text-sm text-purple-700 hover:underline'
							>
								← Back to payment options
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

export default PaymentDetailsPage
