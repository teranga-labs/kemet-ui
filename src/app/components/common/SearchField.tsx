import { Search, X } from 'lucide-react'
import { useState } from 'react'
import * as React from 'react'

interface SearchFieldProps {
	onSubmit: (query: string) => void
	placeholder?: string
}

function SearchField({
	onSubmit,
	placeholder = 'Search...'
}: SearchFieldProps) {
	const [searchQuery, setSearchQuery] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (searchQuery.trim()) {
			onSubmit(searchQuery.trim())
		}
	}

	const handleClear = () => {
		setSearchQuery('')
	}

	return (
		<div className='w-full bg-transparent py-4'>
			<div className='mx-auto flex max-w-4xl items-center'>
				<form onSubmit={handleSubmit} className='flex flex-1 items-center'>
					<div className='relative flex flex-1 items-center'>
						<Search
							size={20}
							className='absolute left-3 text-gray-400 dark:text-gray-500'
						/>
						<input
							type='text'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder={placeholder}
							className='flex-1 rounded-l-md border border-gray-300 bg-gray-100 py-3 pr-4 pl-10 text-black focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200'
						/>
					</div>
					<button
						type='submit'
						className='rounded-r-md border border-purple-600 bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700'
					>
						Search
					</button>
				</form>

				{searchQuery && (
					<button
						onClick={handleClear}
						className='ml-4 text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white'
						aria-label='Clear search'
					>
						<X size={24} />
					</button>
				)}
			</div>
		</div>
	)
}

export default SearchField
