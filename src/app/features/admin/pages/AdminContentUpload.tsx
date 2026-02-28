import { Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const useAuth = () => ({
	user: { id: 'admin-user-123' }
})

interface UploadContentFormProps {
	onSubmit?: (formData: {
		title: string
		posterUrl: string
		bannerUrl: string
		year: number
		releaseDate: string
		rating: string
		description: string
		quality: string
		features: string[]
		duration: string
		type: 'movie' | 'show' | 'original' | 'documentary'
		genres: string[]
		liveNow: boolean
		videoUrl: string
		trailerUrl: string
		cast: string[]
		production: string
		country: string
		languages: string[]
		director: string
		seasons: number
		episodes: number
		creatorId: string | undefined
		status: 'published' | 'draft'
	}) => void
}

const AdminContentUpload = ({ onSubmit }: UploadContentFormProps) => {
	const { user } = useAuth()

	const [currentStep, setCurrentStep] = useState(1)
	const steps = [
		'Basic Information',
		'Media Details',
		'Production Details',
		'Additional Information'
	]
	const totalSteps = steps.length

	const [formData, setFormData] = useState({
		title: '',
		posterUrl: '',
		bannerUrl: '',
		year: new Date().getFullYear(),
		releaseDate: '',
		rating: '',
		description: '',
		quality: '1080p HD',
		features: [] as string[],
		duration: '',
		type: 'movie' as 'movie' | 'show' | 'original' | 'documentary',
		genres: [] as string[],
		liveNow: false,
		videoUrl: '',
		trailerUrl: '',
		cast: [] as string[],
		production: '',
		country: '',
		languages: [] as string[],
		director: '',
		seasons: 1,
		episodes: 1,
		status: 'draft' as 'published' | 'draft'
	})

	const [currentFeature, setCurrentFeature] = useState('')
	const [currentGenre, setCurrentGenre] = useState('')
	const [currentCastMember, setCurrentCastMember] = useState('')
	const [currentLanguage, setCurrentLanguage] = useState('')

	useEffect(() => {
		return () => {
			if (formData.posterUrl && formData.posterUrl.startsWith('blob:')) {
				URL.revokeObjectURL(formData.posterUrl)
			}
			if (formData.bannerUrl && formData.bannerUrl.startsWith('blob:')) {
				URL.revokeObjectURL(formData.bannerUrl)
			}
		}
	}, [])

	const handleNext = () => {
		setCurrentStep((prev) => (prev < totalSteps ? prev + 1 : prev))
	}

	const handleBack = () => {
		setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev))
	}

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, type } = e.target

		if (type === 'file') {
			const file = (e.target as HTMLInputElement).files?.[0]

			const currentUrl = formData[name as 'posterUrl' | 'bannerUrl']

			if (file) {
				const previewUrl = URL.createObjectURL(file)
				setFormData((prev) => ({
					...prev,
					[name]: previewUrl
				}))
			} else {
				setFormData((prev) => ({
					...prev,
					[name]: ''
				}))
			}

			if (currentUrl && currentUrl.startsWith('blob:')) {
				URL.revokeObjectURL(currentUrl)
			}
		} else {
			const { value } = e.target
			const isCheckbox = type === 'checkbox'
			setFormData((prev) => ({
				...prev,
				[name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
			}))
		}
	}

	const handleAddItem = (
		field: 'features' | 'genres' | 'cast' | 'languages',
		value: string,
		setValue: React.Dispatch<React.SetStateAction<string>>
	) => {
		if (value.trim() && !formData[field].includes(value.trim())) {
			setFormData((prev) => ({
				...prev,
				[field]: [...prev[field], value.trim()]
			}))
			setValue('')
		}
	}

	const handleRemoveItem = (
		field: 'features' | 'genres' | 'cast' | 'languages',
		index: number
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: prev[field].filter((_, i) => i !== index)
		}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const submissionData = {
			...formData,
			creatorId: user?.id
		}

		if (onSubmit) {
			onSubmit(submissionData)
		} else {
			console.log('Submitting content:', submissionData)
			alert('Content submitted successfully!')
		}
	}

	const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100

	return (
		<div>
			<h2 className='mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
				Upload New Content <span className='text-purple-700'>.</span>
			</h2>
			<div className='space-y-8 rounded-lg border border-gray-200 bg-white p-8 shadow dark:border-zinc-800 dark:bg-zinc-900'>
				<div className='mb-8'>
					<div className='mb-2 flex justify-between'>
						{steps.map((title, index) => (
							<div
								key={title}
								className={`text-sm font-medium ${
									currentStep > index
										? 'text-purple-600 dark:text-purple-400'
										: 'text-gray-400 dark:text-gray-500'
								}`}
							>
								{title}
							</div>
						))}
					</div>
					<div className='h-2 w-full rounded-full bg-gray-200 dark:bg-zinc-700'>
						<div
							className='h-2 rounded-full bg-purple-600 transition-all duration-300 ease-in-out'
							style={{ width: `${progressPercentage}%` }}
						></div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className='space-y-10'>
					{currentStep === 1 && (
						<div className='animate-fade-in space-y-6'>
							<h3 className='border-b border-gray-200 pb-2 text-lg font-medium text-gray-900 dark:border-zinc-700 dark:text-white'>
								Basic Information
							</h3>
							<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Title *
									</label>
									<input
										type='text'
										name='title'
										value={formData.title}
										onChange={handleInputChange}
										required
										className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									/>
								</div>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Type *
									</label>
									<select
										name='type'
										value={formData.type}
										onChange={handleInputChange}
										className='h-13 w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									>
										<option value='movie'>Movie</option>
										<option value='show'>TV Show</option>
										<option value='documentary'>Documentary</option>
										<option value='original'>Kemet Original</option>
									</select>
								</div>
							</div>
							<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Poster Image
									</label>
									<input
										type='file'
										name='posterUrl'
										onChange={handleInputChange}
										accept='image/*'
										className='w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-purple-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-purple-700 hover:file:bg-purple-100 dark:text-gray-400 dark:file:bg-purple-900/50 dark:file:text-purple-300 dark:hover:file:bg-purple-800'
									/>
									{formData.posterUrl && (
										<img
											src={formData.posterUrl}
											alt='Poster Preview'
											className='mt-4 max-h-48 rounded-lg shadow-md'
										/>
									)}
								</div>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Banner Image
									</label>
									<input
										type='file'
										name='bannerUrl'
										onChange={handleInputChange}
										accept='image/*'
										className='w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-purple-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-purple-700 hover:file:bg-purple-100 dark:text-gray-400 dark:file:bg-purple-900/50 dark:file:text-purple-300 dark:hover:file:bg-purple-800'
									/>
									{formData.bannerUrl && (
										<img
											src={formData.bannerUrl}
											alt='Banner Preview'
											className='mt-4 max-h-48 w-full rounded-lg object-cover shadow-md'
										/>
									)}
								</div>
							</div>
							<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Year
									</label>
									<input
										type='number'
										name='year'
										value={formData.year}
										onChange={handleInputChange}
										className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									/>
								</div>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Release Date
									</label>
									<input
										type='date'
										name='releaseDate'
										value={formData.releaseDate}
										onChange={handleInputChange}
										className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									/>
								</div>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Rating
									</label>
									<input
										type='text'
										name='rating'
										value={formData.rating}
										onChange={handleInputChange}
										placeholder='e.g., PG-13, TV-MA'
										className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									/>
								</div>
							</div>
							<div>
								<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
									Description
								</label>
								<textarea
									name='description'
									value={formData.description}
									onChange={handleInputChange}
									rows={4}
									className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
								/>
							</div>
						</div>
					)}

					{currentStep === 2 && (
						<div className='animate-fade-in space-y-6'>
							<h3 className='border-b border-gray-200 pb-2 text-lg font-medium text-gray-900 dark:border-zinc-700 dark:text-white'>
								Media Details
							</h3>
							<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Quality
									</label>
									<select
										name='quality'
										value={formData.quality}
										onChange={handleInputChange}
										className='h-13 w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									>
										<option value='1080p HD'>1080p HD</option>
										<option value='4K UHD'>4K UHD</option>
										<option value='720p HD'>720p HD</option>
									</select>
								</div>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Duration
									</label>
									<input
										type='text'
										name='duration'
										value={formData.duration}
										onChange={handleInputChange}
										placeholder='e.g., 2h 15m or 45m'
										className='h-13 w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									/>
								</div>
								<div className='flex items-center md:self-end'>
									<label className='flex h-13 w-full cursor-pointer items-center rounded-md border border-gray-300 p-3 transition-colors hover:bg-gray-50 dark:border-zinc-600 dark:hover:bg-zinc-800/50'>
										<input
											type='checkbox'
											name='liveNow'
											checked={formData.liveNow}
											onChange={handleInputChange}
											className='mr-3 h-6 w-6 rounded border-gray-300 bg-gray-100 text-purple-600 focus:ring-purple-500 dark:border-zinc-500 dark:bg-zinc-700'
										/>
										<span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
											Is Live Now
										</span>
									</label>
								</div>
							</div>
							<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Video ID
									</label>
									<input
										type='url'
										name='videoUrl'
										value={formData.videoUrl}
										onChange={handleInputChange}
										className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									/>
								</div>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Trailer ID
									</label>
									<input
										type='url'
										name='trailerUrl'
										value={formData.trailerUrl}
										onChange={handleInputChange}
										className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									/>
								</div>
							</div>
							<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Status *
									</label>
									<select
										name='status'
										value={formData.status}
										onChange={handleInputChange}
										className='h-13 w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									>
										<option value='draft'>Draft</option>
										<option value='published'>Published</option>
									</select>
								</div>
							</div>
						</div>
					)}

					{currentStep === 3 && (
						<div className='animate-fade-in space-y-6'>
							<h3 className='border-b border-gray-200 pb-2 text-lg font-medium text-gray-900 dark:border-zinc-700 dark:text-white'>
								Production Details
							</h3>
							<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Production *
									</label>
									<input
										type='text'
										name='production'
										value={formData.production}
										onChange={handleInputChange}
										required
										className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									/>
								</div>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Country *
									</label>
									<input
										type='text'
										name='country'
										value={formData.country}
										onChange={handleInputChange}
										required
										className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									/>
								</div>
							</div>
							<div>
								<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
									Director
								</label>
								<input
									type='text'
									name='director'
									value={formData.director}
									onChange={handleInputChange}
									className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
								/>
							</div>
							{formData.type === 'show' && (
								<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
									<div>
										<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
											Seasons
										</label>
										<input
											type='number'
											name='seasons'
											value={formData.seasons}
											onChange={handleInputChange}
											min='1'
											className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
										/>
									</div>
									<div>
										<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
											Episodes
										</label>
										<input
											type='number'
											name='episodes'
											value={formData.episodes}
											onChange={handleInputChange}
											min='1'
											className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
										/>
									</div>
								</div>
							)}
						</div>
					)}

					{currentStep === 4 && (
						<div className='animate-fade-in space-y-6'>
							<h3 className='border-b border-gray-200 pb-2 text-lg font-medium text-gray-900 dark:border-zinc-700 dark:text-white'>
								Additional Information
							</h3>
							{[
								{
									field: 'features',
									label: 'Features',
									value: currentFeature,
									setValue: setCurrentFeature,
									placeholder: 'Add feature (e.g., CC, Atmos)'
								},
								{
									field: 'genres',
									label: 'Genres',
									value: currentGenre,
									setValue: setCurrentGenre,
									placeholder: 'Add genre'
								},
								{
									field: 'cast',
									label: 'Cast',
									value: currentCastMember,
									setValue: setCurrentCastMember,
									placeholder: 'Add cast member'
								},
								{
									field: 'languages',
									label: 'Languages',
									value: currentLanguage,
									setValue: setCurrentLanguage,
									placeholder: 'Add language'
								}
							].map(({ field, label, value, setValue, placeholder }) => (
								<div key={field} className='space-y-2'>
									<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
										{label}
									</label>
									<div className='flex'>
										<input
											type='text'
											value={value}
											onChange={(e) => setValue(e.target.value)}
											placeholder={placeholder}
											className='flex-1 rounded-md rounded-r-none border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
										/>
										<button
											type='button'
											onClick={() =>
												handleAddItem(field as any, value, setValue)
											}
											className='flex items-center justify-center rounded-r-md bg-purple-600 px-4 text-white transition-colors hover:bg-purple-700'
										>
											<Plus size={20} />
										</button>
									</div>
									<div className='mt-2 flex flex-wrap gap-2'>
										{(formData[field as keyof typeof formData] as string[]).map(
											(item, index) => (
												<span
													key={index}
													className='flex items-center rounded-full bg-purple-100 px-3 py-2 text-sm text-purple-800 dark:bg-purple-900/50 dark:text-purple-300'
												>
													{item}
													<button
														type='button'
														onClick={() =>
															handleRemoveItem(field as any, index)
														}
														className='ml-2 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300'
													>
														<X size={14} />
													</button>
												</span>
											)
										)}
									</div>
								</div>
							))}
						</div>
					)}

					<div className='flex items-center justify-between border-t border-gray-200 pt-6 dark:border-zinc-700'>
						<div>
							{currentStep > 1 && (
								<button
									type='button'
									onClick={handleBack}
									className='rounded-md border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-800'
								>
									Back
								</button>
							)}
						</div>
						<div>
							{currentStep < totalSteps ? (
								<button
									type='button'
									onClick={handleNext}
									className='rounded-md bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700'
								>
									Next
								</button>
							) : (
								<button
									type='submit'
									className='rounded-md bg-purple-600 px-6 py-3 text-lg font-bold text-white hover:bg-purple-700'
								>
									{formData.status === 'published'
										? 'Publish Content'
										: 'Save as Draft'}
								</button>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AdminContentUpload
