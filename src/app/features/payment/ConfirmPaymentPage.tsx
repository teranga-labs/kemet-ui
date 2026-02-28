import baobabs from '/images/banners/baobabs.jpg'
import logo from '/images/misc/logo.png'
import { CheckCircle } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Footer from '../../components/layout/Footer.tsx'
import { useAuth } from '../../hooks/useAuth.ts'
import { useSubscription } from '../../hooks/useSubscription.ts'

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

const getPlanKeyFromTitle = (
	planTitle: string
): 'daily' | 'weekly' | 'monthly' | null => {
	const planMap: Record<string, 'daily' | 'weekly' | 'monthly'> = {
		'Daily Plan': 'daily',
		'Weekly Plan': 'weekly',
		'Monthly Plan': 'monthly'
	}

	return planMap[planTitle] || null
}

function ConfirmPaymentPage() {
	const query = useQuery()
	const planTitle = query.get('plan') || 'Selected Plan'
	const price = query.get('price') || '0'
	const method = query.get('method') || 'Selected Method'
	const navigate = useNavigate()
	const { subscribe } = useSubscription()
	const { user, updateUser } = useAuth()

	const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
	const inputRefs = useRef<(HTMLInputElement | null)[]>([])

	const handleChange = (element: HTMLInputElement, index: number) => {
		if (isNaN(Number(element.value))) return

		setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

		if (element.nextSibling && element.value) {
			;(element.nextSibling as HTMLInputElement).focus()
		}
	}

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === 'Backspace' && !otp[index] && inputRefs.current[index - 1]) {
			inputRefs.current[index - 1]?.focus()
		}
	}

	// Check if all OTP digits are filled
	const isOtpComplete = () => {
		return otp.every((digit) => digit.trim().length > 0)
	}

	const handleCompletePayment = () => {
		if (user && planTitle && isOtpComplete()) {
			const planKey = getPlanKeyFromTitle(planTitle)

			if (planKey) {
				subscribe(planKey)

				const updatedUser = {
					...user,
					subscriptionPlan: planKey
				}

				updateUser(updatedUser)

				navigate(
					`/payment-receipt?plan=${encodeURIComponent(planTitle)}&price=${encodeURIComponent(price)}&method=${encodeURIComponent(method)}`
				)
			} else {
				console.error('Invalid plan title:', planTitle)
			}
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
					<div className='mb-6 w-full max-w-lg overflow-hidden rounded-sm border border-gray-700 bg-white shadow-lg backdrop-blur-sm'>
						{/* Card Header */}
						<div className='border-b border-gray-200 p-6 text-center'>
							<CheckCircle className='mx-auto mb-4 h-16 w-16 text-green-500' />
							<h1 className='text-2xl font-bold text-black sm:text-3xl'>
								Confirm Payment
							</h1>
							<p className='mt-2 text-sm text-black sm:text-base'>
								Verify your <span className='text-purple-700'>{planTitle}</span>{' '}
								subscription
							</p>
						</div>

						{/* Card Body */}
						<div className='p-6 sm:p-8'>
							{/* Payment Summary */}
							<div className='mb-6 space-y-3 rounded-sm border border-gray-200 bg-white p-5'>
								<div className='flex justify-between'>
									<span className='text-black'>Plan:</span>
									<span className='font-medium text-black'>{planTitle}</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-black'>Method:</span>
									<span className='font-medium text-black'>{method}</span>
								</div>
								<div className='mt-3 flex justify-between border-t border-gray-700 pt-3'>
									<span className='text-black'>Amount:</span>
									<span className='text-xl font-bold text-purple-600'>
										FCFA {price}
									</span>
								</div>
							</div>

							{/* OTP Input */}
							<div className='mb-6'>
								<label className='mb-3 block text-sm text-black'>
									Enter 6-digit verification code
								</label>
								<div className='flex justify-center space-x-2'>
									{otp.map((data, index) => (
										<input
											key={index}
											type='text'
											maxLength={1}
											value={data}
											onChange={(e) => handleChange(e.target, index)}
											onKeyDown={(e) => handleKeyDown(e, index)}
											className='h-14 w-12 rounded-sm border border-gray-300 bg-white text-center text-2xl font-semibold text-black focus:ring-2 focus:ring-purple-500 focus:outline-none'
											ref={(el) => {
												inputRefs.current[index] = el
											}}
											required
										/>
									))}
								</div>
							</div>

							<button
								onClick={handleCompletePayment}
								disabled={!isOtpComplete()}
								className={`w-full rounded-sm px-4 py-2 text-sm font-bold text-white transition-colors sm:py-3 sm:text-base ${
									isOtpComplete()
										? 'bg-purple-700 hover:scale-105'
										: 'cursor-not-allowed bg-gray-400'
								}`}
							>
								Complete Payment
							</button>
						</div>

						{/* Card Footer */}
						<div className='border-t border-gray-200 p-4 text-center'>
							<Link
								to={`/payment-details?plan=${planTitle}&price=${price}&method=${method}`}
								className='text-sm text-purple-700 hover:underline'
							>
								← Back to payment details
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

export default ConfirmPaymentPage
