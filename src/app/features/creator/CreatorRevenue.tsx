import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import type { MediaItem } from '../../../data/shows.ts'

interface RevenueDashboardProps {
	myContent: MediaItem[]
}

function CreatorRevenue({ myContent }: RevenueDashboardProps) {
	const lifetimeTotal = myContent.reduce(
		(acc, item) => acc + (item.lifetimeEarnings || 0),
		0
	)
	const lastMonthTotal = myContent.reduce(
		(acc, item) => acc + (item.lastMonthEarnings || 0),
		0
	)
	const viewsTotal = myContent.reduce(
		(acc, item) => acc + (item.totalViews || 0),
		0
	)

	const [searchTerm, setSearchTerm] = useState('')
	const [activeFilter, setActiveFilter] = useState('all')

	const filters = [
		{ label: 'All', value: 'all' },
		{ label: 'Kemet Originals', value: 'original' },
		{ label: 'Movies', value: 'movie' },
		{ label: 'TV Shows', value: 'show' },
		{ label: 'Documentaries', value: 'documentary' }
	]

	const filteredBreakdown = useMemo(() => {
		return myContent
			.filter((item) => {
				if (activeFilter === 'all') return true
				if (activeFilter === 'movie') return item.type === 'movie'
				if (activeFilter === 'show') return item.type === 'show'
				if (activeFilter === 'original') return item.type === 'original'
				if (activeFilter === 'documentary')
					return item.genres?.includes('Documentary')
				return true
			})
			.filter((item) => {
				const lowercasedTerm = searchTerm.toLowerCase()
				if (!lowercasedTerm) return true
				return item.title.toLowerCase().includes(lowercasedTerm)
			})
	}, [myContent, searchTerm, activeFilter])

	return (
		<div className='space-y-8'>
			{/* Summary Section */}
			<div>
				<h2 className='mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
					Revenue Summary <span className='text-purple-700'>.</span>
				</h2>
				<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
					<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
						<h3 className='text-purple-700 dark:text-purple-400'>
							Lifetime Earnings
						</h3>
						<p className='text-3xl font-bold text-gray-900 dark:text-white'>
							${lifetimeTotal.toLocaleString()}
						</p>
					</div>
					<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
						<h3 className='text-purple-700 dark:text-purple-400'>
							Last Month's Payout
						</h3>
						<p className='text-3xl font-bold text-gray-900 dark:text-white'>
							${lastMonthTotal.toLocaleString()}
						</p>
					</div>
					<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
						<h3 className='text-purple-700 dark:text-purple-400'>
							Total Views
						</h3>
						<p className='text-3xl font-bold text-gray-900 dark:text-white'>
							{viewsTotal >= 1000000
								? `${(viewsTotal / 1000000).toFixed(1)}M`
								: viewsTotal >= 1000
									? `${(viewsTotal / 1000).toFixed(1)}K`
									: viewsTotal.toLocaleString()}
						</p>
					</div>
				</div>
			</div>

			{/* Detailed Breakdown Section */}
			<div>
				<h2 className='mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
					Detailed Revenue Breakdown
				</h2>

				<div className='mb-4 flex flex-col items-center justify-between gap-4 md:flex-row'>
					<div className='flex w-full items-center gap-2 overflow-x-auto rounded-lg bg-gray-100 p-1 md:w-auto dark:bg-zinc-800'>
						{filters.map((filter) => (
							<button
								key={filter.value}
								onClick={() => setActiveFilter(filter.value)}
								className={`rounded-md px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
									activeFilter === filter.value
										? 'bg-purple-600 text-white shadow'
										: 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-zinc-700'
								}`}
							>
								{filter.label}
							</button>
						))}
					</div>
					<div className='relative w-full md:w-auto'>
						<Search
							size={20}
							className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400'
						/>
						<input
							type='text'
							placeholder='Search by title...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='w-full rounded-lg border border-gray-300 bg-white p-3 pl-10 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 md:w-64 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
						/>
					</div>
				</div>

				<div className='overflow-x-auto rounded-lg border border-gray-200 bg-white shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<table className='w-full text-left'>
						<thead className='bg-purple-700 text-white'>
							<tr>
								<th className='p-4 font-semibold'>Content</th>
								<th className='p-4 font-semibold'>Lifetime Earnings</th>
								<th className='p-4 font-semibold'>Last Month</th>
								<th className='p-4 font-semibold'>Total Views</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-200 text-gray-800 dark:divide-zinc-800 dark:text-gray-200'>
							{filteredBreakdown.length > 0 ? (
								filteredBreakdown.map((item) => (
									<tr
										key={item.id}
										className='hover:bg-gray-50 dark:hover:bg-zinc-800/50'
									>
										<td className='p-4 font-medium'>{item.title}</td>
										<td className='p-4 text-gray-800 dark:text-gray-200'>
											${(item.lifetimeEarnings || 0).toLocaleString()}
										</td>
										<td className='p-4 text-gray-800 dark:text-gray-200'>
											${(item.lastMonthEarnings || 0).toLocaleString()}
										</td>
										<td className='p-4 text-gray-800 dark:text-gray-200'>
											{(item.totalViews || 0).toLocaleString()}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={4}
										className='p-8 text-center text-gray-500 dark:text-gray-400'
									>
										No content found matching your criteria.
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

export default CreatorRevenue
