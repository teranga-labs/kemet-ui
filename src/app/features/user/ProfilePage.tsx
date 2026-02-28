import baobabs from '/images/banners/baobabs.jpg'
import logoBlack from '/images/misc/KEMET Black Bigger.png'
import logoWhite from '/images/misc/KEMET White Bigger.png'
import { Edit, Plus, Settings } from 'lucide-react'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Footer from '../../components/layout/Footer.tsx'
import type { Profile } from '../../contexts/ProfileContext.ts'
import { ThemeContext } from '../../contexts/ThemeContext.ts'
import { useAuth } from '../../hooks/useAuth.ts'
import { useProfile } from '../../hooks/useProfile.ts'

function ProfilePage() {
	useNavigate()
	const { user } = useAuth()
	const { activeProfile, setActiveProfile } = useProfile()
	const [isEditMode, setIsEditMode] = useState(false)

	const themeContext = useContext(ThemeContext)
	if (!themeContext)
		throw new Error('Header must be used within a ThemeProvider')
	const { theme } = themeContext

	const currentLogo = theme === 'dark' ? logoWhite : logoBlack

	if (!user) {
		return (
			<div className='flex min-h-screen items-center justify-center bg-black text-white'>
				Loading...
			</div>
		)
	}

	const handleProfileSelection = (profile: Profile) => {
		setActiveProfile(profile)
	}

	return (
		<div className='relative flex min-h-screen flex-col'>
			{/* Background Section */}
			<div className='relative flex-grow'>
				<div
					className='absolute inset-0 z-0 bg-cover bg-center'
					style={{ backgroundImage: `url(${baobabs})` }}
				/>
				<div className='absolute inset-0 z-0 bg-black/70'></div>

				{/* Navbar */}
				<nav className='relative z-10 w-full p-4 sm:p-6'>
					<Link to='/' className='flex items-center space-x-3'>
						<img src={currentLogo} alt='logo' width='64' height='64' />
					</Link>
				</nav>

				{/* Main Content */}
				<div className='relative z-10 flex flex-grow flex-col items-center justify-center p-4'>
					<div className='mb-8 w-full max-w-4xl text-center sm:mb-12'>
						<h1 className='mb-4 text-3xl font-bold text-white sm:text-5xl'>
							{isEditMode ? 'Manage Profiles' : "Who's watching?"}
						</h1>

						{/* Profiles Grid */}
						<div className='my-8 flex flex-wrap justify-center gap-4 sm:gap-8'>
							{user.profiles.map((profile) => (
								<Link
									// Link destination depends on the mode
									to={isEditMode ? `/profiles/edit/${profile.id}` : '/'}
									key={profile.id}
									onClick={() => !isEditMode && handleProfileSelection(profile)}
									className='group flex flex-col items-center transition-transform hover:scale-105'
								>
									<div
										className={`relative h-24 w-24 overflow-hidden rounded-md border-2 sm:h-32 sm:w-32 ${
											!isEditMode && activeProfile?.id === profile.id
												? 'border-white'
												: 'border-transparent'
										} transition-all group-hover:border-white`}
									>
										<img
											src={profile.avatar}
											alt={profile.name}
											className='h-full w-full object-cover'
										/>
										{isEditMode && (
											<div className='absolute inset-0 flex items-center justify-center bg-black/50'>
												<Edit className='h-8 w-8 text-white' />
											</div>
										)}
									</div>
									<span className='mt-3 text-lg text-gray-300 group-hover:text-white'>
										{profile.name}
									</span>
								</Link>
							))}

							{/* Add Profile */}
							<Link
								to='/profiles/add'
								className='group flex flex-col items-center transition-transform hover:scale-105'
							>
								<div className='flex h-24 w-24 items-center justify-center rounded-md border-2 border-gray-600 bg-gray-800/50 transition-all group-hover:border-white sm:h-32 sm:w-32'>
									<Plus className='h-12 w-12 text-gray-400 group-hover:text-white' />
								</div>
								<span className='mt-3 text-lg text-gray-400 group-hover:text-white'>
									Add Profile
								</span>
							</Link>
						</div>

						{/* Management Buttons */}
						<div className='mt-8 flex justify-center gap-6'>
							<button
								onClick={() => setIsEditMode(!isEditMode)}
								className='flex items-center gap-2 rounded-md border border-gray-600 px-4 py-2 text-gray-300 transition-all hover:border-white hover:text-white'
							>
								<Edit className='h-5 w-5' />
								<span>{isEditMode ? 'Done' : 'Manage Profiles'}</span>
							</button>
							<Link
								to='/account/settings'
								className='flex items-center gap-2 rounded-md border border-gray-600 px-4 py-2 text-gray-300 transition-all hover:border-white hover:text-white'
							>
								<Settings className='h-5 w-5' />
								<span>Account Settings</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default ProfilePage
