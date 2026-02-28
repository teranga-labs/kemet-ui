import { Film, Mail, Megaphone } from 'lucide-react'

import Footer from '../../components/layout/Footer.tsx'
import Header from '../../components/layout/Header.tsx'

function ContactUsPage() {
	const contactMethods = [
		{
			icon: (
				<Mail className='mx-auto mb-4 h-10 w-10 text-purple-600 dark:text-purple-400' />
			),
			title: 'General Inquiries',
			description:
				'For any general questions, feedback, or comments about our service, please reach out.',
			email: 'support@kemet.com'
		},
		{
			icon: (
				<Film className='mx-auto mb-4 h-10 w-10 text-purple-600 dark:text-purple-400' />
			),
			title: 'Partner Program',
			description:
				'Filmmakers and creators interested in joining our platform, contact our content acquisition team.',
			email: 'partners@kemet.com'
		},
		{
			icon: (
				<Megaphone className='mx-auto mb-4 h-10 w-10 text-purple-600 dark:text-purple-400' />
			),
			title: 'Press & Media',
			description:
				'For all press inquiries, please contact our media relations department.',
			email: 'press@kemet.com'
		}
	]

	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />

			<main className='flex flex-grow items-center py-24 pt-32'>
				<div className='container mx-auto px-6'>
					<header className='mb-16 text-center'>
						<h1 className='mb-4 text-5xl font-extrabold text-zinc-900 md:text-6xl dark:text-white'>
							Get in Touch
						</h1>
						<p className='text-xl text-zinc-500 dark:text-gray-400'>
							We’d love to hear from you.
						</p>
					</header>

					<div className='mx-auto grid max-w-6xl gap-8 md:grid-cols-3'>
						{contactMethods.map((method) => (
							<div
								key={method.title}
								className='rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center transition-all duration-300 hover:border-purple-500 dark:border-zinc-700 dark:bg-zinc-800/50'
							>
								{method.icon}
								<h2 className='mb-3 text-2xl font-bold text-zinc-900 dark:text-white'>
									{method.title}
								</h2>
								<p className='mb-6 text-zinc-600 dark:text-gray-400'>
									{method.description}
								</p>
								<a
									href={`mailto:${method.email}`}
									className='text-lg font-semibold text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300'
								>
									{method.email}
								</a>
							</div>
						))}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default ContactUsPage
