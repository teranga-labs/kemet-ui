import baobabs from '/images/banners/baobabs.jpg'
import logoWhite from '/images/misc/KEMET White Bigger.png'
import { Eye, EyeOff } from 'lucide-react'
import { type FormEvent, useContext, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import Footer from '../../components/layout/Footer.tsx'
import { ThemeContext } from '../../contexts/ThemeContext.ts'
import { useAuth } from '../../hooks/useAuth.ts'
import { useProfile } from '../../hooks/useProfile.ts'
import { useSubscription } from '../../hooks/useSubscription.ts'
import { mockUsers } from '../../../data/users.ts'

function SigninPage() {
	const { t } = useTranslation()
	const [showPassword, setShowPassword] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)

	const themeContext = useContext(ThemeContext)
	if (!themeContext) {
		throw new Error('SigninPage must be used within a ThemeProvider')
	}
	const { theme } = themeContext
	const currentLogo = theme === 'dark' ? logoWhite : logoWhite

	const navigate = useNavigate()
	const auth = useAuth()
	const subscription = useSubscription()
	const profile = useProfile()

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const handleSignIn = (e: FormEvent) => {
		e.preventDefault()
		setError(null)
		const foundUser = mockUsers.find(
			(user) => user.email === email && user.password_plaintext === password
		)
		if (foundUser) {
			auth.login({
				id: foundUser.id,
				name: foundUser.name,
				email: foundUser.email,
				subscriptionPlan: foundUser.subscriptionPlan,
				profiles: foundUser.profiles,
				role: foundUser.role
			})
			if (foundUser.subscriptionPlan)
				subscription.subscribe(foundUser.subscriptionPlan)
			else subscription.unsubscribe()
			if (foundUser.profiles.length > 0)
				profile.setActiveProfile(foundUser.profiles[0])
			navigate('/')
		} else {
			setError(t('auth.signIn.errorMessage'))
		}
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
							<h1 className='text-2xl font-bold text-black sm:text-3xl dark:text-white'>
								{t('auth.signIn.title')}
							</h1>
							<p className='mt-2 text-sm text-gray-800 sm:text-base dark:text-gray-300'>
								{t('auth.signIn.subtitle')}
							</p>
						</div>

						<form className='space-y-4 sm:space-y-6' onSubmit={handleSignIn}>
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
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-black focus:ring-2 focus:ring-purple-500 focus:outline-none sm:py-3 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white'
									placeholder={t('auth.emailPlaceholder')}
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

							{error && (
								<p className='text-center text-sm text-red-500 dark:text-red-400'>
									{error}
								</p>
							)}

							<div className='flex items-center justify-between'>
								<div className='flex items-center'>
									<input
										id='remember-me'
										type='checkbox'
										className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-purple-600 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-700'
									/>
									<label
										htmlFor='remember-me'
										className='ml-2 block text-xs text-gray-900 sm:text-sm dark:text-gray-300'
									>
										{t('auth.signIn.rememberMe')}
									</label>
								</div>
								<div className='text-xs sm:text-sm'>
									<a
										href='#'
										className='font-medium text-purple-600 hover:underline dark:text-purple-400'
									>
										{t('auth.signIn.forgotPassword')}
									</a>
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
								{t('auth.signIn.button')}
							</button>
						</form>

						<div className='mt-4 text-center sm:mt-6'>
							<p className='text-xs text-gray-700 sm:text-sm dark:text-gray-300'>
								<Trans
									i18nKey='auth.signIn.noAccount'
									components={{
										1: (
											<Link
												to='/signup'
												className='font-medium text-purple-600 hover:underline dark:text-purple-400'
											/>
										)
									}}
								/>
							</p>
						</div>
						<div className='mt-4 text-center text-xs text-gray-500 dark:text-gray-400'>
							<p>Try: daily@kemet.com / password123</p>
							<p>Or: weekly@kemet.com / password123</p>
							<p>Or: free@kemet.com / password123</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default SigninPage
