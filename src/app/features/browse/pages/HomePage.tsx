import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { allItems, type MediaItem } from '../../../../data/shows.ts'
import Hero from '../../../components/common/Hero.tsx'
import SearchField from '../../../components/common/SearchField.tsx'
import SearchOverlay from '../../../components/common/SearchOverlay.tsx'
import SearchResults from '../../../components/common/SearchResults.tsx'
import Footer from '../../../components/layout/Footer.tsx'
import Header from '../../../components/layout/Header.tsx'
import { useAiRecommendations } from '../../../hooks/useAiRecommendations.ts'
import { useAuth } from '../../../hooks/useAuth.ts'
import Content from '../components/Content.tsx'
import CuratedSelection from '../components/CurratedSelection.tsx'
import FeaturesSection from '../components/FeaturesSection.tsx'
import JoinJourney from '../components/JoinJourney.tsx'
import PricingSection from '../components/PricingSection.tsx'

function HomePage() {
	const { t } = useTranslation()
	const { user } = useAuth()
	const [showSearchField, setShowSearchField] = useState(false)
	const [searchResults, setSearchResults] = useState<MediaItem[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [showResults, setShowResults] = useState(false)
	const { recommendations: aiRecommendations, isLoading: isAiLoading } =
		useAiRecommendations(user, allItems)

	const handleSearch = (query: string) => {
		setSearchQuery(query)
		const results = allItems.filter(
			(item) =>
				item.title.toLowerCase().includes(query.toLowerCase()) ||
				item.description.toLowerCase().includes(query.toLowerCase()) ||
				item.genres?.some((genre) =>
					genre.toLowerCase().includes(query.toLowerCase())
				) ||
				(item.cast &&
					item.cast.some((actor) =>
						actor.toLowerCase().includes(query.toLowerCase())
					))
		)

		setSearchResults(results)
		setShowResults(true)
		setShowSearchField(false)
	}

	const closeResults = () => {
		setShowResults(false)
		setSearchQuery('')
	}

	return (
		<div className='min-h-screen bg-white dark:bg-zinc-900'>
			<Header />
			<SearchOverlay />

			{showSearchField && (
				<div className='fixed top-[120px] left-0 z-40 w-full bg-transparent'>
					<SearchField
						onSubmit={handleSearch}
						placeholder={t('search.placeholder')}
					/>
				</div>
			)}

			{user ? (
				<>
					<Hero />
					<main className='container mx-auto py-6'>
						<Content
							aiRecommendations={aiRecommendations}
							isAiLoading={isAiLoading}
						/>
					</main>
				</>
			) : (
				<>
					<Hero />
					<JoinJourney />
					<FeaturesSection />
					<CuratedSelection />
					<PricingSection />
				</>
			)}
			<Footer />
			{showResults && (
				<SearchResults
					results={searchResults}
					query={searchQuery}
					onClose={closeResults}
				/>
			)}
		</div>
	)
}

export default HomePage
