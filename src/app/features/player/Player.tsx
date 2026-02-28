import { ArrowLeft } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import LoadingSpinner from './LoadingSpinner.tsx'
import PlayerControls from './PlayerControls.tsx'

interface Subtitle {
	lang: string
	label: string
	src: string
}

interface PlayerProps {
	src: string
	subtitles?: Subtitle[]
	title?: string
	onBack?: () => void
}

interface Cue {
	startTime: number
	endTime: number
	text: string
}

const Player: React.FC<PlayerProps> = ({
	src,
	subtitles = [],
	title,
	onBack
}) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const playerContainerRef = useRef<HTMLDivElement>(null)
	const subtitleContainerRef = useRef<HTMLDivElement>(null)

	const [isPlaying, setIsPlaying] = useState<boolean>(true)
	const [isMuted, setIsMuted] = useState<boolean>(false)
	const [volume, setVolume] = useState<number>(1)
	const [lastVolume, setLastVolume] = useState<number>(1)
	const [progress, setProgress] = useState<number>(0)
	const [currentTime, setCurrentTime] = useState<number>(0)
	const [showControls, setShowControls] = useState<boolean>(true)
	const [selectedSubtitle, setSelectedSubtitle] = useState<string | null>(null)
	const [activeCue, setActiveCue] = useState<string>('')
	const [subtitleTracks, setSubtitleTracks] = useState<Record<string, Cue[]>>(
		{}
	)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	// Convert timestamp to seconds
	const parseTimestamp = useCallback((timestamp: string): number => {
		const parts = timestamp.split(':')
		const secParts = parts[2].split('.')
		const hours = parseInt(parts[0], 10)
		const minutes = parseInt(parts[1], 10)
		const seconds = parseInt(secParts[0], 10)
		const milliseconds = parseInt(secParts[1], 10)
		return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000
	}, [])

	// Parse WebVTT format
	const parseVTT = useCallback(
		(text: string): Cue[] => {
			const cues: Cue[] = []
			const lines = text.split('\n')
			let currentCue: Partial<Cue> = {}
			for (let i = 0; i < lines.length; i++) {
				const line = lines[i].trim()
				if (line === '' || line === 'WEBVTT') continue
				const timestampMatch = line.match(
					/(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})/
				)
				if (timestampMatch) {
					if (currentCue.startTime !== undefined && currentCue.text) {
						cues.push(currentCue as Cue)
					}
					currentCue = {
						startTime: parseTimestamp(timestampMatch[1]),
						endTime: parseTimestamp(timestampMatch[2]),
						text: ''
					}
				} else if (currentCue.startTime !== undefined && line !== '') {
					currentCue.text = currentCue.text
						? currentCue.text + '\n' + line
						: line
				}
			}
			if (currentCue.startTime !== undefined && currentCue.text) {
				cues.push(currentCue as Cue)
			}
			return cues
		},
		[parseTimestamp]
	)

	// Load subtitle files
	const loadSubtitles = useCallback(async () => {
		const tracks: Record<string, Cue[]> = {}
		for (const sub of subtitles) {
			try {
				const response = await fetch(sub.src)
				const text = await response.text()
				tracks[sub.lang] = parseVTT(text)
			} catch (error) {
				console.error(`Failed to load subtitles for ${sub.lang}:`, error)
				tracks[sub.lang] = []
			}
		}
		setSubtitleTracks(tracks)
	}, [subtitles, parseVTT])

	// Update active subtitle based on current time
	const updateSubtitles = useCallback(() => {
		if (
			!videoRef.current ||
			!selectedSubtitle ||
			!subtitleTracks[selectedSubtitle]
		)
			return
		const currentVideoTime = videoRef.current.currentTime
		const cues = subtitleTracks[selectedSubtitle]
		const active = cues.find(
			(cue) =>
				currentVideoTime >= cue.startTime && currentVideoTime <= cue.endTime
		)
		setActiveCue(active?.text || '')
	}, [selectedSubtitle, subtitleTracks])

	useEffect(() => {
		loadSubtitles().catch((error) => {
			console.error('Failed to load subtitles:', error)
		})
	}, [loadSubtitles])

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const handleLoadedMetadata = (): void => {
			if (subtitles.length > 0 && subtitles.some((sub) => sub.lang === 'en')) {
				setSelectedSubtitle('en')
			}
		}

		const handleTimeUpdate = (): void => {
			if (video.duration > 0) {
				setProgress((video.currentTime / video.duration) * 100)
			}
			setCurrentTime(video.currentTime)
			updateSubtitles()
		}

		const handleWaiting = () => setIsLoading(true)
		const handlePlaying = () => setIsLoading(false)

		video.addEventListener('loadedmetadata', handleLoadedMetadata)
		video.addEventListener('timeupdate', handleTimeUpdate)
		video.addEventListener('waiting', handleWaiting)
		video.addEventListener('playing', handlePlaying)

		// Cleanup function
		return () => {
			video.removeEventListener('loadedmetadata', handleLoadedMetadata)
			video.removeEventListener('timeupdate', handleTimeUpdate)
			video.removeEventListener('waiting', handleWaiting)
			video.removeEventListener('playing', handlePlaying)
		}
	}, [updateSubtitles, subtitles])

	const togglePlay = (): void => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause()
			} else {
				videoRef.current
					.play()
					.catch((e: Error) => console.error('Play error:', e))
				if (isMuted) {
					toggleMute()
				}
			}
			setIsPlaying(!isPlaying)
		}
	}

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (videoRef.current) {
			videoRef.current.currentTime =
				(Number(e.target.value) / 100) * videoRef.current.duration
			updateSubtitles()
		}
	}

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const newVolume = parseFloat(e.target.value)
		setVolume(newVolume)
		setIsMuted(newVolume === 0)
		if (newVolume > 0) {
			setLastVolume(newVolume)
		}
	}

	const toggleMute = () => {
		if (isMuted) {
			const newVolume = lastVolume > 0 ? lastVolume : 0.5
			setVolume(newVolume)
			setIsMuted(false)
		} else {
			setLastVolume(volume)
			setVolume(0)
			setIsMuted(true)
		}
	}

	const toggleFullscreen = (): void => {
		if (!document.fullscreenElement) {
			playerContainerRef.current
				?.requestFullscreen()
				.catch((err: Error) =>
					console.error(`Fullscreen error: ${err.message}`)
				)
		} else {
			document
				.exitFullscreen()
				.catch((err: Error) =>
					console.error(`Exit fullscreen error: ${err.message}`)
				)
		}
	}

	const handleSubtitleSelect = (lang: string | null): void => {
		setSelectedSubtitle(lang)
		setActiveCue('')
	}

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.volume = volume
			videoRef.current.muted = isMuted
		}
	}, [volume, isMuted])

	useEffect(() => {
		let timeout: number
		const resetControlsTimeout = (): void => {
			setShowControls(true)
			clearTimeout(timeout)
			timeout = window.setTimeout(() => {
				if (isPlaying) {
					setShowControls(false)
				}
			}, 3000)
		}

		resetControlsTimeout()
		const container = playerContainerRef.current
		if (container) {
			container.addEventListener('mousemove', resetControlsTimeout)
			container.addEventListener('touchstart', resetControlsTimeout)
		}
		return () => {
			clearTimeout(timeout)
			if (container) {
				container.removeEventListener('mousemove', resetControlsTimeout)
				container.removeEventListener('touchstart', resetControlsTimeout)
			}
		}
	}, [isPlaying])

	return (
		<div
			ref={playerContainerRef}
			className='relative flex h-full w-full items-center justify-center bg-black'
		>
			{/* ✨ Added conditional rendering for the spinner */}
			{isLoading && <LoadingSpinner />}

			<video
				ref={videoRef}
				src={src}
				className='absolute top-1/2 left-1/2 max-h-full w-full -translate-x-1/2 -translate-y-1/2 object-contain'
				onEnded={() => setIsPlaying(false)}
				onClick={togglePlay}
				autoPlay
				playsInline
				crossOrigin='anonymous'
			></video>

			{/* Custom subtitle container */}
			<div
				ref={subtitleContainerRef}
				className='pointer-events-none absolute right-0 bottom-24 left-0 z-20 flex justify-center'
			>
				{activeCue && (
					<div className='max-w-2xl rounded bg-black/70 px-4 py-2 text-center text-white'>
						{activeCue.split('\n').map((line, i) => (
							<p key={i} className='text-lg font-semibold'>
								{line}
							</p>
						))}
					</div>
				)}
			</div>

			<div
				className={`pointer-events-none absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${
					showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
				}`}
			>
				{/* Top Bar: Title and Back Button */}
				<div className='pointer-events-auto bg-gradient-to-b from-black/70 to-transparent p-4'>
					<div className='flex items-center space-x-4 text-white'>
						{onBack && (
							<button
								onClick={onBack}
								className='rounded-full border p-2 transition-colors hover:text-purple-400'
							>
								<ArrowLeft size={24} />
							</button>
						)}
						<h1 className='truncate text-xl font-bold'>{title}</h1>
					</div>
				</div>

				{/* Bottom Player Controls */}
				<div className='pointer-events-auto w-full'>
					<PlayerControls
						isPlaying={isPlaying}
						isMuted={isMuted}
						progress={progress}
						currentTime={currentTime}
						duration={videoRef.current?.duration || 0}
						volume={volume}
						subtitles={subtitles}
						selectedSubtitle={selectedSubtitle}
						onPlayPause={togglePlay}
						onSeek={handleSeek}
						onFullscreen={toggleFullscreen}
						onToggleMute={toggleMute}
						onVolumeChange={handleVolumeChange}
						onSelectSubtitle={handleSubtitleSelect}
					/>
				</div>
			</div>
		</div>
	)
}

export default Player
