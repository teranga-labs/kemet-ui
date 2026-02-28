import { Route } from 'react-router-dom'

import AdminDashboard from '../features/admin/pages/AdminDashboard.tsx'
import CreatorDashboard from '../features/creator/CreatorDashboard.tsx'

import { RoleRoute } from './ProtectedRoutes.tsx'

const ManagementRoutes = [
	<Route
		key='admin'
		path='/admin'
		element={
			<RoleRoute allowedRoles={['admin']}>
				<AdminDashboard />
			</RoleRoute>
		}
	/>,
	<Route
		key='creator'
		path='/creator'
		element={
			<RoleRoute allowedRoles={['creator']}>
				<CreatorDashboard />
			</RoleRoute>
		}
	/>
]

export default ManagementRoutes
