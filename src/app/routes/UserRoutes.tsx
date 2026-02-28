import { Route } from 'react-router-dom'

import BecomeCreator from '../features/creator/BecomeCreator.tsx'
import AccountSettingsPage from '../features/user/AccountSettingsPage.tsx'
import AddProfilePage from '../features/user/AddProfilePage.tsx'
import EditProfilePage from '../features/user/EditProfilePage.tsx'
import ProfilePage from '../features/user/ProfilePage.tsx'

import { ProtectedRoute } from './ProtectedRoutes.tsx'

const UserRoutes = [
	<Route
		key='profiles'
		path='/profiles'
		element={
			<ProtectedRoute>
				<ProfilePage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='add-profile'
		path='/profiles/add'
		element={
			<ProtectedRoute>
				<AddProfilePage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='edit-profile'
		path='/profiles/edit/:id'
		element={
			<ProtectedRoute>
				<EditProfilePage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='account-settings'
		path='/account/settings'
		element={
			<ProtectedRoute>
				<AccountSettingsPage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='become-creator'
		path='/become-creator'
		element={
			<ProtectedRoute>
				<BecomeCreator />
			</ProtectedRoute>
		}
	/>
]

export default UserRoutes
