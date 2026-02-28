import horizonBanner from '/images/banners/horizon-wide.jpg'
import leukBanner from '/images/banners/leuk-wide.jpg'
import wallpaper from '/images/banners/wallpaper.jpg'
import zigguratBanner from '/images/banners/ziggurat-wide.jpg'
import horizon from '/images/covers/Horizons Poster (Temp).png'
import horizonPoster from '/images/covers/Horizons Poster (Temp).png'
import kalama from '/images/covers/Kalaama Poster (Temp).png'
import leuk from '/images/covers/Leuk Poster (Temp).png'
import leukPoster from '/images/covers/Leuk Poster (Temp).png'
import placeholder from '/images/covers/Placeholder.png'
import videoIntro from '/videos/intro.mp4'

export interface Episode {
	id: number
	title: string
	description: string
	thumbnailUrl: string
	duration: string
}

export interface Season {
	seasonNumber: number
	episodes: Episode[]
}

export interface MediaItem {
	creatorId: string | undefined
	id: number
	title: string
	posterUrl: string
	bannerUrl?: string
	year: number
	releaseDate: string
	rating: string
	description: string
	quality?: string
	features?: string[]
	duration?: string
	type: 'movie' | 'show' | 'original' | 'documentary'
	genres?: string[]
	liveNow?: boolean
	vimeoId?: number
	videoUrl?: string
	trailerUrl?: string
	teaserUrl?: string
	cast: string[]
	production: string
	country: string
	languages?: string[]
	director?: string
	seasons?: Season[]
	episodes?: number
	lifetimeEarnings?: number
	lastMonthEarnings?: number
	totalViews?: number
	totalLikes?: number
}

