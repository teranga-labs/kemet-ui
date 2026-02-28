import { ArrowUpRight } from 'lucide-react'

export const StatCard = ({
	title,
	value,
	icon: Icon,
	change,
	changeType
}: any) => (
	<div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900'>
		<div className='flex items-center justify-between'>
			<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
				{title}
			</p>
			<Icon className='h-5 w-5 text-gray-400 dark:text-gray-500' />
		</div>
		<div className='mt-2 flex items-baseline'>
			<p className='text-3xl font-semibold text-gray-900 dark:text-white'>
				{value}
			</p>
			{change && (
				<span
					className={`ml-2 flex items-center text-sm font-medium ${
						changeType === 'increase'
							? 'text-green-500'
							: 'text-red-500'
					}`}
				>
					<ArrowUpRight
						size={16}
						className={
							changeType === 'increase' ? '' : 'rotate-180'
						}
					/>
					{change}
				</span>
			)}
		</div>
	</div>
)

export const ChartPlaceholder = ({ title }: { title: string }) => (
	<div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900'>
		<h3 className='mb-4 font-semibold text-gray-800 dark:text-white'>
			{title}
		</h3>
		<div className='flex h-64 items-center justify-center rounded-lg bg-gray-50 dark:bg-zinc-800'>
			<p className='text-sm text-gray-400'>Chart Data Unavailable</p>
		</div>
	</div>
)
