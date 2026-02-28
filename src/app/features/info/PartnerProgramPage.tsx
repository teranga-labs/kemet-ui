import baobabs from '/images/banners/baobabs.jpg'
import kemetDevices from '/images/misc/KEMET Multidevices.png'
import {
	Camera,
	CheckCircle2,
	DollarSign,
	ExternalLink,
	Globe,
	Settings2,
	Sparkles
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'

function PartnerProgramPage() {
	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />

			<main className='flex-grow'>
				<div className='relative flex h-[60vh] items-center justify-center px-4 pt-24 text-center'>
					<img
						src={baobabs}
						alt='Filmmaker at work'
						className='absolute inset-0 h-full w-full object-cover'
					/>
					<div className='absolute inset-0 bg-black/40' />
					<div className='relative z-10'>
						<h1 className='mb-4 text-5xl font-extrabold text-white md:text-6xl'>
							Partner with KEMET{' '}
							<span className='text-purple-500' aria-hidden>
								•
							</span>
						</h1>
						<p className='mx-auto max-w-3xl text-xl text-gray-200 md:text-2xl dark:text-gray-300'>
							Join our cinematic revolution and share your story with the world.
						</p>
					</div>
				</div>

				<div className='container mx-auto space-y-16 px-6 py-20'>
					<section className='text-center'>
						<h2 className='mb-12 text-4xl font-bold text-zinc-900 dark:text-white'>
							Why Partner With Us?
						</h2>
						<div className='mx-auto grid max-w-6xl gap-10 md:grid-cols-3'>
							<div className='flex flex-col items-center'>
								<Sparkles className='mb-4 h-12 w-12 text-purple-600 dark:text-purple-400' />
								<h3 className='mb-2 text-2xl font-bold text-zinc-900 dark:text-white'>
									Artistic Integrity
								</h3>
								<p className='text-zinc-600 dark:text-gray-400'>
									We are a dedicated partner focused on your creative journey
									and artistic freedom.
								</p>
							</div>
							<div className='flex flex-col items-center'>
								<DollarSign className='mb-4 h-12 w-12 text-purple-600 dark:text-purple-400' />
								<h3 className='mb-2 text-2xl font-bold text-zinc-900 dark:text-white'>
									Fair Revenue
								</h3>
								<p className='text-zinc-600 dark:text-gray-400'>
									Our unique distribution model ensures fair and transparent
									revenue sharing.
								</p>
							</div>
							<div className='flex flex-col items-center'>
								<Globe className='mb-4 h-12 w-12 text-purple-600 dark:text-purple-400' />
								<h3 className='mb-2 text-2xl font-bold text-zinc-900 dark:text-white'>
									Global Stage
								</h3>
								<p className='text-zinc-600 dark:text-gray-400'>
									Showcase your work to a discerning global audience that
									celebrates independent film.
								</p>
							</div>
						</div>
					</section>

					{/* What We Look For */}
					<div className='grid items-center gap-12 md:grid-cols-2'>
						<div>
							<img
								src={kemetDevices}
								alt='Unique film still'
								className='rounded-lg'
							/>
						</div>
						<div>
							<h2 className='mb-4 text-3xl font-bold text-zinc-900 dark:text-white'>
								What We Look For
							</h2>
							<p className='text-lg leading-relaxed text-zinc-600 dark:text-zinc-300'>
								We are looking for bold, original, and thought-provoking
								content. Whether it's a feature film, a documentary, a series,
								or a short, we are interested in stories that have a strong
								voice and a unique perspective. If you are a passionate creator
								driven by story, we want to hear from you.
							</p>
						</div>
					</div>

					{/* MVP / Guidelines */}
					<section className='mx-auto max-w-6xl'>
						<h2 className='mb-6 text-3xl font-bold text-zinc-900 dark:text-white'>
							Submission Guidelines
						</h2>
						<div className='grid gap-6 md:grid-cols-3'>
							<div className='rounded-xl border border-zinc-200 p-6 dark:border-zinc-700'>
								<Camera className='mb-3 h-7 w-7 text-purple-600' />
								<h3 className='mb-1 text-xl font-semibold'>
									Cameras & Formats
								</h3>
								<p className='text-sm text-zinc-600 dark:text-zinc-300'>
									Prefer 4K capture where possible. Accepted codecs: ProRes,
									DNxHR, high-bitrate H.264/H.265. Provide a 4K or 1080p master
									and stereo + 5.1 if available.
								</p>
							</div>
							<div className='rounded-xl border border-zinc-200 p-6 dark:border-zinc-700'>
								<Settings2 className='mb-3 h-7 w-7 text-purple-600' />
								<h3 className='mb-1 text-xl font-semibold'>
									Quality & Delivery
								</h3>
								<p className='text-sm text-zinc-600 dark:text-zinc-300'>
									Clean dialogue, balanced mix, cleared music/footage. Include
									subtitles (EN/FR if available) and artwork (key art, banner,
									thumbnails).
								</p>
							</div>
							<div className='rounded-xl border border-zinc-200 p-6 dark:border-zinc-700'>
								<CheckCircle2 className='mb-3 h-7 w-7 text-purple-600' />
								<h3 className='mb-1 text-xl font-semibold'>Revenue Share</h3>
								<p className='text-sm text-zinc-600 dark:text-zinc-300'>
									Percentage varies based on overall quality and delivery
									readiness (mastering, captions, artwork). Final terms are
									confirmed during onboarding.
								</p>
							</div>
						</div>
					</section>

					{/* CTA */}
					<section className='mx-auto max-w-4xl rounded-lg bg-zinc-100 p-12 text-center dark:bg-zinc-800/50'>
						<h2 className='mb-4 text-3xl font-bold text-zinc-900 dark:text-white'>
							Ready to Submit?
						</h2>
						<p className='mb-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300'>
							If you believe your work is a fit for KEMET, we invite you to get
							in touch with our content acquisition team.
						</p>
						<div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
							<Link
								to='/contact-us'
								className='inline-block rounded-lg bg-purple-600 px-10 py-4 font-extrabold text-white transition-transform hover:scale-105 hover:bg-purple-700'
							>
								Contact Acquisitions
							</Link>
							<a
								href='https://www.wearekemet.com'
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-2 rounded-lg border border-purple-600 px-6 py-4 font-extrabold text-purple-600 transition-colors hover:bg-purple-600 hover:text-white'
								aria-label='Opens wearekemet.com in a new tab'
							>
								Visit wearekemet.com <ExternalLink className='h-5 w-5' />
							</a>
						</div>
						<p className='mt-3 text-sm text-zinc-500'>
							(Heads up: this opens an external site.)
						</p>
					</section>
				</div>
			</main>

			<Footer />
		</div>
	)
}

export default PartnerProgramPage
