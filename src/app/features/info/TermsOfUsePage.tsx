import Footer from '../../components/layout/Footer.tsx'
import Header from '../../components/layout/Header.tsx'

function TermsOfUsePage() {

	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />

			<main className='flex-grow py-24 pt-48 pb-24'>
				<div className='container mx-auto px-6'>
					<header className='mx-auto mb-12 max-w-4xl'>
						<h1 className='mb-2 text-4xl font-extrabold text-zinc-900 md:text-5xl dark:text-white'>
							Terms of Use
						</h1>
						<p className='text-lg text-zinc-500 dark:text-gray-500'>
							Last Updated: September 26, 2025
						</p>
					</header>

					<div className='prose prose-lg dark:prose-invert prose-a:text-purple-600 hover:prose-a:text-purple-800 dark:prose-a:text-purple-400 dark:hover:prose-a:text-purple-300 mx-auto max-w-4xl'>
						<section>
							<h2>1. Agreement to Terms</h2>
							<p>
								By accessing or using the KEMET streaming service, website,
								applications, or other products (collectively, the "Service"),
								you agree to be bound by these Terms of Use ("Terms"). If you do
								not agree to these Terms, do not use the Service.
							</p>
						</section>

						<section>
							<h2>2. The Service</h2>
							<p>
								The Service allows you to access and view movies, series, and
								other audiovisual content ("Content") streamed over the Internet
								to certain Internet-connected devices. The Service is for your
								personal, non-commercial use only and may not be shared with
								individuals beyond your household.
							</p>
						</section>

						<section>
							<h2>3. Subscription and Billing</h2>
							<p>
								Your KEMET subscription will continue until terminated. To use
								the Service, you must provide one or more Payment Methods. You
								authorize us to charge any Payment Method associated with your
								account in case your primary Payment Method is declined or no
								longer available to us for payment of your subscription fee.
							</p>
						</section>

						<section>
							<h2>4. Prohibited Conduct</h2>
							<p>
								You agree not to archive, reproduce, distribute, modify,
								display, perform, publish, license, create derivative works
								from, offer for sale, or use content and information contained
								on or obtained from or through the Service without express
								written permission from KEMET.
							</p>
						</section>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default TermsOfUsePage
