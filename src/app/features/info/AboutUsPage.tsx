import kemetSlides from '/images/misc/KEMET Slides (Edit).png'
import kemetDevices from '/images/misc/kemet-devices.png'
import { Clapperboard, Handshake, Rocket } from 'lucide-react'

import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'

function AboutUsPage() {
	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />

			<main className='flex-grow'>
				<div className='relative flex h-[70vh] items-center justify-center bg-black pt-24'>
					<div className='absolute inset-0 bg-black' />
					<div className='relative z-10 px-4 text-center'>
						<h1 className='mb-4 text-5xl font-extrabold text-white md:text-7xl'>
							Our Universe
						</h1>
						<p className='text-xl text-gray-300 md:text-2xl'>
							Discover the Story Behind KEMET
						</p>
					</div>
				</div>

				{/* tighter vertical spacing */}
				<div className='container mx-auto space-y-12 px-6 py-16 md:space-y-16 md:py-20'>
					{/* Who We Are */}
					<div className='grid items-center gap-12 md:grid-cols-2'>
						<div className='order-2 md:order-1'>
							<Clapperboard className='mb-4 h-12 w-12 text-purple-600 dark:text-purple-400' />
							<h2 className='mb-4 text-3xl font-bold text-zinc-900 dark:text-white'>
								Who We Are
							</h2>
							<p className='text-lg leading-relaxed text-zinc-600 dark:text-zinc-300'>
								KEMET is a premier streaming service born from a passion for
								powerful storytelling. We are a collective of creators,
								innovators, and cinephiles dedicated to bringing unique and
								compelling narratives from around the world directly to you. We
								believe in the power of film to inspire, challenge, and connect
								us all.
							</p>
						</div>
						<div className='order-1 md:order-2'>
							<img
								src={kemetDevices}
								alt='Creative team collaborating'
								className='rounded-lg'
							/>
						</div>
					</div>

					{/* Mission */}
					<div className='grid items-center gap-12 md:grid-cols-2'>
						<div>
							<img
								src={kemetSlides}
								alt='Passionate creator at work'
								className='rounded-lg'
							/>
						</div>
						<div>
							<Rocket className='mb-4 h-12 w-12 text-purple-600 dark:text-purple-400' />
							<h2 className='mb-4 text-3xl font-bold text-zinc-900 dark:text-white'>
								Our Mission: Passion Drives Us
							</h2>
							<p className='text-lg leading-relaxed text-zinc-600 dark:text-zinc-300'>
								Our core philosophy is simple: "We are passionate creatives
								first and foremost. Money is great, sure, but Story is what
								drives us." This belief is at the heart of everything we do. We
								prioritize authentic, creator-driven content over mass-produced
								media.
							</p>
						</div>
					</div>

					{/* Social Cinema */}
					<div className='mx-auto max-w-4xl text-center'>
						<Handshake className='mx-auto mb-4 h-12 w-12 text-purple-600 dark:text-purple-400' />
						<h2 className='mb-4 text-3xl font-bold text-zinc-900 dark:text-white'>
							A Cinematic Revolution
						</h2>
						<p className='mb-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300'>
							Welcome to Social Cinema. KEMET is more than just a streaming
							platform; it's a community and a movement. We are building a space
							where audiences can engage deeply with stories and where
							filmmakers are empowered to realize their visions without
							compromise.
						</p>
						<button className='rounded-lg bg-purple-600 px-8 py-4 font-extrabold text-white transition-transform hover:scale-105 hover:bg-purple-700'>
							JOIN THE MOVEMENT
						</button>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default AboutUsPage
