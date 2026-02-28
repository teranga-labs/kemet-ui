import { HelpCircle } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
	const { t, i18n } = useTranslation()
	const currentYear = new Date().getFullYear()

	const handleLanguageChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const newLang = event.target.value
		i18n.changeLanguage(newLang).then()
	}

	return (
		<footer className='w-full bg-gray-100 py-8 dark:bg-black'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
					<div className='col-span-2 md:col-span-1'>
						<h3 className='mb-3 text-sm font-extrabold text-gray-900 md:text-lg dark:text-white'>
							{t('footer.inquiriesTitle')}
						</h3>
						<p className='text-xs font-bold text-gray-700 md:text-sm dark:text-gray-400'>
							{t('footer.inquiriesText')}
						</p>
					</div>
					<div className='col-span-1'>
						<h3 className='mb-3 text-sm font-extrabold text-gray-900 md:text-lg dark:text-white'>
							{t('footer.kemetUniverse')}
						</h3>
						<ul className='space-y-2 font-bold'>
							<li>
								<Link
									to='/about-us'
									className='text-xs text-gray-700 transition-colors hover:text-purple-700 md:text-sm dark:text-gray-300 dark:hover:text-purple-400'
								>
									{t('footer.whoWeAre')}
								</Link>
							</li>
							<li>
								<Link
									to='/about-us'
									className='text-xs text-gray-700 transition-colors hover:text-purple-700 md:text-sm dark:text-gray-300 dark:hover:text-purple-400'
								>
									{t('footer.ourUniverse')}
								</Link>
							</li>
							<li>
								<Link
									to='/manifesto'
									className='text-xs text-gray-700 transition-colors hover:text-purple-700 md:text-sm dark:text-gray-300 dark:hover:text-purple-400'
								>
									{t('footer.manifesto')}
								</Link>
							</li>
							<li>
								<Link
									to='/contact-us'
									className='text-xs text-gray-700 transition-colors hover:text-purple-700 md:text-sm dark:text-gray-300 dark:hover:text-purple-400'
								>
									{t('footer.contactUs')}
								</Link>
							</li>
						</ul>
					</div>
					<div className='col-span-1'>
						<h3 className='mb-3 text-sm font-extrabold text-gray-900 md:text-lg dark:text-white'>
							{t('footer.support')}
						</h3>
						<ul className='space-y-2 font-bold'>
							<li>
								<Link
									to='/partner-program'
									className='text-xs text-gray-700 transition-colors hover:text-purple-700 md:text-sm dark:text-gray-300 dark:hover:text-purple-400'
								>
									{t('footer.partnerProgram')}
								</Link>
							</li>
							<li>
								<Link
									to='/info'
									className='text-xs text-gray-700 transition-colors hover:text-purple-700 md:text-sm dark:text-gray-300 dark:hover:text-purple-400'
								>
									{t('footer.infoCenter')}
								</Link>
							</li>
							<li>
								<Link
									to='/support-chat'
									className='inline-flex items-center gap-1 text-xs text-gray-700 transition-colors hover:text-purple-700 md:text-sm dark:text-gray-300 dark:hover:text-purple-400'
								>
									{t('footer.supportChat')} <HelpCircle className='h-4 w-4' />
								</Link>
							</li>
							<li>
								<Link
									to='/account-info'
									className='text-xs text-gray-700 transition-colors hover:text-purple-700 md:text-sm dark:text-gray-300 dark:hover:text-purple-400'
								>
									{t('footer.account')}
								</Link>
							</li>
						</ul>
					</div>
					<div className='col-span-1'>
						<h3 className='mb-3 text-sm font-extrabold text-gray-900 md:text-lg dark:text-white'>
							{t('footer.legalese')}
						</h3>
						<ul className='space-y-2 font-bold'>
							<li>
								<Link
									to='/privacy-policy'
									className='text-xs text-gray-700 transition-colors hover:text-purple-700 md:text-sm dark:text-gray-300 dark:hover:text-purple-400'
								>
									{t('footer.privacyPolicy')}
								</Link>
							</li>
							<li>
								<Link
									to='/terms-of-use'
									className='text-xs text-gray-700 transition-colors hover:text-purple-700 md:text-sm dark:text-gray-300 dark:hover:text-purple-400'
								>
									{t('footer.termsOfUse')}
								</Link>
							</li>
							<li>
								<Link
									to='/legal-notice'
									className='text-xs text-gray-700 transition-colors hover:text-purple-700 md:text-sm dark:text-gray-300 dark:hover:text-purple-400'
								>
									{t('footer.legalNotice')}
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className='mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-300 pt-6 md:flex-row dark:border-gray-700'>
					<p className='order-2 text-center text-xs text-gray-600 md:order-1 md:text-left md:text-sm dark:text-gray-400'>
						{t('footer.copyright', { year: currentYear })}
					</p>

					<div className='order-1 flex items-center gap-4 md:order-2'>
						<span className='hidden text-xs text-gray-600 sm:block md:text-sm dark:text-gray-400'>
							{t('footer.welcome')}
						</span>
						<div className='relative w-full md:w-auto'>
							<select
								className='block w-full appearance-none rounded-sm border border-gray-300 bg-white py-2 pr-8 pl-4 text-xs text-black focus:ring-2 focus:ring-purple-500 focus:outline-none md:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200'
								onChange={handleLanguageChange}
								value={i18n.language.split('-')[0]}
							>
								<option value='en'>English</option>
								<option value='fr'>Français</option>
								<option value='wo'>Wolof</option>
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 dark:text-gray-400'></div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
