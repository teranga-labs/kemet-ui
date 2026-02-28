import { Route } from 'react-router-dom'

import WatchPartyCreatePage from '../features/watch-party/pages/WatchPartyCreatePage.tsx'
import WatchPartyJoinPage from '../features/watch-party/pages/WatchPartyJoinPage.tsx'
import WatchPartyMenuPage from '../features/watch-party/pages/WatchPartyMenuPage.tsx'
import WatchPartyRoomPage from '../features/watch-party/pages/WatchPartyRoomPage.tsx'

import { SubscriptionRoute } from './ProtectedRoutes.tsx'

const WatchPartyRoutes = [
	<Route
		key='watch-party-menu'
		path='/watch-party'
		element={
			<SubscriptionRoute>
				<WatchPartyMenuPage />
			</SubscriptionRoute>
		}
	/>,
	<Route
		key='watch-party-create'
		path='/watch-party/create'
		element={
			<SubscriptionRoute>
				<WatchPartyCreatePage />
			</SubscriptionRoute>
		}
	/>,
	<Route
		key='watch-party-join'
		path='/watch-party/join'
		element={
			<SubscriptionRoute>
				<WatchPartyJoinPage />
			</SubscriptionRoute>
		}
	/>,
	<Route
		key='watch-party-room'
		path='/watch-party/room/:roomId'
		element={
			<SubscriptionRoute>
				<WatchPartyRoomPage />
			</SubscriptionRoute>
		}
	/>
]

export default WatchPartyRoutes
