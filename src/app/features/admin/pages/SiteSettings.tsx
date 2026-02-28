import { useState } from 'react'

interface SiteSettingsProps {
	onSaveSettings?: (settings: unknown) => void
}

const SiteSettings = ({ onSaveSettings }: SiteSettingsProps) => {
	const [isMaintenance, setIsMaintenance] = useState(false)
	const [dailyPrice, setDailyPrice] = useState('9.99')
	const [weeklyPrice, setWeeklyPrice] = useState('14.99')
	const [monthlyPrice, setMonthlyPrice] = useState('14.99')

	const handleSave = () => {
		const settings = {
			maintenanceMode: isMaintenance,
			subscriptionPricing: {
				daily: dailyPrice,
				weekly: weeklyPrice,
				monthly: monthlyPrice
			}
		}

		if (onSaveSettings) {
			onSaveSettings(settings)
		} else {
			console.log('Saving settings:', settings)
			alert('Settings saved successfully!')
		}
	}

	return (
		<div className='space-y-8'>
			<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
				Site Settings{' '}
				<span className='h-4 w-4 rounded-full text-purple-700'>.</span>
			</h2>

			<div className='space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900'>
				<div>
					<h3 className='text-lg font-medium text-gray-900 dark:text-white'>
						Maintenance Mode
					</h3>
					<p className='mb-4 text-sm text-gray-500 dark:text-gray-400'>
						Temporarily make the site unavailable to visitors.
					</p>
					<label className='relative inline-flex cursor-pointer items-center'>
						<input
							type='checkbox'
							checked={isMaintenance}
							onChange={() => setIsMaintenance(!isMaintenance)}
							className='peer sr-only'
						/>
						<div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-purple-600 peer-focus:ring-4 peer-focus:ring-purple-300 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-zinc-700 dark:peer-focus:ring-purple-800 dark:after:border-zinc-600"></div>
						<span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
							{isMaintenance ? 'Enabled' : 'Disabled'}
						</span>
					</label>
				</div>

				<div className='border-t border-gray-200 pt-6 dark:border-zinc-800'>
					<h3 className='text-lg font-medium text-gray-900 dark:text-white'>
						Subscription Pricing
					</h3>
					<div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-3'>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
								Daily Plan ($)
							</label>
							<input
								type='number'
								value={dailyPrice}
								onChange={(e) => setDailyPrice(e.target.value)}
								className='mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
								Weekly Plan ($)
							</label>
							<input
								type='number'
								value={weeklyPrice}
								onChange={(e) => setWeeklyPrice(e.target.value)}
								className='mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
								Monthly Plan ($)
							</label>
							<input
								type='number'
								value={monthlyPrice}
								onChange={(e) => setMonthlyPrice(e.target.value)}
								className='mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
							/>
						</div>
					</div>
				</div>

				<div className='flex justify-end border-t border-gray-200 pt-4 dark:border-zinc-800'>
					<button
						onClick={handleSave}
						className='rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-purple-700'
					>
						Save Changes
					</button>
				</div>
			</div>
		</div>
	)
}

export default SiteSettings
