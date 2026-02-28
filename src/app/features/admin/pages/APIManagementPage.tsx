import { Globe, HardDrive, Server, Signal } from 'lucide-react'

const APIManagementPage = () => {
	const paymentAPIs = [
		{ name: 'Wave', status: 'Active', icon: Signal, color: 'text-sky-500' },
		{
			name: 'Orange Money',
			status: 'Active',
			icon: Server,
			color: 'text-orange-500'
		},
		{
			name: 'Stripe',
			status: 'Active',
			icon: HardDrive,
			color: 'text-indigo-500'
		},
		{ name: 'YAS', status: 'Inactive', icon: Globe, color: 'text-gray-500' }
	]
	return (
		<div className='space-y-6'>
			<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
				Payment API Management
			</h2>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
				{paymentAPIs.map((api) => (
					<div
						key={api.name}
						className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900'
					>
						<div className='flex items-start justify-between'>
							<div>
								<div className='flex items-center gap-3'>
									<api.icon size={24} className={api.color} />
									<h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
										{api.name}
									</h3>
								</div>
								<span
									className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
										api.status === 'Active'
											? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
											: 'bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-gray-400'
									}`}
								>
									{api.status}
								</span>
							</div>
							<button className='text-sm text-purple-600 hover:underline dark:text-purple-400'>
								Configure
							</button>
						</div>
						<div className='mt-4 border-t border-gray-100 pt-4 dark:border-zinc-700'>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								Transaction Volume (24h): CFA 1,234,567
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default APIManagementPage
