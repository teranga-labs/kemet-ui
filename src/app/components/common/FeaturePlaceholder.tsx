import { ArrowLeft, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

interface FeaturePlaceholderProps {
	title: string
	description: string
	icon: LucideIcon
	colorClass: string
}

function FeaturePlaceholder({
	title,
	description,
	icon: Icon,
	colorClass
}: FeaturePlaceholderProps) {
	return (
		<div className='flex min-h-screen w-full flex-col items-center justify-center bg-black px-4 text-center'>
			<div
				className={`mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/5 ${colorClass}`}
			>
				<Icon size={48} />
			</div>

			<h1 className='mb-4 text-4xl font-extrabold text-white md:text-6xl'>
				{title}
			</h1>

			<p className='mb-8 max-w-lg text-lg text-gray-400'>{description}</p>

			<Link
				to='/'
				className='flex items-center gap-2 rounded-full bg-white px-8 py-3 font-bold text-black transition-transform hover:scale-105'
			>
				<ArrowLeft size={20} />
				Back to Home
			</Link>
		</div>
	)
}

export default FeaturePlaceholder
