import { CheckCircle2 } from 'lucide-react'

import { ChartPlaceholder } from '../components/DashboardWidgets.tsx'

const MonitoringPage = () => (
	<div className='space-y-6'>
		<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
			System Monitoring
		</h2>
		<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
			{['API Gateway', 'Database', 'Video Transcoding'].map((service) => (
				<div
					key={service}
					className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900'
				>
					<div className='flex items-center justify-between'>
						<h3 className='font-semibold text-gray-800 dark:text-white'>
							{service}
						</h3>
						<span className='flex items-center gap-2 text-sm font-medium text-green-500'>
							<CheckCircle2 size={16} /> Operational
						</span>
					</div>
					<p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
						Response Time: 120ms
					</p>
				</div>
			))}
		</div>
		<ChartPlaceholder title='Real-time CPU Usage' />
	</div>
)

export default MonitoringPage
