import HomePage from '../features/browse/pages/HomePage.tsx'
import AuthRoutes from './AuthRoutes.tsx'
import ContentRoutes from './ContentRoutes.tsx'
import InfoRoutes from './InfoRoutes.tsx'
import ManagementRoutes from './ManagementRoutes.tsx'
import PaymentRoutes from './PaymentRoutes.tsx'
import UserRoutes from './UserRoutes.tsx'
import WatchPartyRoutes from './WatchPartyRoutes.tsx'
import { Navigate, Route, Routes } from 'react-router-dom'

function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			{AuthRoutes}
			{PaymentRoutes}
			{ContentRoutes}
			{UserRoutes}
			{WatchPartyRoutes}
			{ManagementRoutes}
			{InfoRoutes}
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	)
}

export default AppRoutes
