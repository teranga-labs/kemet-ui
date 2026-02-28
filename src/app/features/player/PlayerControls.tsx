import {
	Fullscreen,
	Pause,
	Play,
	Volume1,
	Volume2,
	VolumeX
} from 'lucide-react'
import React, { useState } from 'react'

import SubtitleSelector from './SubtitleSelector.tsx'

const formatTime = (timeInSeconds: number) => {
	const time = Math.round(timeInSeconds)
	const minutes = Math.floor(time / 60)
	const seconds = time % 60
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

interface Subtitle {
	lang: string
	label: string
	src: string
}

interface PlayerControlsProps {
	isPlaying: boolean
	isMuted: boolean
	progress: number
	currentTime: number
	duration: number
	volume: number
	subtitles: Subtitle[]
	selectedSubtitle: string | null
	onPlayPause: () => void
	onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void
	onFullscreen: () => void
	onToggleMute: () => void
	onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onSelectSubtitle: (lang: string | null) => void
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
	isPlaying,
	isMuted,
	progress,
	currentTime,
	duration,
	volume,
	subtitles,
	selectedSubtitle,
	onPlayPause,
	onSeek,
	onFullscreen,
	onToggleMute,
	onVolumeChange,
	onSelectSubtitle
}) => {
	const VolumeIcon =
		isMuted || volume === 0 ? VolumeX : volume > 0.5 ? Volume2 : Volume1
	const [showSubtitleMenu, setShowSubtitleMenu] = useState(false)

	const handleSubtitleSelect = (lang: string | null) => {
		onSelectSubtitle(lang)
		setShowSubtitleMenu(false)
	}

	return (
		<div className='flex flex-col space-y-2 bg-gradient-to-t from-black/70 to-transparent p-4'>
			{/* Timeline */}
			<input
				type='range'
				min='0'
				max='100'
				value={progress}
				onChange={onSeek}
				className='h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-600/50'
				style={{
					background: `linear-gradient(to right, #a855f7 ${progress}%, #4b5563 ${progress}%)`
				}}
			/>
			{/* Bottom Controls */}
			<div className='flex w-full items-center justify-between text-white'>
				{/* Left Controls */}
				<div className='flex items-center space-x-4'>
					<button
						onClick={onPlayPause}
						className='transition-colors hover:text-purple-400'
					>
						{isPlaying ? <Pause size={24} /> : <Play size={24} />}
					</button>

					<div className='flex items-center space-x-2'>
						<button
							onClick={onToggleMute}
							className='transition-colors hover:text-purple-400'
						>
							<VolumeIcon size={24} />
						</button>
						<input
							type='range'
							min='0'
							max='1'
							step='0.05'
							value={volume}
							onChange={onVolumeChange}
							className='h-1 w-20 cursor-pointer appearance-none rounded-lg bg-gray-600/50'
							style={{
								background: `linear-gradient(to right, #a855f7 ${
									volume * 100
								}%, #4b5563 ${volume * 100}%)`
							}}
						/>
					</div>

					<div className='flex items-center font-mono text-sm'>
						<span>{formatTime(currentTime)}</span>
						<span className='mx-1'>/</span>
						<span>{formatTime(duration)}</span>
					</div>
				</div>

				{/* Right Controls */}
				<div className='flex items-center space-x-3'>
					{subtitles.length > 0 && (
						<div className='relative'>
							<button
								onClick={() => setShowSubtitleMenu(!showSubtitleMenu)}
								className='flex h-[24px] w-[32px] items-center justify-center rounded border-2 text-sm font-bold hover:bg-white/20'
							>
								CC
							</button>
							{showSubtitleMenu && (
								<SubtitleSelector
									subtitles={subtitles}
									selectedSubtitle={selectedSubtitle}
									onSelectSubtitle={handleSubtitleSelect}
								/>
							)}
						</div>
					)}

					<button
						onClick={onFullscreen}
						className='transition-colors hover:text-purple-400'
					>
						<Fullscreen size={20} />
					</button>
				</div>
			</div>
		</div>
	)
}

export default PlayerControls
