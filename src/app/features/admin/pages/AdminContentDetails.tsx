import {
	ArrowLeft,
	Award,
	BookOpen,
	Calendar,
	Camera,
	CheckCircle,
	Clock,
	DollarSign,
	Edit,
	Eye,
	Film,
	Globe,
	Hash,
	Heart,
	Languages,
	List,
	Star,
	Tag,
	Users,
	XCircle
} from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

import type { MediaItem } from '../../../../data/shows.ts'

interface AdminContentDetailsProps {
	item: MediaItem
	onEditRequest: (id: number) => void
	onBack: () => void
}

const DetailItem = ({
	icon,
	label,
	children
}: {
	icon: React.ReactNode
	label: string
	children: React.ReactNode
}) => (
	<div className='mb-3 flex items-start text-sm'>
		<div className='-mt-1 mr-2 w-6 flex-shrink-0 text-gray-500 dark:text-gray-400'>
			{icon}
		</div>
		<div className='w-28 font-semibold text-gray-800 dark:text-gray-200'>
			{label}:
		</div>
		<div className='flex-1 text-gray-600 dark:text-gray-300'>{children}</div>
	</div>
)

const StatCard = ({
	icon,
	label,
	value
}: {
	icon: React.ReactNode
	label: string
	value: string | number
}) => (
	<div className='flex items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800'>
		<div className='mr-4 text-purple-600 dark:text-purple-400'>{icon}</div>
		<div>
			<p className='text-xs font-bold text-gray-500 uppercase dark:text-gray-400'>
				{label}
			</p>
			<p className='text-xl font-bold text-gray-900 dark:text-white'>{value}</p>
		</div>
	</div>
)

function AdminContentDetails({
	item,
	onEditRequest,
	onBack
}: AdminContentDetailsProps) {
	const status = (item as any).status || 'published'

	return (
		<div className='animate-fade-in'>
			<div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
				<div>
					<button
						onClick={onBack}
						className='mb-2 flex items-center text-sm font-semibold text-purple-600 hover:underline dark:text-purple-400'
					>
						<ArrowLeft size={16} className='mr-1' />
						Back to Content Library
					</button>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
						{item.title}
					</h2>
					<div
						className={`mt-2 flex w-fit items-center rounded-full px-2 py-1 text-xs font-bold ${status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}`}
					>
						{status === 'published' ? (
							<CheckCircle size={14} className='mr-1' />
						) : (
							<XCircle size={14} className='mr-1' />
						)}
						{status.toUpperCase()}
					</div>
				</div>
				<div className='flex w-full items-center space-x-3 sm:w-auto'>
					<Link
						to={`/details/${item.id}`}
						target='_blank'
						className='flex flex-1 items-center justify-center space-x-2 rounded-lg bg-gray-200 px-4 py-3 text-center text-black transition-colors hover:bg-gray-300 sm:flex-none dark:bg-zinc-700/80 dark:text-gray-200 dark:hover:bg-zinc-600'
					>
						<Eye size={18} /> <span>View Public Page</span>
					</Link>
					<button
						onClick={() => onEditRequest(item.id)}
						className='flex flex-1 items-center justify-center space-x-2 rounded-lg bg-purple-600 px-4 py-3 text-center text-white transition-colors hover:bg-purple-700 sm:flex-none'
					>
						<Edit size={18} /> <span>Edit Content</span>
					</button>
				</div>
			</div>
			<div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-4'>
				<StatCard
					icon={<Eye size={24} />}
					label='Total Views'
					value={item.totalViews?.toLocaleString() || 'N/A'}
				/>
				<StatCard
					icon={<DollarSign size={24} />}
					label='Lifetime Earnings (FCFA)'
					value={item.lifetimeEarnings?.toLocaleString() || 'N/A'}
				/>
				<StatCard
					icon={<Star size={24} />}
					label='Rating'
					value={item.rating || 'N/A'}
				/>
				<StatCard
					icon={<Heart size={24} />}
					label='Likes'
					value={item.totalLikes || 'N/A'}
				/>
			</div>
			<div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
				<div className='lg:col-span-1'>
					<img
						src={item.posterUrl}
						alt={item.title}
						className='aspect-[2/3] w-full rounded-lg object-cover shadow-lg'
					/>
				</div>

				<div className='lg:col-span-2'>
					<div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800/50'>
						<h3 className='mb-6 border-b border-b-gray-200 pb-2 text-lg font-semibold text-gray-900 dark:border-zinc-600 dark:text-white'>
							Content Details
						</h3>

						<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
							{/* Column 1: Primary Information */}
							<div>
								<h4 className='mb-5 text-sm font-medium tracking-wide text-gray-800 uppercase dark:text-gray-300'>
									Primary Information
								</h4>
								<p className='mb-5 text-sm text-gray-700 dark:text-gray-300'>
									{item.description}
								</p>
								<DetailItem icon={<Hash />} label='Item ID'>
									{item.id}
								</DetailItem>
								<DetailItem icon={<Users />} label='Creator ID'>
									{item.creatorId || 'N/A'}
								</DetailItem>
								<DetailItem icon={<Calendar />} label='Release Date'>
									{item.releaseDate}
								</DetailItem>
								<DetailItem icon={<Clock />} label='Duration'>
									{item.duration || 'N/A'}
								</DetailItem>
								<DetailItem icon={<Camera />} label='Quality'>
									{item.quality || 'N/A'}
								</DetailItem>
							</div>

							{/* Column 2: Production & Categorization */}
							<div>
								<h4 className='mb-5 text-sm font-medium tracking-wide text-gray-800 uppercase dark:text-gray-300'>
									Production & Categorization
								</h4>
								<DetailItem icon={<Film />} label='Production'>
									{item.production}
								</DetailItem>
								<DetailItem icon={<Award />} label='Director'>
									{item.director || 'N/A'}
								</DetailItem>
								<DetailItem icon={<Globe />} label='Country'>
									{item.country}
								</DetailItem>
								<DetailItem icon={<Tag />} label='Type'>
									<span className='capitalize'>{item.type}</span>
								</DetailItem>
								<DetailItem icon={<List />} label='Genres'>
									{item.genres?.join(', ') || 'N/A'}
								</DetailItem>
								<DetailItem icon={<Star />} label='Features'>
									{item.features?.join(', ') || 'N/A'}
								</DetailItem>
							</div>
						</div>

						{/* Full-width section at bottom */}
						<div className='mt-6 border-t border-gray-200 pt-4 dark:border-zinc-600'>
							<h4 className='mb-5 text-sm font-medium tracking-wide text-gray-800 uppercase dark:text-gray-300'>
								Additional Details
							</h4>
							<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
								<DetailItem icon={<Users />} label='Cast'>
									{item.cast.join(', ')}
								</DetailItem>
								<DetailItem icon={<Languages />} label='Languages'>
									{item.languages?.join(', ') || 'N/A'}
								</DetailItem>
								<DetailItem icon={<BookOpen />} label='Video URL'>
									{item.videoUrl || 'Not Set'}
								</DetailItem>
								<DetailItem icon={<BookOpen />} label='Trailer URL'>
									{item.trailerUrl || 'Not Set'}
								</DetailItem>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminContentDetails
