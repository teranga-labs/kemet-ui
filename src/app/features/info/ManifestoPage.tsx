import { Film, Globe, Sparkles, Users } from 'lucide-react'

import Footer from '../../components/layout/Footer.tsx'
import Header from '../../components/layout/Header.tsx'

const manifestoPoints = [
	{
		icon: <Film className='h-12 w-12 text-purple-600 dark:text-purple-400' />,
		title: 'Story Above All',
		description:
			'We believe that story is the most powerful force for change and connection. We are committed to championing narratives that are authentic, brave, and resonant.'
	},
	{
		icon: (
			<Sparkles className='h-12 w-12 text-purple-600 dark:text-purple-400' />
		),
		title: 'Empowering Creators',
		description:
			'We exist to serve the vision of the filmmaker. We provide a platform where creative freedom is paramount, and artists are given the respect to create their best work.'
	},
	{
		icon: <Globe className='h-12 w-12 text-purple-600 dark:text-purple-400' />,
		title: 'A Global Stage for Unheard Voices',
		description:
			'Cinema should reflect the diversity of the human experience. We actively seek out and amplify stories from underrepresented communities and cultures.'
	},
	{
		icon: <Users className='h-12 w-12 text-purple-600 dark:text-purple-400' />,
		title: 'Cinema as a Social Experience',
		description:
			'We are redefining the viewing experience. Through interactive features and community engagement, we aim to make watching films a shared, social event.'
	}
]

function ManifestoPage() {
	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />

			<main className='mt-8 flex-grow'>
				<div className='container mx-auto px-6 py-24 pt-24'>
					<header className='mb-20 text-center'>
						<h1 className='mb-4 text-5xl font-extrabold text-zinc-900 md:text-6xl dark:text-white'>
							Our Manifesto
						</h1>
						<p className='text-xl text-zinc-500 dark:text-gray-400'>
							This is what we stand for.
						</p>
					</header>

					<div className='mx-auto max-w-5xl space-y-16'>
						{manifestoPoints.map((point, index) => (
							<div
								key={point.title}
								className='flex flex-col items-start gap-8 md:flex-row'
							>
								<div className='flex items-center gap-6'>
									<span className='text-6xl font-extrabold text-zinc-300 dark:text-zinc-700'>
										{`0${index + 1}`}
									</span>
									{point.icon}
								</div>
								<div className='md:ml-4'>
									<h2 className='mb-3 text-3xl font-bold text-zinc-900 dark:text-white'>
										{point.title}
									</h2>
									<p className='text-lg leading-relaxed text-zinc-600 dark:text-zinc-300'>
										{point.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default ManifestoPage
