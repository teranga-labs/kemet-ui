const DeploymentPage = () => (
	<div className='space-y-6'>
		<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
			Deployments
		</h2>
		<div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900'>
			<div className='flex items-center justify-between'>
				<h3 className='font-semibold text-gray-800 dark:text-white'>
					Production Environment
				</h3>
				<button className='rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700'>
					Trigger New Deploy
				</button>
			</div>
			<ul className='mt-4 divide-y divide-gray-100 dark:divide-zinc-700'>
				<li className='flex items-center justify-between py-3'>
					<p className='text-sm font-medium text-gray-700 dark:text-gray-300'>
						deploy-main-a4b1c8f
					</p>
					<span className='rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/50 dark:text-green-400'>
						Success
					</span>
					<span className='text-xs text-gray-400'>
						Sep 28, 2025, 6:45 PM
					</span>
				</li>
				<li className='flex items-center justify-between py-3'>
					<p className='text-sm font-medium text-gray-700 dark:text-gray-300'>
						deploy-main-9f2d5e3
					</p>
					<span className='rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-900/50 dark:text-red-400'>
						Failed
					</span>
					<span className='text-xs text-gray-400'>
						Sep 28, 2025, 3:12 PM
					</span>
				</li>
			</ul>
		</div>
	</div>
)

export default DeploymentPage
