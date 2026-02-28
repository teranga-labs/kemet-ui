import Footer from '../../components/layout/Footer.tsx'
import Header from '../../components/layout/Header.tsx'

function PrivacyPolicyPage() {
	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />

			<main className='flex-grow py-24 pt-48 pb-24'>
				<div className='container mx-auto px-6'>
					<header className='mx-auto mb-12 max-w-4xl'>
						<h1 className='mb-2 text-4xl font-extrabold text-zinc-900 md:text-5xl dark:text-white'>
							Privacy Policy
						</h1>
						<p className='text-lg text-zinc-500 dark:text-gray-500'>
							Last Updated: September 26, 2025
						</p>
					</header>

					<div className='prose prose-lg dark:prose-invert prose-a:text-purple-600 hover:prose-a:text-purple-800 dark:prose-a:text-purple-400 dark:hover:prose-a:text-purple-300 mx-auto max-w-4xl'>
						<section>
							<h2>1. Introduction</h2>
							<p>
								Welcome to KEMET. We are committed to protecting your privacy
								and handling your data in an open and transparent manner. This
								privacy policy sets out how we collect, use, and protect any
								information that you give us when you use this service.
							</p>
						</section>

						<section>
							<h2>2. Information We Collect</h2>
							<p>
								We may collect the following information: your name, contact
								information including email address, payment information,
								demographic information such as postcode, preferences, and
								interests, and your viewing history and interactions with our
								service.
							</p>
						</section>

						<section>
							<h2>3. How We Use Your Information</h2>
							<p>
								We use the information we collect to understand your needs and
								provide you with a better service, and in particular for the
								following reasons: internal record keeping, to improve our
								products and services, to process your payments, to personalize
								your experience, and to send promotional emails about new
								content or other information which we think you may find
								interesting.
							</p>
						</section>

						<section>
							<h2>4. Security</h2>
							<p>
								We are committed to ensuring that your information is secure. In
								order to prevent unauthorized access or disclosure, we have put
								in place suitable physical, electronic, and managerial
								procedures to safeguard and secure the information we collect
								online.
							</p>
						</section>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default PrivacyPolicyPage
