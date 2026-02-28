import { useEffect, useState } from 'react'

import Loading from './app/components/common/Loading.tsx'
import MainNavigation from './app/components/common/MainNavigation.tsx'
import AppRoutes from './app/routes/AppRoutes.tsx'

function App() {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 2500)
		return () => clearTimeout(timer)
	}, [])

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className='min-h-screen bg-black'>
			<MainNavigation />

			<div className='relative z-0'>
				<AppRoutes />
			</div>
		</div>
	)
}

export default App