export const heroSlides: MediaItem[] = [
	{
		id: 1,
		title: 'Horizons',
		description:
			'Horizons is a captive sports docu-series that takes viewers on an immersive journey through the rich and diverse landscape of Senegal and their wider content',
		posterUrl: horizonPoster,
		bannerUrl: horizonBanner,
		year: 2025,
		releaseDate: '250315', // March 15, 2025
		rating: '9.0',
		quality: '1080p HD',
		features: ['CC', 'Atmos'],
		duration: '2 Seasons',
		type: 'original',
		genres: ['Documentary', 'Sports'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro, // ✨ Added teaser URL
		cast: ['Awa Sene', 'Ibrahima Mbaye', 'Fatou Diop', 'Moussa Ndiaye'],
		production: 'Kemet Originals',
		country: 'Senegal',
		languages: ['Wolof', 'French', 'English'],
		seasons: [],
		creatorId: 'user-002',
		lifetimeEarnings: 56840,
		lastMonthEarnings: 4120,
		totalViews: 1200000
	},
	{
		id: 2,
		title: "Leuk's Kingdom",
		description:
			"Once upon a time, Leuk, the smartest animal in the bush and forest, sets out to thwart King Centipede's evil plans.",
		posterUrl: leukPoster,
		bannerUrl: leukBanner,
		year: 2025,
		releaseDate: '250622', // June 22, 2025
		rating: '8.7',
		quality: '1080p UHD',
		features: ['CC', '5.1'],
		duration: '2h 34mn',
		type: 'original',
		genres: ['Animation', 'Adventure', 'Family'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Omar Sy', 'Fatoumata Diawara', 'Issa Rae', 'Cheikh Tidiane'],
		production: 'Kemet Animation',
		country: 'Senegal',
		languages: ['French', 'English'],
		director: 'Mamadou Diop',
		creatorId: 'user-002',
		lifetimeEarnings: 24500,
		lastMonthEarnings: 1800,
		totalViews: 850000
	},
	{
		id: 3,
		title: 'The Ivory Sun',
		description:
			'In the heart of ancestral Africa, the Anansi Empire teeters on the precipice of war with the enigmatic Eastern Kingdoms from Faraway.',
		posterUrl: placeholder,
		bannerUrl: zigguratBanner,
		year: 2025,
		releaseDate: '251010', // October 10, 2025
		rating: '9.2',
		quality: '1080p HD',
		features: ['CC'],
		duration: '1h 32m',
		type: 'original',
		genres: ['Fantasy', 'Action'],
		liveNow: true,
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['John Boyega', 'Danai Gurira', 'Djimon Hounsou', "Lupita Nyong'o"],
		production: 'Marvel Studios',
		country: 'USA',
		languages: ['English'],
		director: 'Ryan Coogler',
		creatorId: 'user-002'
	},
	{
		id: 4,
		title: 'Sands of Time',
		description:
			'An epic journey through ancient Egypt as a young archaeologist discovers a portal to the past.',
		posterUrl: placeholder,
		bannerUrl: wallpaper,
		year: 2025,
		releaseDate: '251215', // December 15, 2025
		rating: '9.5',
		quality: '4K UHD',
		features: ['CC', 'Atmos', 'HDR'],
		duration: '2h 15m',
		type: 'original',
		genres: ['Adventure', 'Fantasy', 'History'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: [
			'Rami Malek',
			"Lupita Nyong'o",
			'Chadwick Boseman',
			'Letitia Wright'
		],
		production: 'Kemet Originals',
		country: 'Egypt',
		languages: ['English', 'Arabic'],
		director: 'Ava DuVernay',
		creatorId: 'user-003',
		lifetimeEarnings: 32000,
		lastMonthEarnings: 2500,
		totalViews: 950000
	},
	{
		id: 5,
		title: "Mansa's Gold",
		description:
			'The legendary journey of Mansa Musa, the richest man in history, and his famous pilgrimage to Mecca.',
		posterUrl: placeholder,
		bannerUrl: wallpaper,
		year: 2025,
		releaseDate: '250801', // August 1, 2025
		rating: '9.3',
		quality: '4K UHD',
		features: ['CC', 'Atmos', 'HDR10+'],
		duration: '2h 45m',
		type: 'original',
		genres: ['Historical', 'Drama', 'Adventure'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: [
			'David Oyelowo',
			'Danai Gurira',
			'Chadwick Boseman',
			"Lupita Nyong'o"
		],
		production: 'Kemet Originals',
		country: 'Mali',
		languages: ['English', 'Bambara', 'Arabic'],
		director: 'Steve McQueen',
		creatorId: 'user-004',
		lifetimeEarnings: 45000,
		lastMonthEarnings: 3800,
		totalViews: 1250000
	}
]

export const recommendedItems: MediaItem[] = [
	{
		id: 6,
		title: 'Horizons',
		posterUrl: horizon,
		bannerUrl: horizonBanner,
		year: 2022,
		releaseDate: '220715',
		rating: '7.9',
		description: 'An adventurer searches for a lost city of gold.',
		type: 'movie',
		genres: ['Adventure', 'Action'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Dwayne Johnson', 'Karen Gillan', 'Jack Black', 'Kevin Hart'],
		production: 'Universal Pictures',
		country: 'USA',
		languages: ['English', 'Spanish'],
		director: 'Jake Kasdan',
		duration: '1h 52m',
		quality: '1080p HD',
		creatorId: 'user-002'
	},
	{
		id: 7,
		title: 'Leuk',
		posterUrl: leuk,
		bannerUrl: leukBanner,
		year: 2024,
		releaseDate: '240209',
		rating: '9.3',
		description:
			'A young sorceress must master her powers to save her kingdom.',
		type: 'original',
		genres: ['Fantasy', 'Drama'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: [
			'Thuso Mbedu',
			'Yahya Abdul-Mateen II',
			'Natalie Dormer',
			'David Oyelowo'
		],
		production: 'Kemet Originals',
		country: 'South Africa',
		languages: ['English', 'Zulu'],
		director: 'Gina Prince-Bythewood',
		duration: '2h 25m',
		quality: '4K UHD',
		features: ['HDR10', 'Dolby Atmos'],
		creatorId: ''
	},
	{
		id: 8,
		title: 'Kalama',
		posterUrl: kalama,
		year: 2021,
		releaseDate: '210521',
		rating: '8.8',
		description:
			'A documentary exploring the hidden world of deep-sea creatures.',
		type: 'movie',
		genres: ['Documentary', 'Nature'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['David Attenborough', 'Sylvia Earle'],
		production: 'BBC Earth',
		country: 'UK',
		languages: ['English'],
		director: 'James Cameron',
		duration: '1h 30m',
		quality: '4K UHD',
		features: ['IMAX Enhanced'],
		creatorId: ''
	},
	{
		id: 9,
		title: 'Red Planet',
		posterUrl: placeholder,
		year: 2021,
		releaseDate: '211112',
		rating: '7.2',
		description: 'The first manned mission to Mars takes a catastrophic turn.',
		type: 'movie',
		genres: ['Sci-Fi', 'Adventure'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Matt Damon', 'Jessica Chastain', 'Kristen Wiig', 'Jeff Daniels'],
		production: '20th Century Studios',
		country: 'USA',
		languages: ['English'],
		director: 'Ridley Scott',
		duration: '2h 14m',
		quality: '1080p HD',
		creatorId: ''
	},
	{
		id: 10,
		title: 'The Conductor',
		posterUrl: placeholder,
		year: 2019,
		releaseDate: '190503',
		rating: '8.9',
		description: 'An unorthodox teacher inspires his students to greatness.',
		type: 'movie',
		genres: ['Drama', 'Music'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Mahershala Ali', 'Naomie Harris', 'Janelle Monáe', 'André Holland'],
		production: 'A24',
		country: 'USA',
		languages: ['English'],
		director: 'Barry Jenkins',
		duration: '1h 58m',
		quality: '1080p HD',
		creatorId: ''
	},
	{
		id: 26,
		title: 'Desert Rose',
		posterUrl: placeholder,
		year: 2023,
		releaseDate: '230810',
		rating: '8.6',
		description: "A nomadic woman's journey to reclaim her ancestral homeland.",
		type: 'movie',
		genres: ['Drama', 'Adventure'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: [
			"Lupita Nyong'o",
			'Daniel Kaluuya',
			'Chiwetel Ejiofor',
			'Danai Gurira'
		],
		production: 'Kemet Originals',
		country: 'Kenya',
		languages: ['Swahili', 'English'],
		director: 'Wanuri Kahiu',
		duration: '2h 5m',
		quality: '4K UHD',
		features: ['HDR10+'],
		creatorId: 'user-004',
		lifetimeEarnings: 18500,
		lastMonthEarnings: 1500,
		totalViews: 420000
	},
	{
		id: 30,
		title: 'Jazz Nights',
		posterUrl: placeholder,
		year: 2024,
		releaseDate: '240712',
		rating: '8.7',
		description:
			'A musical drama set in the vibrant jazz scene of 1960s Harlem.',
		type: 'movie',
		genres: ['Music', 'Drama', 'Romance'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: [
			'John David Washington',
			'Teyonah Parris',
			'Lakeith Stanfield',
			'Janelle Monáe'
		],
		production: 'Universal Pictures',
		country: 'USA',
		languages: ['English'],
		director: 'Barry Jenkins',
		duration: '2h 18m',
		quality: '4K UHD',
		features: ['Dolby Atmos'],
		creatorId: 'user-008',
		lifetimeEarnings: 32500,
		lastMonthEarnings: 2800,
		totalViews: 780000
	}
]

export const movieItems: MediaItem[] = [
	{
		id: 11,
		title: 'Laugh Riot',
		posterUrl: placeholder,
		year: 2022,
		releaseDate: '220408',
		rating: '7.5',
		description: "A stand-up comedian's life is funnier off-stage.",
		type: 'movie',
		genres: ['Comedy'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Kevin Hart', 'Tiffany Haddish', 'Dave Chappelle', 'Ali Wong'],
		production: 'Netflix',
		country: 'USA',
		languages: ['English'],
		director: 'Spike Lee',
		duration: '1h 45m',
		quality: '1080p HD',
		creatorId: ''
	},
	{
		id: 12,
		title: 'Silent Witness',
		posterUrl: placeholder,
		year: 2020,
		releaseDate: '200710',
		rating: '8.3',
		description: 'A detective must solve a murder with no witnesses.',
		type: 'movie',
		genres: ['Thriller', 'Mystery'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: [
			'Daniel Kaluuya',
			'Lakeith Stanfield',
			'Dominique Fishback',
			'Jesse Plemons'
		],
		production: 'Warner Bros.',
		country: 'USA',
		languages: ['English'],
		director: 'Shaka King',
		duration: '2h 6m',
		quality: '4K UHD',
		creatorId: ''
	},
	{
		id: 13,
		title: 'Midnight Run',
		posterUrl: placeholder,
		year: 2023,
		releaseDate: '230521',
		rating: '8.0',
		description:
			'A bounty hunter must transport a fugitive across the country.',
		type: 'movie',
		genres: ['Action', 'Comedy'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Dwayne Johnson', 'Ryan Reynolds', 'Gal Gadot', 'Idris Elba'],
		production: 'Universal Pictures',
		country: 'USA',
		languages: ['English'],
		director: 'Rawson Marshall Thurber',
		duration: '2h 5m',
		quality: '4K UHD',
		creatorId: ''
	},
	{
		id: 14,
		title: 'Eternal Sunshine',
		posterUrl: placeholder,
		year: 2022,
		releaseDate: '220914',
		rating: '8.7',
		description:
			'A couple undergoes a procedure to erase each other from their memories.',
		type: 'movie',
		genres: ['Romance', 'Drama', 'Sci-Fi'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Emma Stone', 'Ryan Gosling', 'Michael B. Jordan', 'Zendaya'],
		production: 'A24',
		country: 'USA',
		languages: ['English'],
		director: 'Charlie Kaufman',
		duration: '1h 48m',
		quality: '1080p HD',
		creatorId: ''
	},
	{
		id: 15,
		title: 'The Last Frontier',
		posterUrl: placeholder,
		year: 2024,
		releaseDate: '240306',
		rating: '8.4',
		description: 'A team of explorers ventures into an uncharted wilderness.',
		type: 'movie',
		genres: ['Adventure', 'Thriller'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Chris Pratt', 'Bryce Dallas Howard', 'Tom Hardy', 'Florence Pugh'],
		production: 'Disney',
		country: 'USA',
		languages: ['English'],
		director: 'James Gunn',
		duration: '2h 12m',
		quality: '4K UHD',
		creatorId: ''
	},
	{
		id: 27,
		title: 'Harmattan Winds',
		posterUrl: placeholder,
		year: 2024,
		releaseDate: '240501',
		rating: '8.9',
		description:
			'A sweeping romance set against the backdrop of the Sahara desert.',
		type: 'movie',
		genres: ['Romance', 'Drama'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Adjani Salmon', 'Jude Akuwudike', 'Weruche Opia', 'Samson Kayo'],
		production: 'Kemet Originals',
		country: 'Nigeria',
		languages: ['English', 'Hausa'],
		director: 'C.J. Obasi',
		duration: '2h 8m',
		quality: '4K UHD',
		features: ['Dolby Vision'],
		creatorId: 'user-005',
		lifetimeEarnings: 27600,
		lastMonthEarnings: 2100,
		totalViews: 680000
	},
	{
		id: 31,
		title: 'Urban Legends',
		posterUrl: placeholder,
		year: 2023,
		releaseDate: '231028',
		rating: '7.8',
		description:
			'A horror anthology based on popular urban legends from around the world.',
		type: 'movie',
		genres: ['Horror', 'Thriller', 'Anthology'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: [
			'Daniel Kaluuya',
			'Letitia Wright',
			'Winston Duke',
			"Lupita Nyong'o"
		],
		production: 'Blumhouse Productions',
		country: 'USA',
		languages: ['English'],
		director: 'Jordan Peele',
		duration: '2h 5m',
		quality: '4K UHD',
		features: ['Dolby Vision', 'Atmos'],
		creatorId: 'user-009',
		lifetimeEarnings: 41200,
		lastMonthEarnings: 3200,
		totalViews: 950000
	}
]

export const showItems: MediaItem[] = [
	{
		id: 16,
		title: 'The Crown',
		posterUrl: placeholder,
		year: 2016,
		releaseDate: '161104',
		rating: '8.7',
		description: 'Follows the reign of Queen Elizabeth II.',
		type: 'show',
		genres: ['Drama', 'History'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Claire Foy', 'Olivia Colman', 'Matt Smith', 'Tobias Menzies'],
		production: 'Netflix',
		country: 'UK',
		languages: ['English'],
		duration: '50m per episode',
		quality: '4K UHD',
		creatorId: '',
		seasons: [
			{
				seasonNumber: 1,
				episodes: [
					{
						id: 101,
						title: 'Wolferton Splash',
						description:
							'A young Princess Elizabeth marries Philip. As King George VI’s health declines, Winston Churchill is elected Prime Minister for the second time.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E1',
						duration: '56m'
					},
					{
						id: 102,
						title: 'Hyde Park Corner',
						description:
							'With King George VI’s health failing, Elizabeth and Philip embark on a four-continent tour. Prime Minister Churchill’s cabinet question his judgement.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E2',
						duration: '1h 1m'
					},
					{
						id: 103,
						title: 'Windsor',
						description:
							'With a new Queen, Philip insists on a more prominent role. Elizabeth moves her family into Buckingham Palace.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E3',
						duration: '58m'
					}
				]
			},
			{
				seasonNumber: 2,
				episodes: [
					{
						id: 201,
						title: 'Misadventure',
						description:
							'As Philip leaves for a long tour, Elizabeth makes a discovery that could change their marriage. The Prime Minister is facing a political crisis.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E1',
						duration: '52m'
					},
					{
						id: 202,
						title: 'A Company of Men',
						description:
							'Philip enjoys the press attention on his royal tour, but an interview with a journalist has unforeseen consequences for the monarchy.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E2',
						duration: '55m'
					}
				]
			}
		]
	},
	{
		id: 17,
		title: 'Code Breakers',
		posterUrl: placeholder,
		year: 2021,
		releaseDate: '210912',
		rating: '8.4',
		description: 'A group of hackers take on corporate giants.',
		type: 'show',
		genres: ['Thriller', 'Drama', 'Tech'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: [
			'Rami Malek',
			'Christian Slater',
			'Carly Chaikin',
			'Portia Doubleday'
		],
		production: 'HBO',
		country: 'USA',
		languages: ['English'],
		duration: '45m per episode',
		quality: '1080p HD',
		creatorId: '',
		seasons: [
			{
				seasonNumber: 1,
				episodes: [
					{
						id: 101,
						title: 'Wolferton Splash',
						description:
							'A young Princess Elizabeth marries Philip. As King George VI’s health declines, Winston Churchill is elected Prime Minister for the second time.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E1',
						duration: '56m'
					},
					{
						id: 102,
						title: 'Hyde Park Corner',
						description:
							'With King George VI’s health failing, Elizabeth and Philip embark on a four-continent tour. Prime Minister Churchill’s cabinet question his judgement.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E2',
						duration: '1h 1m'
					},
					{
						id: 103,
						title: 'Windsor',
						description:
							'With a new Queen, Philip insists on a more prominent role. Elizabeth moves her family into Buckingham Palace.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E3',
						duration: '58m'
					}
				]
			},
			{
				seasonNumber: 2,
				episodes: [
					{
						id: 201,
						title: 'Misadventure',
						description:
							'As Philip leaves for a long tour, Elizabeth makes a discovery that could change their marriage. The Prime Minister is facing a political crisis.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E1',
						duration: '52m'
					},
					{
						id: 202,
						title: 'A Company of Men',
						description:
							'Philip enjoys the press attention on his royal tour, but an interview with a journalist has unforeseen consequences for the monarchy.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E2',
						duration: '55m'
					}
				]
			}
		]
	},
	{
		id: 18,
		title: 'The Alchemist',
		posterUrl: placeholder,
		year: 2022,
		releaseDate: '220225',
		rating: '7.8',
		description: 'A fantasy series where magic and science collide.',
		type: 'show',
		genres: ['Fantasy', 'Adventure'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Henry Cavill', 'Anya Chalotra', 'Freya Allan', 'Joey Batey'],
		production: 'Netflix',
		country: 'Poland',
		languages: ['English'],
		seasons: [],
		duration: '60m per episode',
		quality: '4K UHD',
		creatorId: ''
	},
	{
		id: 19,
		title: 'City Central',
		posterUrl: placeholder,
		year: 2018,
		releaseDate: '180309',
		rating: '8.1',
		description: 'The daily lives of police officers in a bustling metropolis.',
		type: 'show',
		genres: ['Drama', 'Crime'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Jason Bateman', 'Laura Linney', 'Julia Garner', 'Tom Pelphrey'],
		production: 'Netflix',
		country: 'USA',
		languages: ['English'],
		duration: '55m per episode',
		quality: '1080p HD',
		creatorId: '',
		seasons: [
			{
				seasonNumber: 1,
				episodes: [
					{
						id: 101,
						title: 'Wolferton Splash',
						description:
							'A young Princess Elizabeth marries Philip. As King George VI’s health declines, Winston Churchill is elected Prime Minister for the second time.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E1',
						duration: '56m'
					},
					{
						id: 102,
						title: 'Hyde Park Corner',
						description:
							'With King George VI’s health failing, Elizabeth and Philip embark on a four-continent tour. Prime Minister Churchill’s cabinet question his judgement.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E2',
						duration: '1h 1m'
					},
					{
						id: 103,
						title: 'Windsor',
						description:
							'With a new Queen, Philip insists on a more prominent role. Elizabeth moves her family into Buckingham Palace.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E3',
						duration: '58m'
					}
				]
			},
			{
				seasonNumber: 2,
				episodes: [
					{
						id: 201,
						title: 'Misadventure',
						description:
							'As Philip leaves for a long tour, Elizabeth makes a discovery that could change their marriage. The Prime Minister is facing a political crisis.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E1',
						duration: '52m'
					},
					{
						id: 202,
						title: 'A Company of Men',
						description:
							'Philip enjoys the press attention on his royal tour, but an interview with a journalist has unforeseen consequences for the monarchy.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E2',
						duration: '55m'
					}
				]
			}
		]
	},
	{
		id: 20,
		title: 'Space Frontier',
		posterUrl: placeholder,
		year: 2023,
		releaseDate: '230511',
		rating: '8.9',
		description: "The story of humanity's first interstellar colony ship.",
		type: 'show',
		genres: ['Sci-Fi', 'Drama'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: [
			'Jessica Chastain',
			'John Krasinski',
			'Oscar Isaac',
			'Rebecca Ferguson'
		],
		production: 'Apple TV+',
		country: 'USA',
		languages: ['English'],
		duration: '55m per episode',
		quality: '4K UHD',
		creatorId: '',
		seasons: [
			{
				seasonNumber: 1,
				episodes: [
					{
						id: 101,
						title: 'Wolferton Splash',
						description:
							'A young Princess Elizabeth marries Philip. As King George VI’s health declines, Winston Churchill is elected Prime Minister for the second time.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E1',
						duration: '56m'
					},
					{
						id: 102,
						title: 'Hyde Park Corner',
						description:
							'With King George VI’s health failing, Elizabeth and Philip embark on a four-continent tour. Prime Minister Churchill’s cabinet question his judgement.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E2',
						duration: '1h 1m'
					},
					{
						id: 103,
						title: 'Windsor',
						description:
							'With a new Queen, Philip insists on a more prominent role. Elizabeth moves her family into Buckingham Palace.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E3',
						duration: '58m'
					}
				]
			},
			{
				seasonNumber: 2,
				episodes: [
					{
						id: 201,
						title: 'Misadventure',
						description:
							'As Philip leaves for a long tour, Elizabeth makes a discovery that could change their marriage. The Prime Minister is facing a political crisis.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E1',
						duration: '52m'
					},
					{
						id: 202,
						title: 'A Company of Men',
						description:
							'Philip enjoys the press attention on his royal tour, but an interview with a journalist has unforeseen consequences for the monarchy.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E2',
						duration: '55m'
					}
				]
			}
		]
	},
	{
		id: 28,
		title: 'Anansi Tales',
		posterUrl: placeholder,
		year: 2024,
		releaseDate: '240330',
		rating: '9.0',
		description:
			'An animated series based on West African folklore about the trickster spider Anansi.',
		type: 'show',
		genres: ['Animation', 'Adventure', 'Fantasy'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['John Boyega', 'Michaela Coel', 'David Oyelowo', 'Cynthia Erivo'],
		production: 'Kemet Animation',
		country: 'Ghana',
		languages: ['English', 'Twi'],
		seasons: [
			{
				seasonNumber: 1,
				episodes: [
					{
						id: 101,
						title: 'Wolferton Splash',
						description:
							'A young Princess Elizabeth marries Philip. As King George VI’s health declines, Winston Churchill is elected Prime Minister for the second time.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E1',
						duration: '56m'
					},
					{
						id: 102,
						title: 'Hyde Park Corner',
						description:
							'With King George VI’s health failing, Elizabeth and Philip embark on a four-continent tour. Prime Minister Churchill’s cabinet question his judgement.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E2',
						duration: '1h 1m'
					},
					{
						id: 103,
						title: 'Windsor',
						description:
							'With a new Queen, Philip insists on a more prominent role. Elizabeth moves her family into Buckingham Palace.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E3',
						duration: '58m'
					}
				]
			},
			{
				seasonNumber: 2,
				episodes: [
					{
						id: 201,
						title: 'Misadventure',
						description:
							'As Philip leaves for a long tour, Elizabeth makes a discovery that could change their marriage. The Prime Minister is facing a political crisis.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E1',
						duration: '52m'
					},
					{
						id: 202,
						title: 'A Company of Men',
						description:
							'Philip enjoys the press attention on his royal tour, but an interview with a journalist has unforeseen consequences for the monarchy.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E2',
						duration: '55m'
					}
				]
			}
		],
		duration: '30m per episode',
		quality: '4K UHD',
		features: ['Dolby Atmos'],
		creatorId: 'user-006',
		lifetimeEarnings: 43200,
		lastMonthEarnings: 3800,
		totalViews: 1100000
	},
	{
		id: 32,
		title: 'Nubian Queens',
		posterUrl: placeholder,
		year: 2024,
		releaseDate: '240925',
		rating: '9.1',
		description:
			'A historical drama following the powerful queens of ancient Nubia.',
		type: 'show',
		genres: ['Historical', 'Drama', 'Action'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Thuso Mbedu', 'Danai Gurira', "Lupita Nyong'o", 'Adesua Etomi'],
		production: 'Kemet Originals',
		country: 'Sudan',
		languages: ['English', 'Nubian'],
		duration: '55m per episode',
		quality: '4K UHD',
		features: ['Dolby Vision', 'Atmos'],
		creatorId: 'user-010',
		seasons: [
			{
				seasonNumber: 1,
				episodes: [
					{
						id: 101,
						title: 'Wolferton Splash',
						description:
							'A young Princess Elizabeth marries Philip. As King George VI’s health declines, Winston Churchill is elected Prime Minister for the second time.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E1',
						duration: '56m'
					},
					{
						id: 102,
						title: 'Hyde Park Corner',
						description:
							'With King George VI’s health failing, Elizabeth and Philip embark on a four-continent tour. Prime Minister Churchill’s cabinet question his judgement.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E2',
						duration: '1h 1m'
					},
					{
						id: 103,
						title: 'Windsor',
						description:
							'With a new Queen, Philip insists on a more prominent role. Elizabeth moves her family into Buckingham Palace.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E3',
						duration: '58m'
					}
				]
			},
			{
				seasonNumber: 2,
				episodes: [
					{
						id: 201,
						title: 'Misadventure',
						description:
							'As Philip leaves for a long tour, Elizabeth makes a discovery that could change their marriage. The Prime Minister is facing a political crisis.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E1',
						duration: '52m'
					},
					{
						id: 202,
						title: 'A Company of Men',
						description:
							'Philip enjoys the press attention on his royal tour, but an interview with a journalist has unforeseen consequences for the monarchy.',
						thumbnailUrl: 'https://placehold.co/300x170/18181b/ffffff?text=E2',
						duration: '55m'
					}
				]
			}
		],
		lifetimeEarnings: 52000,
		lastMonthEarnings: 4500,
		totalViews: 1350000
	}
]

export const kemetOriginals: MediaItem[] = [
	{
		id: 21,
		title: 'Nile Mysteries',
		posterUrl: placeholder,
		year: 2024,
		releaseDate: '240201',
		rating: '9.1',
		description: 'Uncovering the secrets of the ancient pharaohs.',
		type: 'original',
		genres: ['Documentary', 'History'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Zahi Hawass', 'Salima Ikram', 'Chris Naunton', 'Bassem Youssef'],
		production: 'Kemet Originals',
		country: 'Egypt',
		languages: ['Arabic', 'English'],
		seasons: [],
		duration: '45m per episode',
		quality: '4K UHD',
		creatorId: 'user123',
		lifetimeEarnings: 15400,
		lastMonthEarnings: 1200,
		totalViews: 350000
	},
	{
		id: 22,
		title: 'Dakar Drift',
		posterUrl: placeholder,
		year: 2023,
		releaseDate: '230615',
		rating: '8.5',
		description: 'The thrilling underground racing scene of Senegal.',
		type: 'original',
		genres: ['Action', 'Sports'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['Omar Sy', 'Issa Rae', 'Djibril Cissé', 'Aïssa Maïga'],
		production: 'Kemet Originals',
		country: 'Senegal',
		languages: ['French', 'Wolof'],
		director: 'Moussa Touré',
		duration: '1h 52m',
		quality: '1080p HD',
		creatorId: ''
	},
	{
		id: 23,
		title: 'Gorée',
		posterUrl: placeholder,
		year: 2024,
		releaseDate: '240228',
		rating: '9.4',
		description: 'A powerful historical drama set on Gorée Island.',
		type: 'original',
		genres: ['Drama', 'History'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ["Maïmouna N'Diaye", 'Adjani Salmon', 'Ncuti Gatwa', 'Thuso Mbedu'],
		production: 'Kemet Originals',
		country: 'Senegal',
		languages: ['French', 'Wolof', 'English'],
		director: 'Mati Diop',
		duration: '2h 18m',
		quality: '4K UHD',
		creatorId: ''
	},
	{
		id: 24,
		title: 'Sankofa',
		posterUrl: placeholder,
		year: 2024,
		releaseDate: '240610',
		rating: '8.9',
		description: 'A time-traveling adventure through African history.',
		type: 'original',
		genres: ['Fantasy', 'Adventure', 'History'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: [
			'David Oyelowo',
			"Lupita Nyong'o",
			'Chadwick Boseman',
			'Danai Gurira'
		],
		production: 'Kemet Originals',
		country: 'Nigeria',
		languages: ['English', 'Yoruba'],
		director: 'Ava DuVernay',
		duration: '2h 5m',
		quality: '4K UHD',
		creatorId: ''
	},
	{
		id: 25,
		title: 'Timbuktu Chronicles',
		posterUrl: placeholder,
		year: 2023,
		releaseDate: '230923',
		rating: '8.7',
		description: 'The golden age of the Mali Empire and its legendary city.',
		type: 'original',
		genres: ['Drama', 'History'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: [
			'Djimon Hounsou',
			'John Boyega',
			'Nadine Marshall',
			'Adelayo Adedayo'
		],
		production: 'Kemet Originals',
		country: 'Mali',
		languages: ['French', 'Bambara', 'English'],
		seasons: [],
		duration: '50m per episode',
		quality: '4K UHD',
		creatorId: ''
	},
	{
		id: 29,
		title: 'Kush Kingdom',
		posterUrl: placeholder,
		year: 2024,
		releaseDate: '240815',
		rating: '9.2',
		description:
			'The epic story of the ancient Kingdom of Kush and its powerful rulers.',
		type: 'original',
		genres: ['Drama', 'History', 'Action'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: [
			'Daniel Kaluuya',
			'Letitia Wright',
			'Winston Duke',
			'Angela Bassett'
		],
		production: 'Kemet Originals',
		country: 'Sudan',
		languages: ['English', 'Arabic'],
		seasons: [],
		duration: '55m per episode',
		quality: '4K UHD',
		features: ['Dolby Vision', 'Atmos'],
		creatorId: 'user-007',
		lifetimeEarnings: 58700,
		lastMonthEarnings: 5200,
		totalViews: 1450000
	},
	{
		id: 33,
		title: 'Zulu Dawn',
		posterUrl: placeholder,
		year: 2024,
		releaseDate: '241120',
		rating: '9.4',
		description:
			"An epic retelling of the Zulu Kingdom's rise and resistance against colonial forces.",
		type: 'original',
		genres: ['Historical', 'War', 'Drama'],
		vimeoId: 1112723493,
		videoUrl: videoIntro,
		trailerUrl: videoIntro,
		teaserUrl: videoIntro,
		cast: ['John Boyega', 'Chadwick Boseman', 'Danai Gurira', 'Winston Duke'],
		production: 'Kemet Originals',
		country: 'South Africa',
		languages: ['English', 'Zulu'],
		seasons: [],
		duration: '60m per episode',
		quality: '4K UHD',
		features: ['Dolby Vision', 'Atmos'],
		creatorId: 'user-011',
		lifetimeEarnings: 65000,
		lastMonthEarnings: 5800,
		totalViews: 1650000
	}
]

export const allItems = [
	...heroSlides,
	...recommendedItems,
	...movieItems,
	...showItems,
	...kemetOriginals
]
