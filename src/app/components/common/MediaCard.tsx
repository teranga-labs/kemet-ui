import { CheckCircle, Heart, PlayCircle, PlusCircle, Star } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useLikes } from '../../hooks/useLikes.ts'
import { useSavedContent } from '../../hooks/useSavedContent.ts'

interface MediaCardProps {
	id: number
	title: string
	posterUrl: string
	year?: number
	rating?: string
	description?: string
	aspectRatio?: string
	isLive?: boolean
	videoUrl: string
	vimeoId?: number
	quality?: string
	teaserUrl?: string
	onHoverChange?: (isHovered: boolean) => void
}

function MediaCard({
	id,
	title,
	posterUrl,
	year,
	rating,
	description,
	aspectRatio = 'aspect-[2/3]',
	isLive = false,
	videoUrl,
	vimeoId,
	teaserUrl,
	onHoverChange
}: MediaCardProps) {
	const navigate = useNavigate()
	const { isItemSaved, addSavedItem, removeSavedItem } = useSavedContent()
	const isSaved = isItemSaved(id)
	const { isItemLiked, addLikedItem, removeLikedItem } = useLikes()
	const isLiked = isItemLiked(id)

	const [isHovered, setIsHovered] = useState(false)
	const [hoverPosition, setHoverPosition] = useState({})
	const videoRef = useRef<HTMLVideoElement>(null)
	const cardRef = useRef<HTMLDivElement>(null)
	const hoverTimeoutRef = useRef<number | null>(null)

	const calculateHoverPosition = () => {
		if (!cardRef.current) return
		const card = cardRef.current
		const rect = card.getBoundingClientRect()
		const viewportWidth = window.innerWidth
		const viewportHeight = window.innerHeight

		const expandedWidth = 640
		const expandedHeight = 360

		let left = rect.left + rect.width / 2 - expandedWidth / 2
		let top = rect.top + rect.height / 2 - expandedHeight / 2

		if (left < 10) left = 10
		else if (left + expandedWidth > viewportWidth - 10)
			left = viewportWidth - expandedWidth - 10

		if (top < 10) top = 10
		else if (top + expandedHeight > viewportHeight - 10)
			top = viewportHeight - expandedHeight - 10

		setHoverPosition({ top: `${top}px`, left: `${left}px`, position: 'fixed' })
	}

	const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()
		isLiked ? removeLikedItem(id) : addLikedItem(id)
	}

	const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()
		isSaved ? removeSavedItem(id) : addSavedItem(id)
	}

	const handleMouseEnter = () => {
		if (teaserUrl) {
			calculateHoverPosition()
			hoverTimeoutRef.current = window.setTimeout(() => {
				setIsHovered(true)
				onHoverChange?.(true)
			}, 500)
		}
	}

	const handleMouseLeave = () => {
		if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
		setIsHovered(false)
		onHoverChange?.(false)
		if (videoRef.current) {
			videoRef.current.pause()
			videoRef.current.currentTime = 0
		}
	}

	useEffect(() => {
		if (isHovered && videoRef.current) {
			videoRef.current.play().catch(console.error)
		}
	}, [isHovered])

	useEffect(() => {
		const handleResize = () => {
			if (isHovered) {
				calculateHoverPosition()
			}
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
			if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
		}
	}, [isHovered])

	const handleNavigateToDetails = () => {
		navigate(`/details/${id}`, { state: { videoUrl } })
	}

	return (
		<div
			ref={cardRef}
			className='relative h-full w-full'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className={`${isHovered ? 'opacity-0' : 'opacity-100'}`}>
				<div
					onClick={handleNavigateToDetails}
					className='cursor-pointer'
					role='link'
					tabIndex={0}
				>
					<div
						className={`relative w-full overflow-hidden rounded-lg bg-zinc-800 ${aspectRatio}`}
					>
						<img
							src={posterUrl}
							alt={title}
							className='h-full w-full object-cover'
						/>
						{isLive && (
							<div className='absolute top-2 left-2 z-10 rounded bg-red-600 px-2 py-1 text-xs text-white'>
								LIVE
							</div>
						)}
					</div>
				</div>
				<div className='mt-2'>
					<h3 className='ml-1 line-clamp-1 font-semibold text-gray-900 dark:text-gray-100'>
						{title}
					</h3>
					<div className='mr-1 ml-1 flex items-center text-sm text-gray-500'>
						<span>{year}</span>
					</div>
				</div>
			</div>

			{/* --- Flyout --- */}
			<div
				className={`overflow-hidden rounded-lg bg-zinc-900 shadow-2xl ${
					isHovered
						? 'z-50 h-[360px] w-[640px] opacity-100'
						: 'pointer-events-none top-0 left-0 z-0 h-full w-full opacity-0'
				}`}
				style={isHovered ? hoverPosition : {}}
			>
				{isHovered && (
					<div className='relative h-full w-full'>
						<video
							ref={videoRef}
							src={teaserUrl}
							muted
							loop
							playsInline
							className='absolute inset-0 h-full w-full object-cover'
						/>

						{/* Overlay content */}
						<div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4'>
							<div className='mb-4'>
								<h3 className='text-2xl font-extrabold text-white'>{title}</h3>
								<div className='mt-1 flex items-center space-x-2 text-sm text-gray-200'>
									<span>{year}</span>
									{rating && (
										<>
											<span className='text-gray-500'>•</span>
											<div className='flex items-center'>
												<Star className='mr-1 h-4 w-4 fill-yellow-400 text-yellow-400' />
												<span>{rating}</span>
											</div>
										</>
									)}
								</div>
								<p className='mt-2 line-clamp-2 text-sm text-gray-300'>
									{description}
								</p>
							</div>

							<div className='flex items-center space-x-2'>
								<Link
									to={`/watch/${id}`}
									state={{ vimeoId }}
									onClick={(e) => e.stopPropagation()}
									className='flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:bg-gray-200'
								>
									<PlayCircle className='h-6 w-6' />
								</Link>
								<button
									onClick={handleLikeClick}
									className='flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm hover:border-white'
								>
									<Heart
										className={isLiked ? 'fill-current text-red-500' : ''}
									/>
								</button>
								<button
									onClick={handleSaveClick}
									className='flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm hover:border-white'
								>
									{isSaved ? <CheckCircle /> : <PlusCircle />}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default MediaCard
