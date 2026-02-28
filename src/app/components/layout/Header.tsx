import logoBlack from '/images/misc/KEMET Black Bigger.png'
import logoWhite from '/images/misc/KEMET White Bigger.png'
import {
	Bookmark,
	Check,
	ChevronDown,
	Crown,
	LogIn,
	Menu,
	Moon,
	Search,
	Shield,
	Sparkles,
	Sun,
	User,
	UserPlus,
	Users,
	Video,
	X
} from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext.ts'
import { ProfileContext } from '../../contexts/ProfileContext.ts'
import { ThemeContext } from '../../contexts/ThemeContext.ts'
import { useSearch } from '../../hooks/useSearch.ts'

function Header() {
	const { t } = useTranslation()
	const [isScrolled, setIsScrolled] = useState(false)
	const location = useLocation()
	const isTransparentPage = () => {
		return (
			location.pathname === '/' || location.pathname.startsWith('/details/')
		)
	}
	const [showProfileDropdown, setShowProfileDropdown] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [showAuthDropdown, setShowAuthDropdown] = useState(false)

	const themeContext = useContext(ThemeContext)
	if (!themeContext)
		throw new Error('Header must be used within a ThemeProvider')
	const { theme, toggleTheme } = themeContext

	const authContext = useContext(AuthContext)
	if (!authContext)
		throw new Error('Navbar must be used within an AuthProvider')
	const { isAuthenticated, user, logout } = authContext

	const profileContext = useContext(ProfileContext)
	if (!profileContext)
		throw new Error('Navbar must be used within a ProfileProvider')
	const { activeProfile, setActiveProfile } = profileContext

	const { handleToggleSearch } = useSearch()
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const handleMouseEnter = () => {
		setShowProfileDropdown(true)
	}
	const handleMouseLeave = () => {
		setShowProfileDropdown(false)
	}

	const handleLogout = () => {
		logout()
		setShowProfileDropdown(false)
	}
	const handleProfileSwitch = (profileId: string) => {
		const profileToSwitch = user?.profiles.find((p) => p.id === profileId)
		if (profileToSwitch) setActiveProfile(profileToSwitch)
		setShowProfileDropdown(false)
	}
	const isTransparent = isTransparentPage() && !isScrolled
	const currentLogo = isTransparent || theme === 'dark' ? logoWhite : logoBlack
	const navClasses = isTransparent
		? 'bg-transparent border-b-gray-500/20'
		: 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm border-b-gray-200 dark:border-b-zinc-800'
	const linkClasses = isTransparent
		? 'text-white hover:text-purple-300'
		: 'text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400'
	const iconClasses = isTransparent
		? 'text-white'
		: 'text-gray-800 dark:text-gray-200'
	const isViewer = user?.role === 'viewer'
	return (
		<nav
			className={`fixed top-0 z-50 w-full py-3 transition-all duration-300 ease-in-out ${navClasses}`}
		>
			<style>
				{`
           .search-input:focus {
            outline: none;
            box-shadow: none;
            }
            .search-input::-webkit-search-cancel-button {
                -webkit-appearance: none;
                height: 1em;
                width: 1em;
                background-color: rgba(255, 255, 255, 0.3);
                -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>");
                mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>");
                cursor: pointer;
                border-radius: 50%;
            }
        .search-input::-webkit-search-cancel-button:hover {
            background-color: rgba(255, 255, 255, 0.5);
        }
      `}
			</style>
			<div className='relative mt-2 flex w-full items-center justify-between px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center'>
					<button
						className={`lg:hidden ${iconClasses}`}
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
					<Link to='/' className='hidden items-center space-x-2 lg:flex'>
						<img src={currentLogo} alt='logo' className='h-16 w-auto' />
					</Link>
				</div>
				<Link
					to='/'
					className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden'
				>
					<img src={currentLogo} alt='logo' className='h-14 w-auto' />
				</Link>
				{/* Desktop navigation */}
				<div className='absolute left-1/2 hidden translate-x-[-72%] transform items-center space-x-3 lg:flex lg:space-x-6 xl:space-x-8'>
					<Link
						to='/movies'
						className={`text-xs font-extrabold whitespace-nowrap transition-colors lg:text-lg ${linkClasses}`}
					>
						{t('header.movies')}
					</Link>
					<Link
						to='/shows'
						className={`text-xs font-extrabold whitespace-nowrap transition-colors lg:text-lg ${linkClasses}`}
					>
						{t('header.shows')}
					</Link>
					<Link
						to='/live'
						className={`text-xs font-extrabold whitespace-nowrap transition-colors lg:text-lg ${linkClasses}`}
					>
						{t('header.live')}
					</Link>
					<Link
						to='/documentaries'
						className={`hidden text-xs font-extrabold whitespace-nowrap transition-colors lg:block lg:text-lg ${linkClasses}`}
					>
						{t('header.documentaries')}
					</Link>
					<Link
						to='/watch-party'
						className={`flex items-center text-xs font-extrabold whitespace-nowrap transition-colors lg:text-lg ${linkClasses}`}
					>
						<Users size={18} className='mr-1 hidden sm:inline' />
						<span className='mr-1 hidden sm:inline'>WATCH</span>{' '}
						{t('header.watchParty').split(' ')[1]}
					</Link>
					{user?.role === 'creator' && (
						<Link
							to='/creator'
							target='_blank'
							className={`flex items-center text-xs font-extrabold whitespace-nowrap transition-colors lg:text-lg ${linkClasses}`}
						>
							<Video size={18} className='mr-1 hidden sm:inline' />
							{t('header.creatorPortal')}
						</Link>
					)}
				</div>
				{/* Right side content */}
				<div className='flex items-center'>
					<button
						onClick={handleToggleSearch}
						className={`mr-4 hidden rounded-full p-2 transition-colors hover:bg-black/10 lg:block dark:hover:bg-white/10 ${iconClasses}`}
						aria-label='Open search field'
					>
						<Search className='hover:text-purple-600' size={24} />
					</button>
					{isAuthenticated ? (
						<div className='flex items-center space-x-2'>
							{user?.subscriptionPlan === null && (
								<Link
									to='/payment-flow'
									className='hidden items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-400 sm:flex'
								>
									<Crown size={16} className='mr-1.5' />
									{t('header.subscribe')}
								</Link>
							)}
							<div
								className='relative'
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							>
								<button
									onClick={() => setShowProfileDropdown((prev) => !prev)}
									className='flex items-center space-x-2 py-1 pr-1 pl-2 transition-colors lg:px-3'
								>
									<div
										className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-purple-700 ${
											isTransparent && !showProfileDropdown
												? 'bg-transparent'
												: 'bg-purple-700'
										}`}
									>
										<User size={24} />
									</div>
								</button>
								{showProfileDropdown && (
									<div className='absolute top-full right-0 z-50 w-64 rounded-md border border-gray-200 bg-white py-1 text-black shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-200'>
										<div className='mb-1 border-b border-gray-100 px-4 py-2 dark:border-zinc-700'>
											<p className='text-lg font-extrabold text-black dark:text-white'>
												{user?.name}
											</p>
											<p className='truncate text-xs text-gray-600 dark:text-gray-400'>
												{user?.email}
											</p>
											{activeProfile && (
												<div className='mt-2 flex items-center'>
													<img
														src={activeProfile.avatar}
														alt={activeProfile.name}
														className='mr-2 h-6 w-6 rounded-full'
													/>
													<span className='text-xs text-gray-600 dark:text-gray-400'>
														{t('header.viewingAs')} {activeProfile.name}{' '}
														{activeProfile.isKid && t('header.childProfile')}
													</span>
												</div>
											)}
											{user?.subscriptionPlan === null ? (
												<div className='mt-1'>
													<p className='text-xs text-red-600'>
														{t('header.noSubscription')}
													</p>
													<Link
														to='/payment-flow'
														className='mt-1 inline-block text-xs font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300'
														onClick={() => setShowProfileDropdown(false)}
													>
														{t('header.subscribeNowArrow')}
													</Link>
												</div>
											) : (
												<p className='mt-1 text-xs text-green-600 capitalize'>
													{t('header.subscriptionPlan', {
														plan: user?.subscriptionPlan
													})}
												</p>
											)}
										</div>
										<Link
											to='/saved'
											className='flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-zinc-800'
											onClick={() => setShowProfileDropdown(false)}
										>
											<Bookmark size={16} className='mr-2' />{' '}
											{t('header.savedContent')}
										</Link>
										{user?.profiles && user.profiles.length > 1 && (
											<>
												<div className='my-1 border-t border-gray-100 dark:border-zinc-700'></div>
												<div className='px-2 py-1'>
													<p className='px-2 py-1 text-xs text-gray-500 dark:text-gray-400'>
														{t('header.switchProfile')}
													</p>
													{user.profiles.map((profile) => (
														<button
															key={profile.id}
															onClick={() => handleProfileSwitch(profile.id)}
															className='flex w-full items-center rounded px-2 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-zinc-800'
														>
															<img
																src={profile.avatar}
																alt={profile.name}
																className='mr-2 h-8 w-8 rounded-full'
															/>
															<span className='flex-1'>
																{profile.name}{' '}
																{profile.isKid && t('header.childProfile')}
															</span>
															{activeProfile?.id === profile.id && (
																<Check size={16} className='text-purple-600' />
															)}
														</button>
													))}
												</div>
											</>
										)}
										{user?.subscriptionPlan === null && (
											<Link
												to='/payment-flow'
												className='flex items-center px-4 py-2 text-sm hover:bg-gray-100 sm:hidden dark:hover:bg-zinc-800'
												onClick={() => setShowProfileDropdown(false)}
											>
												<Crown size={16} className='mr-2' />{' '}
												{t('header.subscribeNow')}
											</Link>
										)}
										<Link
											to='/profiles'
											className='flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800'
											onClick={() => setShowProfileDropdown(false)}
										>
											<Users size={16} className='mr-2' />{' '}
											{t('header.manageProfiles')}
										</Link>
										{isViewer && (
											<Link
												to='/become-creator'
												className='flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800'
												onClick={() => setShowProfileDropdown(false)}
											>
												<Sparkles size={16} className='mr-2' />{' '}
												{t('header.becomeCreator')}
											</Link>
										)}
										{(user?.role === 'admin' || user?.role === 'creator') && (
											<div className='my-1 border-t border-gray-100 dark:border-zinc-700'></div>
										)}
										{user?.role === 'admin' && (
											<Link
												to='/admin'
												target='_blank'
												rel='noopener noreferrer'
												className='flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800'
												onClick={() => setShowProfileDropdown(false)}
											>
												<Shield size={16} className='mr-2' />{' '}
												{t('header.adminPortal')}
											</Link>
										)}
										{user?.role === 'creator' && (
											<Link
												to='/creator'
												target='_blank'
												rel='noopener noreferrer'
												className='flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800'
												onClick={() => setShowProfileDropdown(false)}
											>
												<Video size={16} className='mr-2' />{' '}
												{t('header.creatorPortal')}
											</Link>
										)}
										<div className='mt-1 border-t border-gray-100 dark:border-zinc-700'></div>
										<button
											onClick={handleLogout}
											className='flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-zinc-800'
										>
											<X size={16} className='mr-2' /> {t('header.logout')}
										</button>
									</div>
								)}
							</div>
							<button
								onClick={toggleTheme}
								className={`rounded-full p-2 transition-colors hover:bg-black/10 dark:hover:bg-white/10 ${iconClasses}`}
								aria-label='Toggle theme'
							>
								{theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
							</button>
						</div>
					) : (
						<div className='flex items-center'>
							{/* Desktop Auth Buttons & Theme Toggle */}
							<div className='hidden items-center space-x-3 lg:flex'>
								<Link
									to='/signin'
									className={`text-base font-bold transition-colors ${linkClasses} whitespace-nowrap`}
								>
									{t('header.signIn')}
								</Link>
								<Link
									to='/signup'
									className='rounded-md bg-purple-600 px-3 py-2 text-base font-bold whitespace-nowrap text-white transition-colors hover:bg-purple-700 lg:px-4'
								>
									{t('header.signUp')}
								</Link>
								<button
									onClick={toggleTheme}
									className={`rounded-full p-2 transition-colors hover:bg-black/10 dark:hover:bg-white/10 ${iconClasses}`}
									aria-label='Toggle theme'
								>
									{theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
								</button>
							</div>

							{/* Mobile Auth Dropdown & Theme Toggle */}
							<div className='flex items-center space-x-1 lg:hidden'>
								<div className='relative'>
									<button
										onClick={() => setShowAuthDropdown(!showAuthDropdown)}
										className='flex items-center space-x-1 py-1 pr-1 pl-2 transition-colors'
										aria-label='Open authentication menu'
									>
										<div
											className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-purple-700 ${
												isTransparent && !showAuthDropdown
													? 'bg-transparent'
													: 'bg-purple-700'
											}`}
										>
											<User size={24} />
										</div>
										<ChevronDown
											size={16}
											className={`transition-transform ${iconClasses} ${
												showAuthDropdown ? 'rotate-180' : ''
											}`}
										/>
									</button>
									{showAuthDropdown && (
										<div className='absolute top-full right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white py-3 shadow-lg dark:border-zinc-700 dark:bg-zinc-900'>
											<Link
												to='/signin'
												onClick={() => setShowAuthDropdown(false)}
												className='flex w-full items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-zinc-800'
											>
												<LogIn size={16} className='mr-2' />
												{t('header.signIn')}
											</Link>
											<Link
												to='/signup'
												onClick={() => setShowAuthDropdown(false)}
												className='flex w-full items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-zinc-800'
											>
												<UserPlus size={16} className='mr-2' />
												{t('header.signUp')}
											</Link>
										</div>
									)}
								</div>
								<button
									onClick={toggleTheme}
									className={`rounded-full p-2 transition-colors hover:bg-black/10 dark:hover:bg-white/10 ${iconClasses}`}
									aria-label='Toggle theme'
								>
									{theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
			{mobileMenuOpen && (
				<div className='border-t border-gray-200 bg-white/95 text-black backdrop-blur-sm lg:hidden dark:border-zinc-800 dark:bg-zinc-900/95 dark:text-white'>
					<div className='space-y-4 px-4 py-3'>
						<form className='flex items-center border-b border-gray-200 pb-2 dark:border-zinc-700'>
							<Search
								size={18}
								className='mr-2 text-gray-500 dark:text-gray-400'
							/>
							<input
								type='search'
								placeholder={t('header.searchPlaceholder')}
								className='search-input flex-1 border-none bg-transparent text-black placeholder-gray-500 outline-none dark:text-white dark:placeholder-gray-400'
							/>
						</form>
						<Link
							to='/movies'
							className='block py-2 text-sm font-bold transition-colors hover:text-purple-600 dark:hover:text-purple-400'
							onClick={() => setMobileMenuOpen(false)}
						>
							{t('header.movies')}
						</Link>
						<Link
							to='/shows'
							className='block py-2 text-sm font-bold transition-colors hover:text-purple-600 dark:hover:text-purple-400'
							onClick={() => setMobileMenuOpen(false)}
						>
							{t('header.shows')}
						</Link>
						<Link
							to='/live'
							className='block py-2 text-sm font-bold transition-colors hover:text-purple-600 dark:hover:text-purple-400'
							onClick={() => setMobileMenuOpen(false)}
						>
							{t('header.live')}
						</Link>
						<Link
							to='/documentaries'
							className='block py-2 text-sm font-bold transition-colors hover:text-purple-600 dark:hover:text-purple-400'
							onClick={() => setMobileMenuOpen(false)}
						>
							{t('header.documentaries')}
						</Link>
						<Link
							to='/watch-party'
							className='flex items-center py-2 text-sm font-bold transition-colors hover:text-purple-600 dark:hover:text-purple-400'
							onClick={() => setMobileMenuOpen(false)}
						>
							<Users size={16} className='mr-2' />
							{t('header.watchParty')}
						</Link>
						{isAuthenticated && isViewer && (
							<Link
								to='/become-creator'
								className='flex items-center py-2 text-sm font-bold transition-colors hover:text-purple-600 dark:hover:text-purple-400'
								onClick={() => setMobileMenuOpen(false)}
							>
								<Sparkles size={16} className='mr-2' />
								{t('header.becomeCreator')}
							</Link>
						)}
						{isAuthenticated && (
							<Link
								to='/saved'
								className='flex items-center py-2 text-sm font-bold transition-colors hover:text-purple-600 dark:hover:text-purple-400'
								onClick={() => setMobileMenuOpen(false)}
							>
								<Bookmark size={16} className='mr-2' />
								{t('header.savedContent')}
							</Link>
						)}
					</div>
				</div>
			)}
		</nav>
	)
}
export default Header
