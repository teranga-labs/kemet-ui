import { EyeOff, Pencil, Star } from 'lucide-react'
import React from 'react'

interface AdminMediaCardProps {
	id: number
	title: string
	posterUrl: string
	year?: number
	rating?: string
	onFeature: (id: number) => void
	onEdit: (id: number) => void
	onUnpublish: (id: number) => void
	onViewDetails: (id: number) => void
}

const AdminMediaCard = ({
	id,
	title,
	posterUrl,
	year,
	rating,
	onFeature,
	onEdit,
	onUnpublish,
	onViewDetails
}: AdminMediaCardProps) => {
	const handleActionClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		action: (id: number) => void
	) => {
		e.preventDefault()
		e.stopPropagation()
		action(id)
	}

	return (
		<div
			className='group relative w-full flex-shrink-0 cursor-pointer'
			onClick={() => onViewDetails(id)}
		>
			<div
				className={`relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl`}
			>
				<img
					src={posterUrl}
					alt={title}
					className='h-full w-full rounded-lg object-cover'
					onError={(e) => {
						e.currentTarget.src =
							'https://placehold.co/400x600/1a1a1a/ffffff?text=Image'
					}}
				/>

				<div className='absolute inset-0 flex flex-col justify-end rounded-lg bg-black/70 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
					<h3 className='line-clamp-2 text-lg font-bold text-white'>
						{title}
					</h3>

					{(year || rating) && (
						<div className='my-2 flex items-center space-x-2 text-sm text-gray-300'>
							{year && <span>{year}</span>}
							{rating && (
								<span className='flex items-center'>
									<Star className='mr-1 h-4 w-4 text-yellow-400' />
									{rating}
								</span>
							)}
						</div>
					)}

					<div className='mt-4 flex w-full items-center justify-center space-x-3'>
						<button
							onClick={(e) => handleActionClick(e, onFeature)}
							title='Feature Content'
							className='rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30'
						>
							<Star size={18} />
						</button>
						<button
							onClick={(e) => handleActionClick(e, onEdit)}
							title='Edit Details'
							className='rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30'
						>
							<Pencil size={18} />
						</button>
						<button
							onClick={(e) => handleActionClick(e, onUnpublish)}
							title='Unpublish'
							className='rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30'
						>
							<EyeOff size={18} />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminMediaCard
