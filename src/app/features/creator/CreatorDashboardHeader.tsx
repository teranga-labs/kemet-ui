import { Video } from 'lucide-react'

const CreatorDashboardHeader = () => {
	return (
		<header className='mb-8'>
			<div className='flex items-center space-x-3'>
				<Video className='h-10 w-10 text-purple-600' />
				<h1 className='text-4xl font-bold'>
					Creator Portal{' '}
					<span className='h-4 w-4 rounded-full text-purple-700'>.</span>
				</h1>
			</div>
		</header>
	)
}

export default CreatorDashboardHeader
