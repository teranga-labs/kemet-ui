import baobabs from '/images/banners/baobabs.jpg'
import logoWhite from '/images/misc/KEMET White Bigger.png'
import { Eye, EyeOff } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import Footer from '../../components/layout/Footer.tsx'
import type { User } from '../../contexts/AuthContext.ts'
import { ThemeContext } from '../../contexts/ThemeContext.ts'
import { useAuth } from '../../hooks/useAuth.ts'

function SignupPage() {
	const { t } = useTranslation()
	const { login } = useAuth()
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const themeContext = useContext(ThemeContext)
	if (!themeContext) {
		throw new Error('SignupPage must be used within a ThemeProvider')
	}
	const { theme } = themeContext
	const currentLogo = theme === 'dark' ? logoWhite : logoWhite

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const newUserId = 'user-' + Date.now()
		const newUserName = email.split('@')[0] || 'New User'
		const newUser: User = {
			id: newUserId,
			name: newUserName,
			email: email,
			subscriptionPlan: null,
			role: 'viewer',
			profiles: [
				{
					id: `p-${newUserId}`,
					name: newUserName,
					avatar: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Max',
					isKid: false
				}
			]
		}
		login(newUser)
		navigate('/')
	}

	return (
		<div className='relative flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<div className='relative flex-grow'>
				<div
					className='absolute inset-0 z-0 bg-cover bg-center'
					style={{ backgroundImage: `url(${baobabs})` }}
				/>
				<div className='absolute inset-0 z-0 bg-black/70'></div>

				<nav className='relative z-10 w-full p-4 sm:p-6'>
					<Link to='/' className='flex items-center space-x-3'>
						<img src={currentLogo} alt='KEMET Logo' className='h-16 w-auto' />
					</Link>
				</nav>

				<div className='relative z-10 flex flex-grow items-center justify-center p-4'>
					<div className='mb-6 w-full max-w-lg rounded-lg border border-gray-300 bg-white p-6 shadow-lg backdrop-blur-sm sm:p-8 dark:border-zinc-700 dark:bg-zinc-950'>
						<div className='mb-6 text-center sm:mb-8'>
							{/* 3. Translate all text */}
							<h1 className='text-2xl font-bold text-black sm:text-3xl dark:text-white'>
								{t('auth.signUp.title')}
							</h1>
							<p className='mt-2 text-sm text-gray-800 sm:text-base dark:text-gray-300'>
								{t('auth.signUp.subtitle')}
							</p>
						</div>

						<form className='space-y-4 sm:space-y-6' onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor='email'
									className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200'
								>
									{t('auth.emailLabel')}
								</label>
								<input
									type='email'
									id='email'
									className='w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-black focus:ring-2 focus:ring-purple-500 focus:outline-none sm:py-3 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									placeholder={t('auth.emailPlaceholder')}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>

							<div>
								<label
									htmlFor='password'
									className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200'
								>
									{t('auth.passwordLabel')}
								</label>
								<div className='relative'>
									<input
										type={showPassword ? 'text' : 'password'}
										id='password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className='w-full rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-black focus:ring-2 focus:ring-purple-500 focus:outline-none sm:py-3 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
										placeholder={t('auth.passwordPlaceholder')}
										required
									/>
									<button
										type='button'
										className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
										onClick={togglePasswordVisibility}
									>
										{showPassword ? (
											<EyeOff className='h-5 w-5' />
										) : (
											<Eye className='h-5 w-5' />
										)}
									</button>
								</div>
							</div>

							<div className='text-xs text-gray-600 dark:text-gray-400'>
								<p>
									<Trans
										i18nKey='auth.recaptcha'
										components={{
											1: (
												<a
													href='#'
													target='_blank'
													rel='noopener noreferrer'
													className='text-purple-600 hover:underline dark:text-purple-400'
												/>
											)
										}}
									/>
								</p>
							</div>

							<button
								type='submit'
								className='w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-purple-700 sm:py-3 sm:text-base'
							>
								{t('auth.signUp.button')}
							</button>
						</form>

						<div className='mt-4 text-center sm:mt-6'>
							<p className='text-xs text-gray-700 sm:text-sm dark:text-gray-300'>
								<Trans
									i18nKey='auth.signUp.hasAccount'
									components={{
										1: (
											<Link
												to='/signin'
												className='font-medium text-purple-600 hover:underline dark:text-purple-400'
											/>
										)
									}}
								/>
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default SignupPage
