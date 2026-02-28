import { BarChart3, Eye, Pencil, Trash2 } from 'lucide-react'
import React from 'react'

interface CreatorMediaCardProps {
	id: number
	title: string
	posterUrl: string
	year?: number
	totalViews?: number
	onEdit: (id: number) => void
	onAnalytics: (id: number) => void
	onDelete: (id: number) => void
}

const CreatorMediaCard = ({
	id,
	title,
	posterUrl,
	year,
	totalViews,
	onEdit,
	onAnalytics,
	onDelete
}: CreatorMediaCardProps) => {
	const handleActionClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		action: (id: number) => void
	) => {
		e.preventDefault()
		e.stopPropagation()
		action(id)
	}

	return (
		<div className='group relative w-full flex-shrink-0'>
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
					<h3 className='line-clamp-2 text-lg font-bold text-white'>{title}</h3>

					{(year || totalViews) && (
						<div className='my-2 flex items-center space-x-2 text-sm text-gray-300'>
							{year && <span>{year}</span>}
							{totalViews !== undefined && (
								<span className='flex items-center'>
									<Eye className='mr-1 h-4 w-4 text-gray-300' />
									{totalViews.toLocaleString()}
								</span>
							)}
						</div>
					)}

					{/* Creator-specific action buttons */}
					<div className='mt-4 flex w-full space-x-3'>
						<button
							onClick={(e) => handleActionClick(e, onEdit)}
							title='Edit Details'
							className='rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30'
						>
							<Pencil size={18} />
						</button>
						<button
							onClick={(e) => handleActionClick(e, onAnalytics)}
							title='View Analytics'
							className='rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30'
						>
							<BarChart3 size={18} />
						</button>
						<button
							onClick={(e) => handleActionClick(e, onDelete)}
							title='Delete Content'
							className='rounded-full bg-red-500/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-red-600/60'
						>
							<Trash2 size={18} />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreatorMediaCard
