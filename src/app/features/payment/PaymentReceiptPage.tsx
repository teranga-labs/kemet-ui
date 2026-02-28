import { CheckCircle } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import Footer from '../../components/layout/Footer.tsx'
import Header from '../../components/layout/Header.tsx'
import { useAuth } from '../../hooks/useAuth.ts'

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

function PaymentReceiptPage() {
	const { user } = useAuth()
	const navigate = useNavigate()
	const query = useQuery()

	const planTitle = query.get('plan') || 'N/A'
	const price = query.get('price') || 'N/A'
	const method = query.get('method') || 'N/A'

	const transactionDate = new Date().toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	})

	return (
		// --- UPDATED: Background is now theme-aware ---
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />
			<main className='mt-16 flex flex-grow items-center justify-center p-4'>
				{/* --- UPDATED: Main card is now theme-aware --- */}
				<div className='w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 text-center shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-800'>
					<CheckCircle className='mx-auto mb-4 h-20 w-20 text-green-500' />
					<h1 className='text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white'>
						Payment Successful!
					</h1>
					<p className='mt-2 text-lg text-gray-600 dark:text-gray-300'>
						Thank you for your subscription. Your receipt is below.
					</p>

					{/* --- UPDATED: Receipt details card is now theme-aware --- */}
					<div className='my-8 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6 text-left dark:border-zinc-700 dark:bg-zinc-900'>
						<h2 className='mb-4 border-b border-gray-200 pb-3 text-xl font-semibold text-gray-800 dark:border-zinc-700 dark:text-white'>
							Receipt Details
						</h2>
						<div className='flex justify-between'>
							<span className='font-medium text-gray-600 dark:text-gray-400'>
								User:
							</span>
							<span className='text-gray-800 dark:text-gray-200'>
								{user?.name}
							</span>
						</div>
						<div className='flex justify-between'>
							<span className='font-medium text-gray-600 dark:text-gray-400'>
								Email:
							</span>
							<span className='text-gray-800 dark:text-gray-200'>
								{user?.email}
							</span>
						</div>
						<div className='flex justify-between'>
							<span className='font-medium text-gray-600 dark:text-gray-400'>
								Date:
							</span>
							<span className='text-gray-800 dark:text-gray-200'>
								{transactionDate}
							</span>
						</div>
						<div className='flex justify-between'>
							<span className='font-medium text-gray-600 dark:text-gray-400'>
								Plan Subscribed:
							</span>
							<span className='font-bold text-purple-700 dark:text-purple-400'>
								{planTitle}
							</span>
						</div>
						<div className='flex justify-between'>
							<span className='font-medium text-gray-600 dark:text-gray-400'>
								Payment Method:
							</span>
							<span className='text-gray-800 dark:text-gray-200'>{method}</span>
						</div>
						<div className='mt-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-zinc-700'>
							<span className='text-lg font-bold text-gray-800 dark:text-white'>
								Amount Paid:
							</span>
							<span className='text-xl font-bold text-green-600'>
								{price} FCFA
							</span>
						</div>
					</div>

					{/* Button works for both themes */}
					<button
						onClick={() => navigate('/')}
						className='w-full rounded-lg bg-purple-600 px-4 py-3 text-lg text-white transition-colors hover:bg-purple-700'
					>
						Start Watching
					</button>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default PaymentReceiptPage
