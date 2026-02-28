import { Book, BookOpen, Star } from 'lucide-react';



import Footer from "../../components/layout/Footer.tsx";
import Header from '../../components/layout/Header.tsx'





// Mock Data
const featuredBook = {
	title: 'The Silent Cosmos',
	author: 'Elena Fisher',
	description:
		'The official novelization of the hit series. Discover the origins of the anomaly before the fleet arrived.',
	cover:
		'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80',
	rating: 4.8
}

const library = [
	{
		id: 1,
		title: 'Echoes of Time',
		author: 'J.R. Black',
		cover:
			'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80',
		progress: 60
	},
	{
		id: 2,
		title: 'Cyber Protocol',
		author: 'A.I. Chen',
		cover:
			'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80',
		progress: 0
	},
	{
		id: 3,
		title: 'Lost Diaries',
		author: 'Sarah V.',
		cover:
			'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=300&q=80',
		progress: 15
	},
	{
		id: 4,
		title: 'Production Notes',
		author: 'Keme Studio',
		cover:
			'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80',
		progress: 100
	},
	{
		id: 5,
		title: 'Production Notes',
		author: 'Keme Studio',
		cover:
			'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80',
		progress: 100
	}
]

function EbookPage() {
	return (
		<div className='min-h-screen bg-zinc-900 pt-24 text-white'>
			<Header />
			<div className='container mx-auto px-4 md:px-8'>
				{/* Featured Header */}
				<div className='mb-16 flex flex-col gap-8 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:flex-row md:items-center'>
					<img
						src={featuredBook.cover}
						alt='Featured'
						className='mx-auto h-64 w-44 rounded shadow-2xl shadow-black md:mx-0'
					/>
					<div className='flex-1 text-center md:text-left'>
						<div className='mb-2 flex items-center justify-center gap-2 text-yellow-500 md:justify-start'>
							<Star fill='currentColor' size={20} />{' '}
							<span className='font-bold text-white'>
								{featuredBook.rating}
							</span>
						</div>
						<h1 className='mb-2 text-3xl font-bold md:text-5xl'>
							{featuredBook.title}
						</h1>
						<p className='mb-6 text-lg text-gray-400'>
							by {featuredBook.author}
						</p>
						<p className='mb-8 max-w-xl text-gray-300'>
							{featuredBook.description}
						</p>
						<button className='rounded-full bg-white px-8 py-3 font-bold text-black transition hover:scale-105 hover:bg-gray-200'>
							Read Now
						</button>
					</div>
				</div>

				{/* Library Shelf */}
				<div className='mb-8 flex items-center gap-3'>
					<BookOpen className='text-blue-500' size={28} />
					<h2 className='text-2xl font-bold'>Your Library</h2>
				</div>

				<div className='grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pb-4'>
					{library.map((book) => (
						<div key={book.id} className='group cursor-pointer'>
							<div className='relative mb-4 aspect-[2/3] overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:-translate-y-2'>
								<img
									src={book.cover}
									alt={book.title}
									className='h-full w-full object-cover'
								/>
								{book.progress > 0 && (
									<div className='absolute bottom-0 left-0 h-1 w-full bg-gray-700'>
										<div
											className='h-full bg-blue-500'
											style={{ width: `${book.progress}%` }}
										/>
									</div>
								)}
								<div className='absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100'>
									<Book size={32} />
								</div>
							</div>
							<h3 className='truncate font-bold text-gray-100'>{book.title}</h3>
							<p className='text-sm text-gray-500'>{book.author}</p>
						</div>
					))}
				</div>
			</div>
			<Footer/>
		</div>
	)
}

export default EbookPage
