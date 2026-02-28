import Player from '@vimeo/player'
import { Subtitles, Volume2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface VimeoPlayerProps {
	videoId: number | undefined
	autoplay?: boolean
	controls?: boolean
	onReady?: () => void
	onPlay?: () => void
	onPause?: () => void
	onEnd?: () => void
	onTimeUpdate?: (data: { seconds: number; duration: number }) => void
	className?: string
}

const mockSubtitles = {
	en: [{ start: 0, end: 999, text: 'This is KEMET video Introduction.' }],
	fr: [
		{ start: 0, end: 999, text: 'Ceci est la vidéo introduction de KEMET.' }
	],
	wo: [{ start: 0, end: 999, text: 'Li mooy KEMET video Intro.' }]
}

const subtitleLanguages = [
	{ id: 'en', label: 'English', flag: '🇺🇸' },
	{ id: 'fr', label: 'Français', flag: '🇫🇷' },
	{ id: 'wo', label: 'Wolof', flag: '🇸🇳' }
]

function VimeoPlayer({
	videoId,
	autoplay = false,
	controls = true,
	onReady,
	onPlay,
	onPause,
	onEnd,
	onTimeUpdate,
	className = ''
}: VimeoPlayerProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const playerRef = useRef<Player | null>(null)
	const fullscreenRootRef = useRef<HTMLDivElement | null>(null)
	const [showSubtitlesMenu, setShowSubtitlesMenu] = useState(false)
	const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
	const [currentSubtitle, setCurrentSubtitle] = useState<string>('')
	const [currentTime, setCurrentTime] = useState(0)
	const [isSubtitlesLoading, setIsSubtitlesLoading] = useState(false)
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [playerError, setPlayerError] = useState<string | null>(null)
	const [isBuffering, setIsBuffering] = useState(false)
	const [, setPlaybackRate] = useState(1)

	// Create fullscreen subtitle root element
	useEffect(() => {
		if (!fullscreenRootRef.current) {
			const root = document.createElement('div')
			root.id = 'fullscreen-subtitle-root'
			root.style.position = 'fixed'
			root.style.top = '0'
			root.style.left = '0'
			root.style.width = '100%'
			root.style.height = '100%'
			root.style.pointerEvents = 'none'
			root.style.zIndex = '9999'
			document.body.appendChild(root)
			fullscreenRootRef.current = root
		}

		return () => {
			if (fullscreenRootRef.current) {
				document.body.removeChild(fullscreenRootRef.current)
				fullscreenRootRef.current = null
			}
		}
	}, [])

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768)
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		const originalError = console.error
		console.error = (...args) => {
			const message = args[0]?.toString() || ''
			if (
				message.includes('Could not establish connection') ||
				message.includes('Receiving end does not exist') ||
				message.includes('Extension context invalidated')
			) {
				return
			}
			originalError.apply(console, args)
		}

		return () => {
			console.error = originalError
		}
	}, [])

	useEffect(() => {
		setPlayerError(null)
		let player: Player | null = null

		if (containerRef.current && videoId) {
			try {
				player = new Player(containerRef.current, {
					id: videoId,
					autoplay,
					controls,
					responsive: true,
					playsinline: true,
					transparent: false,
					quality: 'auto',
					dnt: false, 
					keyboard: true,
					pip: false,
					muted: autoplay, 
					autopause: false,
					background: false,
					byline: false,
					portrait: false,
					title: false
				})
				playerRef.current = player

				player
					.ready()
					.then(() => {
						console.log('Vimeo player ready')
						console.log('Current domain:', window.location.hostname)
						if (onReady) onReady()
					})
					.catch((error) => {
						console.error('Vimeo player ready error:', error)
						console.error('Error details:', {
							message: error.message,
							name: error.name,
							domain: window.location.hostname
						})
						if (
							error.message?.includes('domain') ||
							error.message?.includes('privacy') ||
							error.message?.includes('embedded')
						) {
							setPlayerError(
								'This video cannot be played on this domain. Please check Vimeo privacy settings.'
							)
						} else if (
							!error.message?.includes('connection') &&
							!error.message?.includes('Receiving end')
						) {
							setPlayerError('Failed to load video player')
						}
					})

				if (onPlay) player.on('play', onPlay)
				if (onPause) player.on('pause', onPause)
				if (onEnd) player.on('ended', onEnd)

				player.on('timeupdate', (data) => {
					setCurrentTime(data.seconds)
					if (onTimeUpdate) {
						onTimeUpdate(data)
					}
				})

				player.on('fullscreenchange', (data) => {
					setIsFullScreen(data.fullscreen)
				})

				player.on('bufferstart', () => {
					console.log('Video buffering started')
					setIsBuffering(true)
				})

				player.on('bufferend', () => {
					console.log('Video buffering ended')
					setIsBuffering(false)
				})

				player.on('playbackratechange', (data) => {
					console.log('Playback rate changed:', data.playbackRate)
					setPlaybackRate(data.playbackRate)
				})

				player.on('qualitychange', (data) => {
					console.log('Quality changed:', data.quality)
				})

				player.on('error', (error) => {
					console.error('Vimeo Player Error:', error)
					// Filter out extension-related errors
					if (
						!error.message?.includes('connection') &&
						!error.message?.includes('Receiving end')
					) {
						setPlayerError('Video playback error occurred')
					}
				})

				player.on('loaded', () => {
					console.log('Vimeo video loaded')
				})
			} catch (error) {
				console.error('Error initializing Vimeo player:', error)
				const err = error as Error
				// Filter out extension-related errors
				if (
					!err.message?.includes('connection') &&
					!err.message?.includes('Receiving end')
				) {
					setPlayerError('Failed to initialize video player')
				}
			}
		}

		return () => {
			if (player) {
				player.off('play')
				player.off('pause')
				player.off('ended')
				player.off('timeupdate')
				player.off('fullscreenchange')
				player.off('error')
				player.off('loaded')
				player.off('bufferstart')
				player.off('bufferend')
				player.off('playbackratechange')
				player.off('qualitychange')

				player.destroy().catch((err) => {
					console.error('Error destroying player', err)
				})
			}
		}
	}, [
		videoId,
		autoplay,
		controls,
		onReady,
		onPlay,
		onPause,
		onEnd,
		onTimeUpdate
	])

	useEffect(() => {
		if (
			selectedLanguage &&
			!isSubtitlesLoading &&
			mockSubtitles[selectedLanguage as keyof typeof mockSubtitles]
		) {
			const subtitles =
				mockSubtitles[selectedLanguage as keyof typeof mockSubtitles]
			const currentSub = subtitles.find(
				(sub) => currentTime >= sub.start && currentTime <= sub.end
			)
			setCurrentSubtitle(currentSub ? currentSub.text : '')
		} else if (!selectedLanguage) {
			setCurrentSubtitle('')
		}
	}, [currentTime, selectedLanguage, isSubtitlesLoading])

	const handleLanguageChange = (langId: string | null) => {
		setSelectedLanguage(langId)
		setShowSubtitlesMenu(false)

		if (langId) {
			setIsSubtitlesLoading(true)
			setCurrentSubtitle('')

			setTimeout(() => {
				setIsSubtitlesLoading(false)
			}, 2000)
		} else {
			setIsSubtitlesLoading(false)
			setCurrentSubtitle('')
		}
	}

	const handleRetry = () => {
		setPlayerError(null)
		if (containerRef.current && videoId) {
			const player = new Player(containerRef.current, {
				id: videoId,
				autoplay,
				controls,
				responsive: true
			})
			playerRef.current = player
		}
	}

	const subtitleUI = (
		<>
			{isSubtitlesLoading ? (
				<div
					className={`${isFullScreen ? 'fixed' : 'absolute'} bg-opacity-90 pointer-events-none bottom-24 left-4 z-50 max-w-md rounded-lg bg-gray-800 p-3`}
				>
					<div className='mb-2 flex items-center text-purple-400'>
						<Volume2 size={16} className='mr-2' />
						<span className='text-sm font-medium'>
							AI is generating subtitles...
						</span>
					</div>
					<div className='flex space-x-1'>
						<div className='h-2 w-2 animate-pulse rounded-full bg-purple-400'></div>
						<div
							className='h-2 w-2 animate-pulse rounded-full bg-purple-400'
							style={{ animationDelay: '0.2s' }}
						></div>
						<div
							className='h-2 w-2 animate-pulse rounded-full bg-purple-400'
							style={{ animationDelay: '0.4s' }}
						></div>
					</div>
				</div>
			) : (
				<div
					className={`${isFullScreen ? 'fixed' : 'absolute'} pointer-events-none right-0 bottom-20 left-0 z-50 flex justify-center px-4`}
				>
					<div className='w-full max-w-3xl rounded-lg px-4 py-2'>
						<p className='text-shadow text-center text-base text-white text-shadow-black md:text-lg lg:text-xl'>
							{currentSubtitle}
						</p>
					</div>
				</div>
			)}
		</>
	)

	if (playerError) {
		return (
			<div className='flex h-64 flex-col items-center justify-center rounded-lg bg-gray-900 p-4'>
				<div className='mb-4 text-center'>
					<p className='mb-2 text-lg text-white'>{playerError}</p>
					<p className='text-sm text-gray-400'>
						Please check your internet connection and try again.
					</p>
				</div>
				<button
					onClick={handleRetry}
					className='rounded-lg bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700'
				>
					Retry
				</button>
			</div>
		)
	}

	return (
		<div className='group relative h-full w-full'>
			<div ref={containerRef} className={className} />

			{/* Buffering indicator */}
			{isBuffering && (
				<div className='absolute inset-0 flex items-center justify-center bg-black/50'>
					<div className='flex flex-col items-center'>
						<div className='h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-purple-600'></div>
						<p className='mt-4 text-white'>Loading...</p>
					</div>
				</div>
			)}

			{selectedLanguage &&
				(isFullScreen && fullscreenRootRef.current
					? createPortal(subtitleUI, fullscreenRootRef.current)
					: subtitleUI)}

			<div
				className={`absolute ${isFullScreen ? 'bottom-16' : isMobile ? 'bottom-12' : 'bottom-34'} right-4 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100`}
			>
				<button
					onClick={() => setShowSubtitlesMenu(!showSubtitlesMenu)}
					className='bg-opacity-70 hover:bg-opacity-90 rounded-full bg-black p-2 text-white focus:ring-2 focus:ring-purple-400 focus:outline-none'
					aria-label='Subtitles options'
				>
					<Subtitles size={isMobile ? 20 : 24} />
				</button>
			</div>

			{showSubtitlesMenu && (
				<div
					className={`absolute ${isFullScreen ? 'bottom-28' : isMobile ? 'bottom-14' : 'bottom-28'} bg-opacity-95 right-4 z-10 w-48 rounded-lg bg-zinc-900 p-3 shadow-lg`}
				>
					<div className='mb-2 flex items-center justify-between'>
						<h3 className='text-sm font-medium text-white md:text-base'>
							Subtitles
						</h3>
						<button
							onClick={() => setShowSubtitlesMenu(false)}
							className='text-gray-400 hover:text-white'
							aria-label='Close menu'
						>
							<X size={16} />
						</button>
					</div>
					<div className='space-y-1'>
						<button
							onClick={() => handleLanguageChange(null)}
							className={`flex w-full items-center rounded px-3 py-2 text-left text-xs md:text-sm ${
								selectedLanguage === null
									? 'bg-purple-600 text-white'
									: 'text-gray-300 hover:bg-gray-800 hover:text-white'
							}`}
						>
							<span className='mr-2'>🔇</span>
							Off
						</button>
						{subtitleLanguages.map((lang) => (
							<button
								key={lang.id}
								onClick={() => handleLanguageChange(lang.id)}
								className={`flex w-full items-center rounded px-3 py-2 text-left text-xs md:text-sm ${
									selectedLanguage === lang.id
										? 'bg-purple-600 text-white'
										: 'text-gray-300 hover:bg-gray-800 hover:text-white'
								}`}
							>
								<span className='mr-2'>{lang.flag}</span>
								{lang.label}
							</button>
						))}
					</div>
					<div className='mt-3 border-t border-gray-700 pt-3'>
						<p className='text-xs text-gray-400'>
							AI-powered real-time subtitles
						</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default VimeoPlayer
