import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSwipeable } from 'react-swipeable'

import { heroSlides } from '../../../data/shows.ts'

import HeroActions from './HeroActions.tsx'

function Hero() {
	const { t } = useTranslation()

	const [currentSlide, setCurrentSlide] = useState<number>(0)
	const [isHovering, setIsHovering] = useState<boolean>(false)

	const activeSlide = heroSlides[currentSlide]

	const goToNext = () => {
		setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
	}
	const goToPrev = () => {
		setCurrentSlide(
			(prev) => (prev - 1 + heroSlides.length) % heroSlides.length
		)
	}

	useEffect(() => {
		if (isHovering) {
			return
		}
		const timer = setTimeout(goToNext, 5000)
		return () => clearTimeout(timer)
	}, [currentSlide, isHovering])

	const handlers = useSwipeable({
		onSwipedLeft: () => goToNext(),
		onSwipedRight: () => goToPrev(),
		preventScrollOnSwipe: true,
		trackMouse: true
	})

	return (
		<div {...handlers}>
			<section className='relative h-screen w-full overflow-hidden'>
				{heroSlides.map((slide, index) => (
					<div
						key={index}
						className={`absolute top-0 left-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'z-0 opacity-100' : 'opacity-0'}`}
						style={{ backgroundImage: `url(${slide.bannerUrl})` }}
					/>
				))}

				<video
					src='/videos/intro.mp4'
					autoPlay
					muted
					loop
					className={`absolute top-0 left-0 z-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out ${isHovering ? 'opacity-100' : 'opacity-0'}`}
				/>

				<div className='absolute top-0 left-0 z-10 h-full w-full bg-black/60' />
		
				<div className='relative z-20 container mx-auto flex h-full items-center px-4 sm:px-20 lg:px-24'>
					<div>
						<h1 className='animate-fade-in-down mb-4 text-7xl font-extrabold text-white sm:mb-6 sm:text-4xl md:text-8xl lg:text-8xl'>
							{activeSlide.title}
						</h1>
						<div className='animate-fade-in-down animation-delay-200 mb-4 flex flex-wrap items-center gap-2 text-gray-300 sm:mb-6 sm:gap-4'>
							<span className='text-sm sm:text-base'>{activeSlide.year}</span>
							<span className='rounded border border-gray-500 px-1.5 py-0.5 text-xs sm:px-2 sm:text-sm'>
								{activeSlide.quality}
							</span>
							{activeSlide.features?.map((feature: string) => (
								<span
									key={feature}
									className='rounded border border-gray-500 px-1.5 py-0.5 text-xs sm:px-2 sm:text-sm'
								>
									{feature}
								</span>
							))}
							<span className='text-sm sm:text-base'>
								{activeSlide.duration}
							</span>
						</div>
						<p className='animate-fade-in-up mb-6 max-w-2xl text-base text-gray-200 sm:mb-8 sm:text-lg md:text-xl'>
							{activeSlide.description}
						</p>

						<HeroActions
							id={activeSlide.id}
							onHoverStart={() => setIsHovering(true)}
							onHoverEnd={() => setIsHovering(false)}
						/>
					</div>
				</div>

				<div className='absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center space-x-3 sm:hidden'>
					{heroSlides.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentSlide(index)}
							className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
								index === currentSlide ? 'scale-125 bg-white' : 'bg-gray-500'
							}`}
							aria-label={t('homePage.hero.goToSlide', {
								slideNumber: index + 1
							})}
						/>
					))}
				</div>

				<div className='absolute top-1/2 right-4 z-20 hidden -translate-y-1/2 flex-col items-center space-y-2 sm:right-6 sm:flex sm:space-y-3 lg:right-8'>
					{heroSlides.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentSlide(index)}
							className={`h-2.5 w-2.5 rounded-full transition-all duration-300 sm:h-3 sm:w-3 ${
								index === currentSlide ? 'scale-125 bg-white' : 'bg-gray-500'
							}`}
							aria-label={t('homePage.hero.goToSlide', {
								slideNumber: index + 1
							})}
						/>
					))}
				</div>
			</section>
		</div>
	)
}

export default Hero
