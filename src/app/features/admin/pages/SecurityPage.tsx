import { AlertTriangle } from 'lucide-react'

const SecurityPage = () => (
	<div className='space-y-6'>
		<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
			Security Center
		</h2>
		<div className='rounded-xl border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/20'>
			<div className='flex items-center'>
				<AlertTriangle className='h-5 w-5 text-yellow-500' />
				<p className='ml-3 text-sm font-semibold text-yellow-700 dark:text-yellow-300'>
					2 Active Alerts: Please review recent suspicious login
					attempts.
				</p>
			</div>
		</div>
		<div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900'>
			<h3 className='mb-4 font-semibold text-gray-800 dark:text-white'>
				Recent Login Attempts
			</h3>
			<ul className='divide-y divide-gray-100 dark:divide-zinc-700'>
				<li className='flex items-center justify-between py-3'>
					<p className='text-sm text-gray-700 dark:text-gray-300'>
						Successful login from Dakar, SN
					</p>
					<span className='text-xs text-gray-400'>Just now</span>
				</li>
				<li className='flex items-center justify-between py-3'>
					<p className='text-sm text-red-600 dark:text-red-500'>
						Failed login from Paris, FR
					</p>
					<span className='text-xs text-gray-400'>5 min ago</span>
				</li>
			</ul>
		</div>
	</div>
)

export default SecurityPage
