function AdminFooter() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='mt-2 w-full border-t border-gray-200 pt-4 dark:border-zinc-700'>
			<div className='flex flex-col items-center justify-between text-sm text-gray-500 sm:flex-row dark:text-gray-400'>
				<p>&copy; {currentYear} Kemet. All rights reserved.</p>
				<div className='flex items-center gap-4 pt-4 sm:mt-0'>
					<span>Dakar, Senegal</span>
					<a
						href='#'
						className='hover:text-purple-600 dark:hover:text-purple-400'
					>
						Support
					</a>
					<a
						href='#'
						className='hover:text-purple-600 dark:hover:text-purple-400'
					>
						Privacy
					</a>
				</div>
			</div>
		</footer>
	)
}

export default AdminFooter
