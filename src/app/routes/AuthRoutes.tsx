import { Route } from 'react-router-dom'

import SigninPage from '../features/auth/SigninPage.tsx'
import SignupPage from '../features/auth/SignupPage.tsx'

const AuthRoutes = [
	<Route key='signin' path='/signin' element={<SigninPage />} />,
	<Route key='signup' path='/signup' element={<SignupPage />} />
]

export default AuthRoutes
