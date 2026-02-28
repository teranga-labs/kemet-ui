import Footer from '../../components/layout/Footer.tsx'
import Header from '../../components/layout/Header.tsx'

function LegalNoticePage() {
	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />

			<main className='flex-grow py-24 pt-48 pb-24'>
				<div className='container mx-auto px-6'>
					<header className='mx-auto mb-12 max-w-4xl'>
						<h1 className='mb-2 text-4xl font-extrabold text-zinc-900 md:text-5xl dark:text-white'>
							Legal Notice
						</h1>
					</header>

					<div className='prose prose-lg dark:prose-invert prose-a:text-purple-600 hover:prose-a:text-purple-800 dark:prose-a:text-purple-400 dark:hover:prose-a:text-purple-300 mx-auto max-w-4xl'>
						<section>
							<h2>Provider Information</h2>
							<p>
								KEMET Streaming Services Inc.
								<br />
								123 Cinema Avenue
								<br />
								Dakar, Senegal
								<br />
								<strong>Represented by:</strong> Teranga AI
							</p>
						</section>

						<section>
							<h2>Contact Information</h2>
							<p>
								<strong>Phone:</strong> +1 111-111-1111
								<br />
								<strong>Email:</strong>{' '}
								<a href='mailto:legal@kemet.com'>legal@kemet.com</a>
							</p>
						</section>

						<section>
							<h2>Disclaimer</h2>
							<p>
								The content on our service is for personal entertainment
								purposes only. KEMET is not responsible for the content of
								external websites linked to from our service. The inclusion of
								any link does not imply endorsement by KEMET of the site. Use of
								any such linked website is at the user's own risk.
							</p>
						</section>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default LegalNoticePage
