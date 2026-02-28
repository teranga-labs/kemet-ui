import { Search } from 'lucide-react'
import { useState } from 'react'

function FinancialDashboard() {
	const transactions = [
		{
			id: 'txn_1',
			user: 'Leo Konate',
			amount: 9.99,
			date: '2025-08-21',
			type: 'Subscription'
		},
		{
			id: 'txn_2',
			user: 'Awa Diop',
			amount: 14.99,
			date: '2025-08-21',
			type: 'Subscription'
		},
		{
			id: 'txn_3',
			user: 'Moussa Faye',
			amount: 99.99,
			date: '2025-08-20',
			type: 'Creator Payout'
		},
		{
			id: 'txn_4',
			user: 'Fatou Ndiaye',
			amount: 9.99,
			date: '2025-08-20',
			type: 'Subscription'
		},
		{
			id: 'txn_5',
			user: 'Aminata Sow',
			amount: 14.99,
			date: '2025-08-19',
			type: 'Subscription'
		},
		{
			id: 'txn_6',
			user: 'Moussa Faye',
			amount: 150.0,
			date: '2025-08-18',
			type: 'Creator Payout'
		}
	]

	const [searchTerm, setSearchTerm] = useState('')
	const [filterType, setFilterType] = useState('all')

	const filteredTransactions = transactions
		.filter((txn) => {
			if (filterType === 'all') {
				return true
			}
			if (filterType === 'subscription') {
				return txn.type === 'Subscription'
			}
			if (filterType === 'payout') {
				return txn.type === 'Creator Payout'
			}
			return true
		})
		.filter((txn) => {
			const lowercasedTerm = searchTerm.toLowerCase()
			if (!lowercasedTerm) {
				return true
			}
			return (
				txn.id.toLowerCase().includes(lowercasedTerm) ||
				txn.user.toLowerCase().includes(lowercasedTerm) ||
				txn.amount.toString().includes(lowercasedTerm) ||
				txn.date.includes(lowercasedTerm)
			)
		})

	return (
		<div className='space-y-8'>
			<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
				Financial Overview <span className='text-purple-700'>.</span>
			</h2>

			<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
				<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<h3 className='text-purple-700'>Total Revenue</h3>
					<p className='text-3xl font-bold'>$1,250,450</p>
				</div>
				<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<h3 className='text-purple-700'>New Subscriptions (Month)</h3>
					<p className='text-3xl font-bold'>1,420</p>
				</div>
				<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<h3 className='text-purple-700'>Active Users</h3>
					<p className='text-3xl font-bold'>12,408</p>
				</div>
			</div>

			<div>
				<h3 className='mb-4 text-xl font-semibold text-gray-900 dark:text-white'>
					Recent Transactions
				</h3>
				<div className='mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row'>
					<div className='relative w-full sm:w-auto'>
						<Search
							size={20}
							className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400'
						/>
						<input
							type='text'
							placeholder='Search transactions...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='w-full rounded-md border border-gray-300 bg-white p-3 pl-10 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:w-72 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
						/>
					</div>
					<select
						value={filterType}
						onChange={(e) => setFilterType(e.target.value)}
						className='h-[46px] w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:w-auto dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
					>
						<option value='all'>All Transaction Types</option>
						<option value='subscription'>Subscriptions</option>
						<option value='payout'>Creator Payouts</option>
					</select>
				</div>

				<div className='overflow-x-auto rounded-lg bg-white shadow dark:bg-zinc-900'>
					<table className='min-w-full'>
						<thead className='bg-purple-700 text-left text-sm font-semibold text-white'>
							<tr>
								<th className='p-4'>Transaction ID</th>
								<th className='p-4'>User</th>
								<th className='p-4'>Amount</th>
								<th className='p-4'>Date</th>
								<th className='p-4'>Type</th>
							</tr>
						</thead>
						<tbody className='text-gray-800 dark:text-gray-200'>
							{filteredTransactions.length > 0 ? (
								filteredTransactions.map((txn) => (
									<tr
										key={txn.id}
										className='border-t border-gray-200 hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50'
									>
										<td className='p-4 font-mono text-xs'>{txn.id}</td>
										<td className='p-4'>{txn.user}</td>
										<td
											className={`p-4 font-medium ${txn.type === 'Creator Payout' ? 'text-red-500' : 'text-green-600'}`}
										>
											{txn.type === 'Creator Payout' ? '-' : '+'}$
											{txn.amount.toFixed(2)}
										</td>
										<td className='p-4'>{txn.date}</td>
										<td className='p-4'>
											<span
												className={`rounded-full px-2 py-1 text-xs font-semibold ${
													txn.type === 'Creator Payout'
														? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
														: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
												}`}
											>
												{txn.type}
											</span>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={5}
										className='p-6 text-center text-gray-500 dark:text-gray-400'
									>
										No transactions found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default FinancialDashboard
