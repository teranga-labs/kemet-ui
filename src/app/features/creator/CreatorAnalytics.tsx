import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

const CreatorAnalytics = () => {
	const analyticsData = [
		{ name: 'Jul 22', views: 2400 },
		{ name: 'Jul 29', views: 1398 },
		{ name: 'Aug 05', views: 9800 },
		{ name: 'Aug 12', views: 3908 },
		{ name: 'Aug 19', views: 4800 },
		{ name: 'Aug 26', views: 3800 },
		{ name: 'Sep 02', views: 4300 }
	]

	const topContent = [
		{ rank: 1, title: 'Echoes of the Past', views: '1.2M' },
		{ rank: 2, title: 'Cybernetic Dawn', views: '980K' },
		{ rank: 3, title: 'The Last Nomad', views: '750K' }
	]

	const demographicsData = [
		{ country: 'Senegal', percentage: 45 },
		{ country: 'Ivory Coast', percentage: 25 },
		{ country: 'Nigeria', percentage: 15 },
		{ country: 'Ghana', percentage: 10 },
		{ country: 'Other', percentage: 5 }
	]

	return (
		<div className='space-y-8'>
			<h2 className='text-2xl font-semibold'>
				Viewer Analytics{' '}
				<span className='h-4 w-4 rounded-full text-purple-700'>.</span>{' '}
			</h2>
			{/* Summary Cards */}
			<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
				<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<h3 className='text-purple-700 dark:text-purple-400'>
						Total Views (Last 30d)
					</h3>
					<p className='text-3xl font-bold'>2.1M</p>
				</div>
				<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<h3 className='text-purple-700 dark:text-purple-400'>
						Watch Hours (Last 30d)
					</h3>
					<p className='text-3xl font-bold'>850K</p>
				</div>
				<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<h3 className='text-purple-700 dark:text-purple-400'>
						New Subscribers (Last 30d)
					</h3>
					<p className='text-3xl font-bold'>+12,500</p>
				</div>
			</div>

			{/* Viewership Chart */}
			<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
				<h3 className='mb-4 font-semibold'>Viewership Over Time</h3>
				<div style={{ width: '100%', height: 300 }}>
					<ResponsiveContainer>
						<LineChart data={analyticsData}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='name' />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line
								type='monotone'
								dataKey='views'
								stroke='#8884d8'
								activeDot={{ r: 8 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Top Content & Demographics */}
			<div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
				<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<h3 className='mb-4 font-semibold'>Top Performing Content</h3>
					<ul className='space-y-3'>
						{topContent.map((item) => (
							<li key={item.rank} className='flex items-center justify-between'>
								<span>
									{item.rank}. {item.title}
								</span>
								<span className='font-bold text-gray-600'>{item.views}</span>
							</li>
						))}
					</ul>
				</div>
				<div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
					<h3 className='mb-4 font-semibold'>Viewer Demographics</h3>
					<ul className='space-y-4'>
						{demographicsData.map((item) => (
							<li key={item.country}>
								<div className='mb-1 flex justify-between'>
									<span>{item.country}</span>
									<span>{item.percentage}%</span>
								</div>
								<div className='h-2.5 w-full rounded-full bg-gray-200'>
									<div
										className='h-2.5 rounded-full bg-purple-600'
										style={{ width: `${item.percentage}%` }}
									></div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default CreatorAnalytics
