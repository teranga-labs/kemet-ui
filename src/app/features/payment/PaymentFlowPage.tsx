import baobabs from '/images/banners/baobabs.jpg'
import logoWhite from '/images/misc/KEMET White Bigger.png'
import orangeMoneyIcon from '/images/misc/orange-money.png'
import waveIcon from '/images/misc/wave.png'
import yasIcon from '/images/misc/yas.jpeg'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CreditCard, Smartphone } from 'lucide-react'
import React, { type ChangeEvent, useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Footer from '../../components/layout/Footer.tsx'
import { ThemeContext } from '../../contexts/ThemeContext.ts'
import { useAuth } from '../../hooks/useAuth.ts'
import { useSubscription } from '../../hooks/useSubscription.ts'

interface Plan {
	title: string
	priceFCFA: string
	priceUSD: string
	period: string
}

interface MobileMoneyOption {
	name: string
	icon: string
	initials: string
}

interface FormData {
	phoneNumber: string
}

const getPlanTitleFromKey = (planKey: string | null | undefined): string => {
	if (!planKey) return ''
	const planMap: Record<string, string> = {
		daily: 'Daily Plan',
		weekly: 'Weekly Plan',
		monthly: 'Monthly Plan'
	}
	return planMap[planKey] || planKey
}

function PaymentFlowPage() {
	const { subscribe } = useSubscription()
	const { user, updateUser } = useAuth()
	const navigate = useNavigate()
	const stripe = useStripe()
	const elements = useElements()

	const currentPlanKey = user?.subscriptionPlan
	const currentPlanTitle = getPlanTitleFromKey(currentPlanKey)

	const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
	const [activeTab, setActiveTab] = useState<'mobile' | 'creditCard'>('mobile')
	const [selectedMobileMethod, setSelectedMobileMethod] = useState<
		string | null
	>(null)
	const [formData, setFormData] = useState<FormData>({
		phoneNumber: ''
	})

	const [isProcessing, setIsProcessing] = useState(false)
	const [paymentError, setPaymentError] = useState<string | null>(null)

	const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
	const [showOtp, setShowOtp] = useState(false)
	const inputRefs = useRef<(HTMLInputElement | null)[]>([])

	const themeContext = useContext(ThemeContext)
	if (!themeContext) {
		throw new Error('SigninPage must be used within a ThemeProvider')
	}
	const { theme } = themeContext

	const currentLogo = theme === 'dark' ? logoWhite : logoWhite

	const plans: Plan[] = [
		{
			title: 'Daily Plan',
			priceFCFA: '600',
			priceUSD: '0.99',
			period: 'per day'
		},
		{
			title: 'Weekly Plan',
			priceFCFA: '2500',
			priceUSD: '3.99',
			period: 'per week'
		},
		{
			title: 'Monthly Plan',
			priceFCFA: '7000',
			priceUSD: '11.99',
			period: 'per month'
		}
	]

	const mobileMoneyOptions: MobileMoneyOption[] = [
		{ name: 'Orange Money', icon: orangeMoneyIcon, initials: 'OM' },
		{ name: 'Wave', icon: waveIcon, initials: 'W' },
		{ name: 'Mix by Yas', icon: yasIcon, initials: 'Y' }
	]

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleOtpChange = (element: HTMLInputElement, index: number) => {
		if (isNaN(Number(element.value))) return
		setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])
		if (element.nextSibling && element.value) {
			;(element.nextSibling as HTMLInputElement).focus()
		}
	}

	const handleOtpKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === 'Backspace' && !otp[index] && inputRefs.current[index - 1]) {
			inputRefs.current[index - 1]?.focus()
		}
	}

	const getPlanKeyFromTitle = (
		planTitle: string
	): 'daily' | 'weekly' | 'monthly' => {
		const planMap: Record<string, 'daily' | 'weekly' | 'monthly'> = {
			'Daily Plan': 'daily',
			'Weekly Plan': 'weekly',
			'Monthly Plan': 'monthly'
		}
		return planMap[planTitle] || 'daily'
	}

	const handlePaymentSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setPaymentError(null)
		setIsProcessing(true)

		if (!selectedPlan) {
			alert('Please select a subscription plan.')
			setIsProcessing(false)
			return
		}

		if (activeTab === 'mobile') {
			if (!selectedMobileMethod || !formData.phoneNumber.trim()) {
				alert('Please complete your mobile money information.')
				setIsProcessing(false)
				return
			}

			if (!showOtp) {
				setShowOtp(true)
				setIsProcessing(false)
				return
			}
			console.log('Mock Success! Mobile Money OTP confirmed:', otp.join(''))

			if (user && user.id) {
				const planKey = getPlanKeyFromTitle(selectedPlan.title)
				subscribe(planKey)

				const updatedUser = { ...user, subscriptionPlan: planKey }
				updateUser(updatedUser)

				navigate(
					`/payment-receipt?plan=${encodeURIComponent(
						selectedPlan.title
					)}&price=${encodeURIComponent(
						selectedPlan.priceFCFA
					)}&method=${encodeURIComponent(selectedMobileMethod)} (Mock)`
				)
			} else {
				setPaymentError(
					'Cannot complete subscription: User is not logged in properly.'
				)
			}
			setIsProcessing(false)
			return
		}

		if (activeTab === 'creditCard') {
			if (!stripe || !elements) {
				setIsProcessing(false)
				return
			}

			const cardElement = elements.getElement(CardElement)
			if (!cardElement) {
				setIsProcessing(false)
				return
			}

			const { error, paymentMethod } = await stripe.createPaymentMethod({
				type: 'card',
				card: cardElement
			})

			if (error) {
				setPaymentError(error.message ?? 'An unexpected error occurred.')
				setIsProcessing(false)
				return
			}

			console.log('Mock Success! Stripe PaymentMethod created:', paymentMethod)

			if (user && user.id) {
				const planKey = getPlanKeyFromTitle(selectedPlan.title)
				subscribe(planKey)

				const updatedUser = { ...user, subscriptionPlan: planKey }
				updateUser(updatedUser)

				navigate(
					`/payment-receipt?plan=${encodeURIComponent(
						selectedPlan.title
					)}&price=${encodeURIComponent(
						selectedPlan.priceFCFA
					)}&method=Credit Card (Mock)`
				)
			} else {
				setPaymentError(
					'Cannot complete subscription: User is not logged in properly.'
				)
			}
			setIsProcessing(false)
		}
	}

	const isOtpComplete = () => {
		return otp.every((digit) => digit.trim().length > 0)
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
						<img src={currentLogo} alt='KEMET Logo' className='h-16 w-auto' />
					</Link>
				</nav>

				<div className='relative z-10 flex flex-grow items-center justify-center p-4'>
					<div className='w-full max-w-2xl rounded-lg border border-gray-300 bg-white/95 p-6 shadow-lg backdrop-blur-sm sm:p-8 dark:border-zinc-700 dark:bg-black/80'>
						<div className='mb-8 text-center'>
							<h1 className='text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white'>
								Subscribe to KEMET
							</h1>
							<p className='mt-2 text-sm text-gray-700 sm:text-base dark:text-gray-300'>
								Choose your plan and pay securely.
							</p>
						</div>

						<form onSubmit={handlePaymentSubmit}>
							<div className='mb-8'>
								<h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-white'>
									1. Select Your Plan
								</h2>
								<div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
									{plans.map((plan) => {
										const isCurrentPlan = plan.title === currentPlanTitle
										const isSelectedPlan = selectedPlan?.title === plan.title
										return (
											<label
												key={plan.title}
												className={`relative flex cursor-pointer flex-col rounded-lg border bg-gray-50 p-4 text-center transition-all hover:bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700 ${
													isCurrentPlan || isSelectedPlan
														? 'border-2 border-purple-600'
														: 'border-gray-200 dark:border-zinc-700'
												}`}
											>
												{isCurrentPlan && (
													<div className='absolute top-0 right-0 rounded-tr-lg rounded-bl-lg bg-purple-700 px-2 py-1 text-xs font-bold text-white'>
														CURRENT
													</div>
												)}
												<input
													type='radio'
													name='subscriptionPlan'
													className='sr-only'
													onChange={() => setSelectedPlan(plan)}
													checked={isSelectedPlan}
												/>
												<p className='text-lg font-bold text-gray-900 dark:text-white'>
													{plan.title}
												</p>
												<p className='my-2 text-2xl font-bold text-gray-900 dark:text-gray-100'>
													{plan.priceFCFA}
												</p>
												<p className='text-sm text-gray-600 dark:text-gray-400'>
													{plan.period}
												</p>
											</label>
										)
									})}
								</div>
							</div>

							<div className='mb-6'>
								<h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-white'>
									2. Payment Details
								</h2>
								<div className='mb-6 flex border-b border-gray-200 dark:border-zinc-700'>
									<button
										type='button'
										className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
											activeTab === 'mobile'
												? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400'
												: 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800'
										}`}
										onClick={() => setActiveTab('mobile')}
									>
										<Smartphone size={20} /> Mobile Money
									</button>
									<button
										type='button'
										className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
											activeTab === 'creditCard'
												? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400'
												: 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800'
										}`}
										onClick={() => {
											setActiveTab('creditCard')
											setSelectedMobileMethod(null)
										}}
									>
										<CreditCard size={20} /> Credit Card
									</button>
								</div>

								<div>
									{activeTab === 'mobile' && (
										<div>
											<label className='mb-3 block text-sm font-medium text-gray-900 dark:text-gray-200'>
												Choose a provider
											</label>
											<div className='mb-6 grid grid-cols-3 gap-4'>
												{mobileMoneyOptions.map((option) => (
													<label
														key={option.name}
														className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border bg-gray-50 p-4 transition-all hover:bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700 ${
															selectedMobileMethod === option.name
																? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
																: 'border-gray-200 dark:border-zinc-700'
														}`}
													>
														<input
															type='radio'
															name='mobileMethod'
															className='sr-only'
															onChange={() =>
																setSelectedMobileMethod(option.name)
															}
															checked={selectedMobileMethod === option.name}
															required={activeTab === 'mobile'}
														/>
														<div className='mb-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full'>
															<img
																src={option.icon}
																alt={option.name}
																className='h-full w-full object-cover'
															/>
														</div>
														<span className='text-center text-sm font-medium text-gray-900 dark:text-white'>
															{option.name}
														</span>
													</label>
												))}
											</div>
											{selectedMobileMethod && (
												<div>
													<label
														htmlFor='phoneNumber'
														className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200'
													>
														Phone Number for {selectedMobileMethod}
													</label>
													<input
														id='phoneNumber'
														type='tel'
														name='phoneNumber'
														value={formData.phoneNumber}
														onChange={handleInputChange}
														className='w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-black focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
														placeholder='7X XXX XX XX'
														required
													/>
													<p className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
														You'll receive a payment prompt to confirm.
													</p>
												</div>
											)}
										</div>
									)}

									{activeTab === 'creditCard' && (
										<div className='space-y-4'>
											<label className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200'>
												Card Details
											</label>
											<div className='rounded-md border border-gray-300 bg-white px-4 py-3 dark:border-zinc-600 dark:bg-zinc-800'>
												<CardElement
													options={{
														style: {
															base: {
																color:
																	document.documentElement.classList.contains(
																		'dark'
																	)
																		? '#FFFFFF'
																		: '#000000',
																fontFamily: '"Acronym", Helvetica, sans-serif',
																fontSmoothing: 'antialiased',
																fontSize: '16px',
																'::placeholder': {
																	color: '#aab7c4'
																}
															},
															invalid: {
																color: '#fa755a',
																iconColor: '#fa755a'
															}
														}
													}}
												/>
											</div>
											{paymentError && (
												<div className='mt-2 text-sm text-red-500'>
													{paymentError}
												</div>
											)}
										</div>
									)}
								</div>
							</div>

							{showOtp && activeTab === 'mobile' && (
								<div className='mb-8'>
									<h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-white'>
										3. Confirm Payment
									</h2>
									<div>
										<label className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200'>
											Enter 6-digit code sent to your device
										</label>
										<div className='flex justify-center space-x-2'>
											{otp.map((data, index) => (
												<input
													key={index}
													type='text'
													maxLength={1}
													value={data}
													onChange={(e) => handleOtpChange(e.target, index)}
													onKeyDown={(e) => handleOtpKeyDown(e, index)}
													className='h-14 w-12 rounded-md border border-gray-300 bg-white text-center text-2xl font-semibold text-black focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
													ref={(el) => {
														inputRefs.current[index] = el
													}}
													required
												/>
											))}
										</div>
									</div>
								</div>
							)}

							<div>
								<div className='mb-6 rounded-lg bg-gray-100 p-4 dark:bg-zinc-800'>
									{selectedPlan ? (
										<div className='flex items-center justify-between'>
											<span className='font-medium text-gray-800 dark:text-gray-200'>
												Total to Pay:
											</span>
											<span className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
												{selectedPlan.priceFCFA} FCFA
											</span>
										</div>
									) : (
										<p className='text-center text-gray-600 dark:text-gray-400'>
											Please select a plan to see the total.
										</p>
									)}
								</div>
								<button
									type='submit'
									disabled={
										isProcessing ||
										!selectedPlan ||
										(activeTab === 'creditCard' && !stripe) ||
										(activeTab === 'mobile' && showOtp && !isOtpComplete())
									}
									className='w-full rounded-lg bg-purple-600 px-4 py-3 text-base font-bold text-white transition-transform hover:scale-105 hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:scale-100 dark:disabled:bg-zinc-700'
								>
									{isProcessing
										? 'Processing...'
										: !showOtp || activeTab === 'creditCard'
											? selectedPlan
												? `Pay ${selectedPlan.priceFCFA} FCFA`
												: 'Complete Payment'
											: 'Confirm Payment'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default PaymentFlowPage
