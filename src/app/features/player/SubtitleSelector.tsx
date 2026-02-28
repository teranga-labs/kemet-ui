import React from 'react'

interface Subtitle {
	lang: string
	label: string
	src: string
}

interface SubtitleSelectorProps {
	subtitles: Subtitle[]
	selectedSubtitle: string | null
	onSelectSubtitle: (lang: string | null) => void
}

const SubtitleSelector: React.FC<SubtitleSelectorProps> = ({
	subtitles,
	selectedSubtitle,
	onSelectSubtitle
}) => {
	return (
		<div className='absolute right-0 bottom-full mb-2 w-32 rounded-md bg-black/80 py-1 text-sm text-white'>
			<ul>
				<li>
					<button
						onClick={() => onSelectSubtitle(null)}
						className={`w-full px-3 py-1 text-left hover:bg-purple-500 ${
							selectedSubtitle === null ? 'font-bold text-purple-300' : ''
						}`}
					>
						Off
					</button>
				</li>
				{subtitles.map((sub) => (
					<li key={sub.lang}>
						<button
							onClick={() => onSelectSubtitle(sub.lang)}
							className={`w-full px-3 py-1 text-left hover:bg-purple-500 ${
								selectedSubtitle === sub.lang ? 'font-bold text-purple-300' : ''
							}`}
						>
							{sub.label}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default SubtitleSelector
