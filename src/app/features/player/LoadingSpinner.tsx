function LoadingSpinner() {
	return (
		<div className='bg-opacity-80 absolute inset-0 z-30 flex items-center justify-center bg-white'>
			<div
				className='borde-purple-700 h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-t-transparent'
				role='status'
				aria-label='Loading video'
			>
				<span className='sr-only'>Loading...</span>
			</div>
		</div>
	)
}

export default LoadingSpinner
