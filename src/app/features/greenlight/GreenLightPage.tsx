import { CheckCircle2, ChevronRight, Clock, TrendingUp, Users, Zap } from 'lucide-react';



import Footer from "../../components/layout/Footer.tsx";
import Header from '../../components/layout/Header.tsx'





// Mock Data: Crowdfunding Projects
const projects = [
	{
		id: 1,
		title: 'Neon Shadows: Pilot',
		creator: 'Studio 88',
		genre: 'Sci-Fi Thriller',
		description:
			'A detective in a sunless city discovers a conspiracy that goes deeper than the underground. Help us build the set for the pilot episode.',
		raised: 85000,
		goal: 120000,
		backers: 1240,
		daysLeft: 14,
		image:
			'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
		perks: ['Digital Download', 'Name in Credits']
	},
	{
		id: 2,
		title: 'The Bakery on Mars',
		creator: 'Indie Collective',
		genre: 'Animation',
		description:
			"Trying to make the perfect croissant in zero gravity isn't easy. A heartwarming animated short about finding home.",
		raised: 15400,
		goal: 15000,
		backers: 890,
		daysLeft: 3,
		image:
			'https://images.unsplash.com/photo-1627850604058-52e40de1b847?auto=format&fit=crop&w=800&q=80',
		perks: ['Early Access', 'Art Book PDF']
	},
	{
		id: 3,
		title: 'Deep Blue: Season 2',
		creator: 'Oceania Docs',
		genre: 'Documentary',
		description:
			'You loved Season 1. Now help us fund the expedition to the Mariana Trench for the sequel.',
		raised: 45000,
		goal: 200000,
		backers: 340,
		daysLeft: 45,
		image:
			'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=800&q=80',
		perks: ['Exclusive Q&A']
	}
]

function GreenLightPage() {
	return (
		<div className='min-h-screen bg-zinc-900 pt-24 text-white'>
			<Header/>
			<div className='container mx-auto px-4 md:px-8'>
				{/* Hero / Header */}
				<div className='mb-16 rounded-3xl border border-purple-900/50 bg-gradient-to-br from-purple-900/40 via-black to-black p-8 text-center md:p-12'>
					<div className='mb-6 flex justify-center'>
						<div className='flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/20 shadow-[0_0_30px_rgba(34,197,94,0.3)]'>
							<Zap className='text-purple-500' size={40} fill='currentColor' />
						</div>
					</div>
					<h1 className='mb-4 text-4xl font-extrabold text-white md:text-6xl'>
						Green Light <span className='text-purple-500'>Studios</span>
					</h1>
					<p className='mx-auto mb-8 max-w-2xl text-lg text-gray-400'>
						Directly fund the content you want to see. Back projects, earn
						exclusive perks, and become a producer on the next big hit.
					</p>
					<div className='flex flex-wrap justify-center gap-4'>
						<div className='flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900 px-5 py-2 text-sm text-gray-300'>
							<TrendingUp size={16} className='text-purple-500' /> 100% of funds
							go to production
						</div>
						<div className='flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900 px-5 py-2 text-sm text-gray-300'>
							<CheckCircle2 size={16} className='text-purple-500' /> Verified
							Creators
						</div>
					</div>
				</div>

				{/* Projects Grid */}
				<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
					{projects.map((project) => {
						const percentFunded = Math.min(
							(project.raised / project.goal) * 100,
							100
						)
						const isFunded = project.raised >= project.goal

						return (
							<div
								key={project.id}
								className='group flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-900/20'
							>
								{/* Card Image */}
								<div className='relative aspect-video w-full overflow-hidden'>
									<img
										src={project.image}
										alt={project.title}
										className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
									/>
									<div className='absolute top-3 left-3 rounded-md bg-black/70 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm'>
										{project.genre}
									</div>
									{isFunded && (
										<div className='absolute right-3 bottom-3 flex items-center gap-1 rounded-md bg-purple-500 px-2 py-1 text-xs font-bold text-black shadow-lg'>
											<Zap size={12} fill='black' /> FUNDED
										</div>
									)}
								</div>

								{/* Card Body */}
								<div className='flex flex-1 flex-col p-6'>
									<div className='mb-1 flex items-center justify-between'>
										<span className='text-xs font-semibold text-purple-400'>
											{project.creator}
										</span>
									</div>
									<h3 className='mb-2 text-xl font-bold text-white group-hover:text-purple-400'>
										{project.title}
									</h3>
									<p className='mb-6 line-clamp-2 flex-1 text-sm text-gray-400'>
										{project.description}
									</p>

									{/* Funding Stats */}
									<div className='mb-4 space-y-3'>
										<div className='relative h-2 w-full overflow-hidden rounded-full bg-gray-800'>
											<div
												className={`h-full ${isFunded ? 'bg-purple-400' : 'bg-purple-600'}`}
												style={{ width: `${percentFunded}%` }}
											/>
										</div>

										<div className='flex items-end justify-between'>
											<div>
												<div className='text-lg font-bold text-white'>
													${project.raised.toLocaleString()}
												</div>
												<div className='text-xs text-gray-500'>
													pledged of ${project.goal.toLocaleString()}
												</div>
											</div>
											<div className='text-right'>
												<div className='text-lg font-bold text-white'>
													{Math.round((project.raised / project.goal) * 100)}%
												</div>
												<div className='text-xs text-gray-500'>funded</div>
											</div>
										</div>
									</div>

									{/* Footer Stats */}
									<div className='flex items-center justify-between border-t border-gray-800 pt-4 text-xs text-gray-400'>
										<div className='flex items-center gap-1'>
											<Users size={14} /> {project.backers} backers
										</div>
										<div className='flex items-center gap-1'>
											<Clock size={14} /> {project.daysLeft} days left
										</div>
									</div>

									<button className='mt-6 w-full rounded-lg bg-white py-3 font-bold text-black transition hover:bg-purple-500 hover:text-white'>
										Back this Project
									</button>
								</div>
							</div>
						)
					})}
				</div>

				{/* Bottom CTA */}
				<div className='mt-20 text-center mb-4'>
					<h2 className='text-2xl font-bold text-white'>Are you a creator?</h2>
					<button className='mx-auto mt-4 flex items-center gap-2 text-purple-400 hover:text-purple-500'>
						Submit your script for review <ChevronRight size={16} />
					</button>
				</div>
			</div>
			<Footer/>
		</div>

	)
}

export default GreenLightPage
