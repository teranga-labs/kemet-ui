import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import { AuthProvider } from './app/providers/AuthProvider.tsx'
import { LikesProvider } from './app/providers/LikesProvider.tsx'
import { ProfileProvider } from './app/providers/ProfileProvider.tsx'
import { SavedContentProvider } from './app/providers/SavedContentProvider.tsx'
import { SearchProvider } from './app/providers/SearchProvider.tsx'
import { SubscriptionProvider } from './app/providers/SubscriptionProvider.tsx'
import { ThemeProvider } from './app/providers/ThemeProvider.tsx'
import { WatchHistoryProvider } from './app/providers/WatchHistoryProvider.tsx'
import { allItems } from './data/shows.ts'
import './index.css'
import './utils/i18n.ts'

const stripePromise = loadStripe(
	'pk_test_51S15lPJlTRkz6TMo7Myl3GEUND79Rv9pdfdPB55NNA2LKixdhYwTLa7v6FMVakVHoRRJsVzpEVpUynsQm8uG6QaC00nD2ZPwzY'
)

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<BrowserRouter>
				<Elements stripe={stripePromise}>
					<AuthProvider>
						<SubscriptionProvider>
							<ProfileProvider>
								<SavedContentProvider>
									<LikesProvider>
										<WatchHistoryProvider>
											<SearchProvider allItems={allItems}>
												<App />
											</SearchProvider>
										</WatchHistoryProvider>
									</LikesProvider>
								</SavedContentProvider>
							</ProfileProvider>
						</SubscriptionProvider>
					</AuthProvider>
				</Elements>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>
)
