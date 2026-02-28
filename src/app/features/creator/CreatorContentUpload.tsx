import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'

import { useAuth } from '../../hooks/useAuth.ts'

interface UploadContentFormProps {
	onSubmit?: (formData: any) => void
}

const CreatorContentUpload = ({ onSubmit }: UploadContentFormProps) => {
	const { user } = useAuth()

	// State to manage the current step of the wizard
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
		type: 'movie' as 'movie' | 'show' | 'original',
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

	// Navigation functions for the wizard
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
		const { name, value, type } = e.target
		setFormData((prev) => ({
			...prev,
			[name]:
				type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
		}))
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
			console.log('Sending for approval:', submissionData)
			alert('Content sent for approval successfully!')
		}
	}

	const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100

	return (
		<div>
			<h2 className='mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
				Upload New Content <span className='text-purple-700'>.</span>
			</h2>
			<div className='space-y-8 rounded-lg border border-gray-200 bg-white p-8 shadow dark:border-zinc-800 dark:bg-zinc-900'>
				{/* Step Indicator and Progress Bar */}
				<div className='mb-8'>
					<div className='mb-2 flex justify-between'>
						{steps.map((title, index) => (
							<div
								key={title}
								className={`text-sm font-medium ${currentStep > index ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400 dark:text-gray-500'}`}
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

				<form onSubmit={handleSubmit}>
					{/* Content is now rendered based on the current step */}

					{/* Step 1: Basic Information Section */}
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
										Poster URL
									</label>
									<input
										type='url'
										name='posterUrl'
										value={formData.posterUrl}
										onChange={handleInputChange}
										className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									/>
								</div>
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
										Banner URL
									</label>
									<input
										type='url'
										name='bannerUrl'
										value={formData.bannerUrl}
										onChange={handleInputChange}
										className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
									/>
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

					{/* Step 2: Media Details Section */}
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
										Video URL
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
										Trailer URL
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

					{/* Step 3: Production Details Section */}
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

					{/* Step 4: Additional Information Section */}
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
											className='rounded-r-md bg-purple-600 px-4 text-white transition-colors hover:bg-purple-700'
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

					{/* Navigation Buttons */}
					<div className='mt-10 flex items-center justify-between border-t border-gray-200 pt-8 dark:border-zinc-700'>
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
									Send for Approval
								</button>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreatorContentUpload
