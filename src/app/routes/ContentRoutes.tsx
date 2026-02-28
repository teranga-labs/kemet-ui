import { Route } from 'react-router-dom'

import CategoryListPage from '../features/browse/pages/CategoryListPage.tsx'
import DetailsPage from '../features/browse/pages/DetailPage.tsx'
import DocumentaryCatalogPage from '../features/browse/pages/DocumentaryCatalogPage.tsx'
import LiveCatalogPage from '../features/browse/pages/LiveCatalogPage.tsx'
import MoviesCatalogPage from '../features/browse/pages/MoviesCatalogPage.tsx'
import SavedPage from '../features/browse/pages/SavedPage.tsx'
import ShowsCatalogPage from '../features/browse/pages/ShowsCatalogPage.tsx'
import WatchPage from '../features/watch/WatchPage.tsx'
import WatchPageWithVimeo from '../features/watch/WatchPageWithVimeo.tsx'

import { ProtectedRoute, SubscriptionRoute } from './ProtectedRoutes.tsx'
import DiscoveryPage from "../features/discovery/DicoveryPage.tsx";
import EbookPage from "../features/ebook/EbookPage.tsx";
import GreenLightPage from "../features/greenlight/GreenLightPage.tsx";


const ContentRoutes = [
	<Route
		key='movies'
		path='/movies'
		element={
			<ProtectedRoute>
				<MoviesCatalogPage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='shows'
		path='/shows'
		element={
			<ProtectedRoute>
				<ShowsCatalogPage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='live'
		path='/live'
		element={
			<ProtectedRoute>
				<LiveCatalogPage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='documentaries'
		path='/documentaries'
		element={
			<ProtectedRoute>
				<DocumentaryCatalogPage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='details'
		path='/details/:id'
		element={
			<ProtectedRoute>
				<DetailsPage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='watch'
		path='/watch/:id'
		element={
			<SubscriptionRoute>
				<WatchPage />
			</SubscriptionRoute>
		}
	/>,
	<Route
		key='saved'
		path='/saved'
		element={
			<ProtectedRoute>
				<SavedPage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='vimeo'
		path='/vimeo/:id'
		element={
			<SubscriptionRoute>
				<WatchPageWithVimeo />
			</SubscriptionRoute>
		}
	/>,
	<Route path='/category/:categoryName' element={<CategoryListPage />} />,
	<Route
		key='discover'
		path='/discover'
		element={
			<ProtectedRoute>
				<DiscoveryPage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='library'
		path='/library'
		element={
			<ProtectedRoute>
				<EbookPage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='green-light'
		path='/green-light'
		element={
			<ProtectedRoute>
				<GreenLightPage />
			</ProtectedRoute>
		}
	/>
]

export default ContentRoutes
