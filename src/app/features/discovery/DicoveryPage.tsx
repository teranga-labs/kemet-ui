import { Compass, Hash, Heart, Play, Share2 } from 'lucide-react'
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";

const categories = [
	'Trending',
	'Behind the Scenes',
	'Cast Interviews',
	'Shorts',
	'Music',
	'Concept Art'
]
const discoveryItems = [
	{
		id: 1,
		title: 'Making of "The Last Horizon"',
		type: 'Documentary',
		image:
			'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
		views: '24k'
	},
	{
		id: 2,
		title: 'Concept Art: Cyber City',
		type: 'Art',
		image:
			'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
		views: '12k'
	},
	{
		id: 3,
		title: 'Cast Table Read',
		type: 'Exclusive',
		image:
			'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=800&q=80',
		views: '8.5k'
	},
	{
		id: 4,
		title: 'Deleted Scenes',
		type: 'Video',
		image:
			'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
		views: '45k'
	},
	{
		id: 5,
		title: 'Soundtrack Recording',
		type: 'Music',
		image:
			'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
		views: '32k'
	},
	{
		id: 6,
		title: 'VFX Breakdown',
		type: 'Tech',
		image:
			'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
		views: '19k'
	}
]

function DiscoveryPage() {
	return (
		<div className='min-h-screen bg-zinc-900 pt-24 text-white'>
			<Header />
			<div className='container mx-auto px-4 md:px-8'>
				{/* Header */}
				<div className='mb-8 flex items-end justify-between'>
					<div>
						<h1 className='flex items-center gap-3 text-4xl font-extrabold text-white'>
							<Compass className='text-purple-500' size={36} />
							Discovery
						</h1>
						<p className='mt-2 text-gray-400'>
							Dive deeper into the worlds you love.
						</p>
					</div>
				</div>

				{/* Categories */}
				<div className='scrollbar-hide mb-10 flex space-x-4 overflow-x-auto pb-4'>
					{categories.map((cat, i) => (
						<button
							key={i}
							className='flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900/50 px-6 py-2 text-sm font-semibold whitespace-nowrap transition hover:border-purple-500 hover:bg-purple-500/10'
						>
							<Hash size={14} className='text-gray-500' /> {cat}
						</button>
					))}
				</div>

				{/* Masonry-style Grid */}
				<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-10'>
					{discoveryItems.map((item) => (
						<div
							key={item.id}
							className='group relative overflow-hidden rounded-xl bg-gray-900'
						>
							<img
								src={item.image}
								alt={item.title}
								className='h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90' />

							<div className='absolute bottom-0 left-0 w-full p-4'>
								<span className='mb-2 inline-block rounded bg-purple-600 px-2 py-0.5 text-xs font-bold uppercase'>
									{item.type}
								</span>
								<h3 className='text-lg font-bold'>{item.title}</h3>
								<div className='mt-2 flex items-center justify-between text-xs text-gray-400'>
									<span>{item.views} Views</span>
									<div className='flex gap-3'>
										<button className='hover:text-white'>
											<Heart size={16} />
										</button>
										<button className='hover:text-white'>
											<Share2 size={16} />
										</button>
									</div>
								</div>
							</div>

							<div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100'>
								<button className='flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white/40'>
									<Play fill='white' className='ml-1 text-white' />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<Footer/>
		</div>
	)
}

export default DiscoveryPage
