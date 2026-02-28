import { Route } from 'react-router-dom'

import ConfirmPaymentPage from '../features/payment/ConfirmPaymentPage.tsx'
import PaymentDetailsPage from '../features/payment/PaymentDetailsPage.tsx'
import PaymentFlowPage from '../features/payment/PaymentFlowPage.tsx'
import PaymentOptionsPage from '../features/payment/PaymentOptionPage.tsx'
import PaymentReceiptPage from '../features/payment/PaymentReceiptPage.tsx'
import SubscriptionPage from '../features/payment/SubscriptionPage.tsx'

import { ProtectedRoute } from './ProtectedRoutes.tsx'

const PaymentRoutes = [
	<Route
		key='payment-flow'
		path='/payment-flow'
		element={
			<ProtectedRoute>
				<PaymentFlowPage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='subscribe'
		path='/subscribe'
		element={
			<ProtectedRoute>
				<SubscriptionPage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='payment-options'
		path='/payment-options'
		element={
			<ProtectedRoute>
				<PaymentOptionsPage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='payment-details'
		path='/payment-details'
		element={
			<ProtectedRoute>
				<PaymentDetailsPage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='confirm-payment'
		path='/confirm-payment'
		element={
			<ProtectedRoute>
				<ConfirmPaymentPage />
			</ProtectedRoute>
		}
	/>,
	<Route
		key='payment-receipt'
		path='/payment-receipt'
		element={
			<ProtectedRoute>
				<PaymentReceiptPage />
			</ProtectedRoute>
		}
	/>
]

export default PaymentRoutes
