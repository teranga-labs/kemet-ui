import baobabs from '/images/banners/baobabs.jpg'
import logoBlack from '/images/misc/KEMET Black Bigger.png'
import logoWhite from '/images/misc/KEMET White Bigger.png'
import { ChevronLeft, Trash2, User } from 'lucide-react'
import { type FormEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Footer from '../../components/layout/Footer.tsx'
import { ThemeContext } from '../../contexts/ThemeContext.ts'
import { useAuth } from '../../hooks/useAuth.ts'

function EditProfilePage() {
	const { profileId } = useParams()
	const navigate = useNavigate()
	const { user, updateUser } = useAuth()

	const [name, setName] = useState('')
	const [avatar, setAvatar] = useState('')
	const [isKid, setIsKid] = useState(false)

	const themeContext = useContext(ThemeContext)
	if (!themeContext)
		throw new Error('Header must be used within a ThemeProvider')
	const { theme } = themeContext

	const currentLogo = theme === 'dark' ? logoWhite : logoBlack

	useEffect(() => {
		if (user && profileId) {
			const profileToEdit = user.profiles.find((p) => p.id === profileId)
			if (profileToEdit) {
				setName(profileToEdit.name)
				setAvatar(profileToEdit.avatar)
				setIsKid(!!profileToEdit.isKid)
			} else {
				navigate('/profiles')
			}
		}
	}, [user, profileId, navigate])

	const avatarOptions = [
		'https://api.dicebear.com/8.x/lorelei/svg?seed=Luna',
		'https://api.dicebear.com/8.x/lorelei/svg?seed=Jasper',
		'https://api.dicebear.com/8.x/lorelei/svg?seed=Mochi',
		'https://api.dicebear.com/8.x/lorelei/svg?seed=Felix',
		'https://api.dicebear.com/8.x/lorelei/svg?seed=Pepper',
		'https://api.dicebear.com/8.x/lorelei/svg?seed=Oscar'
	]

	const handleSave = (e: FormEvent) => {
		e.preventDefault()
		if (!user || !profileId || !name.trim()) return
		const updatedProfiles = user.profiles.map((p) =>
			p.id === profileId ? { ...p, name, avatar, isKid } : p
		)
		updateUser({ ...user, profiles: updatedProfiles })
		navigate('/profiles')
	}

	const handleDelete = () => {
		if (!user || !profileId) return
		if (user.profiles.length <= 1) {
			alert('You cannot delete the only profile on the account.')
			return
		}
		if (
			window.confirm(
				`Are you sure you want to delete the "${name}" profile? This cannot be undone.`
			)
		) {
			const updatedProfiles = user.profiles.filter((p) => p.id !== profileId)
			updateUser({ ...user, profiles: updatedProfiles })
			navigate('/profiles')
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
					<Link to='/profiles' className='flex items-center space-x-3'>
						<img src={currentLogo} alt='logo' width='64' height='64' />
					</Link>
				</nav>
				<div className='relative z-10 flex flex-grow flex-col items-center justify-center p-4'>
					<div className='mb-6 w-full max-w-md rounded-lg border border-gray-300 bg-white/90 p-6 shadow-lg backdrop-blur-sm sm:p-8 dark:border-zinc-700 dark:bg-black/70'>
						<Link
							to='/profiles'
							className='mb-6 flex items-center font-medium text-gray-800 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400'
						>
							<ChevronLeft size={20} className='mr-1' />
							<span>Back to profiles</span>
						</Link>
						<div className='mb-6 text-center'>
							<h1 className='mb-2 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white'>
								Edit Profile
							</h1>
							<p className='text-sm text-gray-700 dark:text-gray-300'>
								Customize this profile's details.
							</p>
						</div>
						<form onSubmit={handleSave}>
							<div className='mb-6'>
								<div className='mb-4 flex justify-center'>
									<div className='relative h-24 w-24 overflow-hidden rounded-lg border-2 border-purple-500 sm:h-32 sm:w-32'>
										<img
											src={avatar}
											alt='Selected avatar'
											className='h-full w-full object-cover'
										/>
										<div className='absolute inset-0 flex items-center justify-center bg-black/30'>
											<User className='h-8 w-8 text-white' />
										</div>
									</div>
								</div>
								<div className='mb-4 grid grid-cols-3 gap-2 sm:grid-cols-6'>
									{avatarOptions.map((option) => (
										<button
											type='button'
											key={option}
											onClick={() => setAvatar(option)}
											className={`aspect-square w-full overflow-hidden rounded-md transition-all ${
												avatar === option
													? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-white dark:ring-offset-black'
													: 'opacity-70 hover:opacity-100'
											}`}
										>
											<img
												src={option}
												alt='Avatar option'
												className='h-full w-full object-cover'
											/>
										</button>
									))}
								</div>
							</div>
							<div className='mb-6'>
								<label className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200'>
									Profile Name
								</label>
								<input
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
									className='w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-black focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									placeholder='Enter profile name'
								/>
							</div>
							<div className='mb-8 flex items-center'>
								<input
									type='checkbox'
									id='kid-profile'
									checked={isKid}
									onChange={(e) => setIsKid(e.target.checked)}
									className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-purple-600 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-700'
								/>
								<label
									htmlFor='kid-profile'
									className='ml-2 block text-sm text-gray-900 dark:text-gray-300'
								>
									Kid's profile? (Restricts mature content)
								</label>
							</div>
							<div className='space-y-3'>
								<button
									type='submit'
									disabled={!name.trim()}
									className='w-full rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-400 dark:disabled:bg-purple-800'
								>
									Save Changes
								</button>
								<button
									type='button'
									onClick={handleDelete}
									className='flex w-full items-center justify-center gap-2 rounded-lg border border-gray-400 bg-transparent px-4 py-2 font-medium text-red-500 transition-colors hover:border-red-500 hover:bg-red-500/10 dark:border-zinc-600'
								>
									<Trash2 className='h-4 w-4' />
									<span>Delete Profile</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default EditProfilePage
