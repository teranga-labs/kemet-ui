import { useEffect, useState } from 'react'

import type { MediaItem } from '../../data/shows'
import type { User } from '../contexts/AuthContext'

import { useLikes } from './useLikes'

const userPreferences: { [key: string]: { genres: string[]; cast: string[] } } =
	{
		'user-001': {
			genres: ['Drama', 'Thriller', 'Historical'],
			cast: ['Danai Gurira', 'Thuso Mbedu']
		},
		'user-002': {
			genres: ['Documentary', 'Animation', 'Sports'],
			cast: ['Omar Sy', 'Issa Rae']
		},
		'user-003': {
			genres: ['Adventure', 'Fantasy', 'Action'],
			cast: ['John Boyega', "Lupita Nyong'o"]
		}
	}

export function useAiRecommendations(user: User | null, allItems: MediaItem[]) {
	const [recommendations, setRecommendations] = useState<MediaItem[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const { likedItems } = useLikes()

	useEffect(() => {
		if (!user || !allItems.length) {
			setIsLoading(false)
			return
		}

		setIsLoading(true)

		const aiProcessingSimulation = setTimeout(() => {
			const preferences = userPreferences[user.id] || { genres: [], cast: [] }

			const likedItemDetails = allItems.filter((item) =>
				likedItems.includes(item.id)
			)

			const likedGenres = new Set(
				likedItemDetails.flatMap((item) => item.genres || [])
			)
			const likedCast = new Set(
				likedItemDetails.flatMap((item) => item.cast || [])
			)
			const likedDirectors = new Set(
				likedItemDetails.flatMap((item) =>
					item.director ? [item.director] : []
				)
			)

			const scoredItems = allItems.map((item) => {
				if (likedItems.includes(item.id)) {
					return { ...item, score: -1 }
				}

				let score = 0

				item.genres?.forEach((genre) => {
					if (likedGenres.has(genre)) {
						score += 5
					}
				})
				item.cast?.forEach((actor) => {
					if (likedCast.has(actor)) {
						score += 3
					}
				})
				if (item.director && likedDirectors.has(item.director)) {
					score += 3
				}

				item.genres?.forEach((genre) => {
					if (preferences.genres.includes(genre)) {
						score += 2
					}
				})
				item.cast?.forEach((actor) => {
					if (preferences.cast.includes(actor)) {
						score += 1
					}
				})

				if (item.type === 'original') {
					score += 1
				}

				score += Math.random() * 0.5

				return { ...item, score }
			})

			const sortedRecommendations = scoredItems
				.filter((item) => item.score > 0)
				.sort((a, b) => b.score - a.score)

			setRecommendations(sortedRecommendations.slice(0, 10))
			setIsLoading(false)
		}, 1500)

		return () => clearTimeout(aiProcessingSimulation)
	}, [user, allItems, likedItems])

	return { recommendations, isLoading }
}
