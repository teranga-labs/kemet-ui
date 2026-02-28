import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import Footer from '../../components/layout/Footer.tsx'
import Header from '../../components/layout/Header.tsx'

const faqData = [
	{
		question: 'How do I start my subscription?',
		answer:
			"You can start your subscription by signing up on our website, choosing a plan that suits you, and providing a valid payment method. You'll get instant access to our entire library."
	},
	{
		question: 'What devices can I watch KEMET on?',
		answer:
			'KEMET is available on a wide range of devices, including web browsers on PC and Mac, iOS and Android phones and tablets, Apple TV, Android TV, Roku, and Samsung Smart TV.'
	},
	{
		question: 'How do I cancel my subscription?',
		answer:
			"You can cancel your subscription at any time by navigating to your 'Account' page and selecting 'Cancel Membership'. Your access will continue until the end of your current billing period."
	},
	{
		question: 'Can I download content to watch offline?',
		answer:
			"Yes, on our mobile apps (iOS and Android), you can download most of our content to watch offline, perfect for when you're on the go."
	}
]

type AccordionItemProps = {
	question: string
	answer: string
}

function AccordionItem({ question, answer }: AccordionItemProps) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='border-b border-zinc-200 dark:border-zinc-700'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex w-full items-center justify-between py-6 text-left'
			>
				<h3 className='text-xl font-semibold text-zinc-900 dark:text-white'>
					{question}
				</h3>
				<ChevronDown
					className={`h-6 w-6 transform text-purple-600 transition-transform duration-300 dark:text-purple-400 ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>
			<div
				className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
					isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
				}`}
			>
				<div className='overflow-hidden'>
					<p className='pr-6 pb-6 text-lg text-zinc-600 dark:text-zinc-300'>
						{answer}
					</p>
				</div>
			</div>
		</div>
	)
}

function InfoCenterPage() {
	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />

			<main className='flex-grow py-24 pt-48 pb-24'>
				<div className='container mx-auto px-6'>
					<header className='mb-12 text-center'>
						<h1 className='mb-4 text-5xl font-extrabold text-zinc-900 md:text-6xl dark:text-white'>
							Info Center
						</h1>
						<p className='text-xl text-zinc-500 dark:text-gray-400'>
							Answers to your most common questions.
						</p>
					</header>

					<div className='mx-auto max-w-4xl'>
						{faqData.map((item, index) => (
							<AccordionItem
								key={index}
								question={item.question}
								answer={item.answer}
							/>
						))}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default InfoCenterPage
