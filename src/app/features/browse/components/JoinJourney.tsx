import panorama from '/images/banners/panorama-blk.png'
import logoWhite from '/images/misc/KEMET White Bigger.png'
import React from 'react'
import { useTranslation } from 'react-i18next'

function JoinJourney() {
	const { t } = useTranslation()
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		alert(t('joinJourney.thankYouAlert'))
	}

	return (
		<section
			className='relative overflow-hidden bg-black py-20 text-white'
			style={{
				backgroundImage: `url(${panorama})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				height: 'auto'
			}}
		>
			<div className='absolute inset-0 bg-black/70'></div>

			<div className='relative z-10 container mx-auto flex flex-col items-center px-4 text-center'>
				<img
					src={logoWhite}
					alt='Kemet Logo'
					className='lg-mt-0 mt-14 mb-6 h-64 w-auto md:mt-0'
				/>

				<h2 className='text-4xl leading-tight font-extrabold text-white md:text-5xl'>
					{t('joinJourney.title')}
				</h2>
				<p className='mt-4 max-w-lg text-zinc-300'>
					{t('joinJourney.subtitle')}
				</p>

				<form
					onSubmit={handleSubmit}
					className='mt-8 flex w-full max-w-2xl flex-col items-center sm:flex-row'
				>
					<input
						type='email'
						placeholder={t('joinJourney.emailPlaceholder')}
						required
						className='w-full rounded-md border-0 bg-white px-5 py-4 font-bold text-zinc-900 placeholder-zinc-500 transition-shadow focus:ring-2 focus:ring-purple-500 sm:flex-grow sm:rounded-r-none'
					/>
					<button
						type='submit'
						className='mt-3 w-full rounded-md bg-purple-600 px-8 py-4 font-bold text-white uppercase transition-colors hover:bg-purple-800 sm:mt-0 sm:w-full sm:rounded-l-none md:w-84 lg:w-84'
					>
						{t('joinJourney.joinButton')}
					</button>
				</form>
			</div>
		</section>
	)
}

export default JoinJourney
