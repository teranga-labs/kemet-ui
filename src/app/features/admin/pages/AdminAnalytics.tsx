import { useContext } from 'react'
import {
	Area,
	AreaChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

import { ThemeContext } from '../../../contexts/ThemeContext.ts'
import { allItems } from '../../../../data/shows.ts'

const AdminAnalytics = () => {
	const themeContext = useContext(ThemeContext)
	const isDarkMode = themeContext?.theme === 'dark'

	const chartTextColor = isDarkMode ? '#a1a1aa' : '#6b7280'
	const chartGridColor = isDarkMode ? '#3f3f46' : '#e5e7eb'
	const chartTooltipBg = isDarkMode ? '#18181b' : '#ffffff'
	const chartTooltipBorder = isDarkMode ? '#3f3f46' : '#e5e7eb'

	const userGrowthData = [
		{ name: 'Mar', Users: 120 },
		{ name: 'Apr', Users: 180 },
		{ name: 'May', Users: 150 },
		{ name: 'Jun', Users: 220 },
		{ name: 'Jul', Users: 340 },
		{ name: 'Aug', Users: 410 }
	]
	const subscriptionData = [
		{ name: 'Daily', value: 400 },
		{ name: 'Weekly', value: 300 },
		{ name: 'Monthly', value: 150 }
	]
	const COLORS = ['#8884d8', '#82ca9d', '#ffc658']

	return (
		<div className='space-y-8'>
			<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
				Platform Analytics{' '}
				<span className='h-4 w-4 rounded-full text-purple-700'>.</span>
			</h2>

			<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
				<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<h3 className='text-purple-700 dark:text-purple-400'>
						Total Users
					</h3>
					<p className='text-3xl font-bold text-gray-900 dark:text-white'>
						12,408
					</p>
				</div>
				<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<h3 className='text-purple-700 dark:text-purple-400'>
						Total Content
					</h3>
					<p className='text-3xl font-bold text-gray-900 dark:text-white'>
						{allItems.length}
					</p>
				</div>
				<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<h3 className='text-purple-700 dark:text-purple-400'>
						Active Subs
					</h3>
					<p className='text-3xl font-bold text-gray-900 dark:text-white'>
						8,721
					</p>
				</div>
				<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<h3 className='text-purple-700 dark:text-purple-400'>
						Monthly Revenue
					</h3>
					<p className='text-3xl font-bold text-gray-900 dark:text-white'>
						$86,540
					</p>
				</div>
			</div>

			<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
				<h3 className='mb-4 font-semibold text-gray-900 dark:text-white'>
					New User Growth
				</h3>
				<div style={{ width: '100%', height: 300 }}>
					<ResponsiveContainer>
						<AreaChart
							data={userGrowthData}
							margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
						>
							<CartesianGrid
								strokeDasharray='3 3'
								stroke={chartGridColor}
							/>
							<XAxis dataKey='name' stroke={chartTextColor} />
							<YAxis stroke={chartTextColor} />
							<Tooltip
								contentStyle={{
									backgroundColor: chartTooltipBg,
									borderColor: chartTooltipBorder,
									color: chartTextColor
								}}
							/>
							<Area
								type='monotone'
								dataKey='Users'
								stroke='#8884d8'
								fill='#8884d8'
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
				<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<h3 className='mb-4 font-semibold text-gray-900 dark:text-white'>
						Subscription Plan Breakdown
					</h3>
					<div style={{ width: '100%', height: 300 }}>
						<ResponsiveContainer>
							<PieChart>
								<Pie
									data={subscriptionData}
									cx='50%'
									cy='50%'
									labelLine={false}
									outerRadius={100}
									fill='#8884d8'
									dataKey='value'
									nameKey='name'
									label={{ fill: '#fff' }}
								>
									{subscriptionData.map((_entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip
									contentStyle={{
										backgroundColor: chartTooltipBg,
										borderColor: chartTooltipBorder
									}}
								/>
								<Legend
									wrapperStyle={{ color: chartTextColor }}
								/>
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<h3 className='mb-4 font-semibold text-gray-900 dark:text-white'>
						Most Viewed Content (All Time)
					</h3>
					<ul className='space-y-3'>
						{allItems.slice(0, 5).map((item, index) => (
							<li
								key={item.id}
								className='flex items-center justify-between text-sm text-gray-800 dark:text-gray-200'
							>
								<span>
									{index + 1}. {item.title}
								</span>
								<span className='font-bold text-gray-600 dark:text-gray-400'>
									{(item.totalViews || 0).toLocaleString()}{' '}
									views
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default AdminAnalytics
