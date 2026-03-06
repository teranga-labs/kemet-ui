import { useEffect, useState } from 'react'

import Loading from './app/components/common/Loading.tsx'
import SearchOverlay from './app/components/common/SearchOverlay.tsx'
import Footer from './app/components/layout/Footer.tsx'
import Header from './app/components/layout/Header.tsx'
import Sidebar from './app/components/layout/Sidebar.tsx'
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
		<div className='flex h-screen flex-col bg-gray-50 dark:bg-zinc-950'>
			{/* Header */}
			<Header />

			{/* Body: Sidebar + Content card */}
			<div className='flex min-h-0 flex-1'>
				<Sidebar />

				<main className='relative flex-1 overflow-y-auto rounded-tl-[2rem] bg-white shadow-xl dark:bg-zinc-900'>
					<SearchOverlay />
					<AppRoutes />
					<Footer />

					{/* Mobile bottom nav spacer */}
					<div className='h-20 sm:hidden' />
				</main>
			</div>
		</div>
	)
}

export default App
