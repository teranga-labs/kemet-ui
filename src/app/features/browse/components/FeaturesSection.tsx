import kemetDevices from '/images/misc/kemet-devices.png'
import { Trans, useTranslation } from 'react-i18next'

const features = [
	{
		letter: 'W',
		titleKey: 'featuresSection.features.worldwide.title',
		descriptionKey: 'featuresSection.features.worldwide.description'
	},
	{
		letter: 'S',
		titleKey: 'featuresSection.features.stream.title',
		descriptionKey: 'featuresSection.features.stream.description'
	},
	{
		letter: 'L',
		titleKey: 'featuresSection.features.library.title',
		descriptionKey: 'featuresSection.features.library.description'
	}
]

function FeaturesSection() {
	const { t } = useTranslation()

	return (
		<section className='border-b border-b-gray-200 bg-white py-20 dark:border-b-gray-800 dark:bg-zinc-900'>
			<div className='container mx-auto px-4'>
				<div className='text-center'>
					<p className='text-sm font-bold tracking-widest text-zinc-700 uppercase dark:text-gray-200'>
						{t('featuresSection.tagline')}
					</p>
					<h2 className='mt-2 text-5xl font-extrabold text-zinc-900 md:text-5xl dark:text-white'>
						{t('featuresSection.title')}
					</h2>
				</div>
				<div className='grid grid-cols-1 items-center lg:grid-cols-2 lg:-mb-36 sm:-mb-0 md:-mb-0'>
					<div>
						<img
							src={kemetDevices}
							alt='Streaming on multiple devices'
							className='-mt-10 h-auto w-full'
						/>
					</div>
					<div className='space-y-12'>
						<h3 className='text-4xl font-bold break-words text-zinc-800 dark:text-zinc-100'>
							<Trans
								i18nKey='featuresSection.subtitle'
								components={{
									1: (
										<span className='underline decoration-purple-600 decoration-4 underline-offset-4' />
									)
								}}
							/>
						</h3>

						{/* Desktop Layout - Side by side */}
						<div className='hidden justify-between gap-x-3 lg:flex'>
							<div className='space-y-18 lg:space-y-16'>
								{features.map((feature) => (
									<span
										key={feature.letter}
										className='block text-7xl font-extrabold text-zinc-800 dark:text-zinc-200'
									>
										{feature.letter}
									</span>
								))}
							</div>

							<div className='space-y-8 lg:space-y-16'>
								{features.map((feature) => (
									<div key={feature.letter}>
										<h3 className='text-xl font-bold text-zinc-900 dark:text-white'>
											<Trans
												i18nKey={feature.titleKey}
												components={{
													1: (
														<span className='underline decoration-purple-500' />
													)
												}}
											/>
										</h3>
										<p className='mt-1 text-lg text-zinc-600 dark:text-zinc-400'>
											{t(feature.descriptionKey)}
										</p>
									</div>
								))}
							</div>
						</div>

						{/* Mobile Layout - Stacked */}
						<div className='space-y-8 lg:hidden'>
							{features.map((feature) => (
								<div key={feature.letter} className='text-start'>
									<span className='mb-4 block text-7xl font-extrabold text-zinc-800 dark:text-zinc-200'>
										{feature.letter}
									</span>
									<h3 className='text-xl font-bold text-zinc-900 dark:text-white'>
										<Trans
											i18nKey={feature.titleKey}
											components={{
												1: <span className='underline decoration-purple-500' />
											}}
										/>
									</h3>
									<p className='mt-1 text-lg text-zinc-600 dark:text-zinc-400'>
										{t(feature.descriptionKey)}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default FeaturesSection
