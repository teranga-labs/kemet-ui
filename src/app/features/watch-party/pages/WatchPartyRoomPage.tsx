import {
	Check,
	ChevronLeft,
	Copy,
	LogOut,
	MessageSquare,
	Settings,
	Share,
	Users,
	X
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { mockRooms } from '../../../../data/rooms.ts'
import { allItems } from '../../../../data/shows.ts'
import Player from '../../player/Player.tsx'
import WatchPartyChat from '../components/WatchPartyChat.tsx'

function WatchPartyRoomPage() {
	const { t } = useTranslation()
	const { roomId } = useParams()
	const navigate = useNavigate()
	const [isChatVisible, setIsChatVisible] = useState(true)
	const [showShareOptions, setShowShareOptions] = useState(false)
	const [showSettings, setShowSettings] = useState(false)
	const [copied, setCopied] = useState(false)
	const [showParticipants, setShowParticipants] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const room = mockRooms.find((r) => r.id === roomId)

	const handleBack = () => navigate(-1)
	const handleLeaveRoom = () => {
		navigate('/watch-party')
		setShowSettings(false)
		setIsMobileMenuOpen(false)
	}

	const toggleChat = () => setIsChatVisible(!isChatVisible)
	const toggleShareOptions = () => {
		setShowShareOptions(!showShareOptions)
		if (copied) setCopied(false)
	}
	const toggleSettings = () => {
		setShowSettings(!showSettings)
		if (showShareOptions) setShowShareOptions(false)
	}
	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

	const copyRoomLink = () => {
		const roomLink = `${window.location.origin}/watch-party/join/${roomId}`
		navigator.clipboard.writeText(roomLink).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		})
		setShowShareOptions(false)
		setIsMobileMenuOpen(false)
	}

	const copyRoomCode = () => {
		if (room) {
			navigator.clipboard.writeText(room.id).then(() => {
				setCopied(true)
				setTimeout(() => setCopied(false), 2000)
			})
		}
		setShowShareOptions(false)
		setIsMobileMenuOpen(false)
	}

	if (!room || !room.id) {
		return (
			<div className='flex h-screen flex-col items-center justify-center bg-white p-4 text-center dark:bg-zinc-900'>
				<h1 className='mb-4 text-2xl font-bold text-gray-900 md:text-4xl dark:text-white'>
					{t('watchParty.room.roomNotFoundTitle')}
				</h1>
				<p className='mb-6 text-base text-gray-600 md:text-lg dark:text-gray-400'>
					{t('watchParty.room.roomNotFoundDesc')}
				</p>
				<button
					onClick={() => navigate('/watch-party/join')}
					className='rounded-lg bg-purple-600 px-6 py-3 font-bold text-white transition-colors hover:bg-purple-700'
				>
					{t('watchParty.room.backButton')}
				</button>
			</div>
		)
	}

	const mediaItem = allItems.find((item) => item.id === room.mediaId)

	if (!mediaItem || !mediaItem.vimeoId) {
		return (
			<div className='flex h-screen flex-col items-center justify-center bg-white p-4 text-center dark:bg-zinc-900'>
				<h1 className='mb-4 text-2xl font-bold text-gray-900 md:text-4xl dark:text-white'>
					{t('watchParty.room.contentNotFoundTitle')}
				</h1>
				<p className='mb-6 text-base text-gray-600 md:text-lg dark:text-gray-400'>
					{t('watchParty.room.contentNotFoundDesc')}
				</p>
				<button
					onClick={() => navigate('/watch-party/join')}
					className='rounded-lg bg-purple-600 px-6 py-3 font-bold text-white transition-colors hover:bg-purple-700'
				>
					{t('watchParty.room.backButton')}
				</button>
			</div>
		)
	}

	return (
		<div className='flex h-screen flex-col bg-gray-100 lg:flex-row dark:bg-black'>
			{/* Mobile Header */}
			<div className='absolute top-0 right-0 left-0 z-30 flex items-center justify-between bg-black/80 p-4 backdrop-blur-sm lg:hidden'>
				<button
					onClick={handleBack}
					className='rounded-full p-2 text-white transition-colors'
					aria-label={t('watchParty.room.goBackLabel')}
				>
					<ChevronLeft size={20} />
				</button>

				<div className='flex-1 px-4'>
					<h1 className='truncate text-sm font-bold text-white'>
						{room.roomName}
					</h1>
					<p className='truncate text-xs text-gray-300'>
						{t('watchParty.room.participants', {
							count: room.participants.length
						})}
					</p>
				</div>

				<div className='flex items-center space-x-2'>
					<button
						onClick={toggleMobileMenu}
						className='rounded-full p-2 text-white transition-colors'
					>
						<Settings size={20} />
					</button>
					<button
						onClick={toggleChat}
						className='rounded-full p-2 text-white transition-colors'
					>
						{isChatVisible ? <X size={20} /> : <MessageSquare size={20} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className='absolute top-16 right-4 z-40 w-48 rounded-lg border bg-white shadow-lg lg:hidden dark:border-zinc-700 dark:bg-zinc-800'>
					<div className='p-3'>
						{/* Room Info */}
						<div className='mb-3 border-b pb-3 dark:border-zinc-600'>
							<h3 className='font-bold text-gray-900 dark:text-white'>
								{room.roomName}
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								{t('watchParty.room.hostLabel')} {room.hostName}
							</p>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								{t('watchParty.room.roomCodeLabel')} {room.id}
							</p>
						</div>

						{/* Participants */}
						<div className='mb-3 border-b pb-3 dark:border-zinc-600'>
							<h4 className='text-sm font-semibold text-gray-900 dark:text-white'>
								{t('watchParty.room.participantsParentheses', {
									count: room.participants.length
								})}
							</h4>
							<div className='mt-2 max-h-32 overflow-y-auto'>
								{room.participants.map((participant, index) => (
									<div key={index} className='flex items-center py-1'>
										<span className='mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white'>
											{participant.charAt(0).toUpperCase()}
										</span>
										<span className='text-sm text-gray-800 dark:text-gray-200'>
											{participant}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* Actions */}
						<div className='space-y-1'>
							<button
								onClick={toggleShareOptions}
								className='flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700'
							>
								<span>{t('watchParty.room.shareRoom')}</span>
								<Share size={16} />
							</button>

							{showShareOptions && (
								<div className='mt-1 space-y-1 border-l border-gray-300 pl-4 dark:border-zinc-600'>
									<button
										onClick={copyRoomLink}
										className='flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700'
									>
										<span>{t('watchParty.room.copyLink')}</span>
										{copied ? (
											<Check size={16} className='text-green-400' />
										) : (
											<Copy size={16} />
										)}
									</button>
									<button
										onClick={copyRoomCode}
										className='flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700'
									>
										<span>{t('watchParty.room.copyCode')}</span>
										{copied ? (
											<Check size={16} className='text-green-400' />
										) : (
											<Copy size={16} />
										)}
									</button>
								</div>
							)}

							<button
								onClick={handleLeaveRoom}
								className='flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm text-red-500 transition-colors hover:bg-red-500/10'
							>
								<span>{t('watchParty.room.leaveRoom')}</span>
								<LogOut size={16} />
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Video Player Section */}
			<div
				className={`relative flex-grow transition-all duration-300 ease-in-out ${
					isChatVisible ? 'h-1/2 lg:h-full lg:w-3/4' : 'h-full lg:w-full'
				} ${isMobileMenuOpen ? 'blur-sm' : ''}`}
			>
				{/* Desktop Back Button */}
				<button
					onClick={handleBack}
					className='absolute top-4 left-4 z-20 hidden rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/75 lg:block'
					aria-label={t('watchParty.room.goBackLabel')}
				>
					<ChevronLeft size={24} />
				</button>

				{/* Player Container */}
				<div
					className={`h-full w-full ${isMobileMenuOpen ? 'pointer-events-none' : ''} ${
						isChatVisible ? 'pt-0 lg:pt-0' : 'pt-0'
					}`}
				>
					<Player
						src={mediaItem.videoUrl || ''}
						subtitles={[
							{ lang: 'en', label: 'English', src: '/subtitles/movie-en.vtt' },
							{ lang: 'fr', label: 'Français', src: '/subtitles/movie-fr.vtt' },
							{ lang: 'wo', label: 'Wolof', src: '/subtitles/movie-wo.vtt' }
						]}
					/>
				</div>

				{/* Desktop Room Info */}
				<div className='absolute top-4 left-16 z-10 hidden items-start space-x-4 lg:flex'>
					<div className='rounded-lg bg-black/50 p-3 text-sm text-white backdrop-blur-sm'>
						<h1 className='text-lg font-bold'>{room.roomName}</h1>
						<p className='text-gray-300'>
							{t('watchParty.room.hostLabel')} {room.hostName}
						</p>
						<p className='text-gray-300'>
							{t('watchParty.room.participants', {
								count: room.participants.length
							})}
						</p>
						<p className='mt-1 text-xs text-gray-300'>
							{t('watchParty.room.roomCodeLabel')} {room.id}
						</p>
					</div>
				</div>
			</div>

			{/* Chat Section */}
			<div
				className={`bg-gray-100 transition-all duration-300 ease-in-out dark:bg-black ${
					isChatVisible
						? 'h-1/2 lg:h-full lg:w-1/4 lg:p-4'
						: 'h-0 overflow-hidden lg:h-full lg:w-0 lg:p-0'
				}`}
			>
				{isChatVisible && <WatchPartyChat roomId={room.id} />}
			</div>

			{/* Desktop Controls */}
			<div className='absolute top-4 right-4 z-20 hidden items-center space-x-2 lg:flex'>
				<div
					className='relative'
					onMouseEnter={() => setShowParticipants(true)}
					onMouseLeave={() => setShowParticipants(false)}
				>
					<button className='flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80'>
						<Users size={20} />
					</button>
					{showParticipants && (
						<div className='absolute right-0 z-30 mt-2 w-56 rounded-lg border bg-white p-2 text-sm shadow-lg dark:border-zinc-700 dark:bg-zinc-800'>
							<h3 className='px-2 py-1 font-bold text-gray-900 dark:text-white'>
								{t('watchParty.room.participantsParentheses', {
									count: room.participants.length
								})}
							</h3>
							<ul className='mt-1 max-h-48 overflow-y-auto'>
								{room.participants.map((participant, index) => (
									<li
										key={index}
										className='flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-zinc-700'
									>
										<span className='mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white'>
											{participant.charAt(0).toUpperCase()}
										</span>
										<span className='text-gray-800 dark:text-gray-200'>
											{participant}
										</span>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>

				<div className='relative'>
					<button
						onClick={toggleSettings}
						className='flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80'
						title={t('watchParty.room.settingsTitle')}
					>
						<Settings size={20} />
					</button>
					{showSettings && (
						<div className='absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-lg border bg-white text-black shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'>
							<div className='p-2'>
								<button
									onClick={toggleShareOptions}
									className='flex w-full items-center justify-between rounded px-3 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700'
								>
									<span>{t('watchParty.room.shareRoom')}</span>
									<Share size={16} />
								</button>
								{showShareOptions && (
									<div className='mt-1 border-l border-gray-300 pl-4 dark:border-zinc-600'>
										<button
											onClick={copyRoomLink}
											className='flex w-full items-center justify-between rounded px-3 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700'
										>
											<span>{t('watchParty.room.copyLink')}</span>
											{copied ? (
												<Check size={16} className='text-green-400' />
											) : (
												<Copy size={16} />
											)}
										</button>
										<button
											onClick={copyRoomCode}
											className='flex w-full items-center justify-between rounded px-3 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700'
										>
											<span>{t('watchParty.room.copyCode')}</span>
											{copied ? (
												<Check size={16} className='text-green-400' />
											) : (
												<Copy size={16} />
											)}
										</button>
									</div>
								)}
								<button
									onClick={handleLeaveRoom}
									className='flex w-full items-center justify-between rounded px-3 py-2 text-left text-red-500 transition-colors hover:bg-red-500/10'
								>
									<span>{t('watchParty.room.leaveRoom')}</span>
									<LogOut size={16} />
								</button>
							</div>
						</div>
					)}
				</div>

				<button
					onClick={toggleChat}
					className='flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-purple-600'
					title={
						isChatVisible
							? t('watchParty.room.hideChat')
							: t('watchParty.room.showChat')
					}
				>
					{isChatVisible ? <X size={20} /> : <MessageSquare size={20} />}
				</button>
			</div>
		</div>
	)
}

export default WatchPartyRoomPage
