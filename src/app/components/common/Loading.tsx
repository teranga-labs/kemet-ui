import logoWhite from '/images/misc/logo-white.png'

function LoadingScreen() {
	return (
		<div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white'>
			<div className='mb-8'>
				<img src={logoWhite} alt='logo-white' width='200' height='200' />
			</div>
			<div className='flex items-center space-x-2'>
				<span className='sr-only'>Loading...</span>
				<div className='h-4 w-4 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.3s]'></div>
				<div className='h-4 w-4 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.15s]'></div>
				<div className='h-4 w-4 animate-bounce rounded-full bg-purple-500'></div>
				<div className='h-4 w-4 animate-bounce rounded-full bg-purple-500 [animation-delay:0.15s]'></div>
			</div>
		</div>
	)
}

export default LoadingScreen
