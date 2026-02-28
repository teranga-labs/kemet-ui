import { Route } from 'react-router-dom'

import AboutUsPage from '../features/info/AboutUsPage.tsx'
import AccountInfoPage from '../features/info/AccountInfoPage.tsx'
import ContactUsPage from '../features/info/ContactUsPage.tsx'
import InfoCenterPage from '../features/info/InfoCenterPage.tsx'
import LegalNoticePage from '../features/info/LegalNoticePage.tsx'
import ManifestoPage from '../features/info/ManifestoPage.tsx'
import PartnerProgramPage from '../features/info/PartnerProgramPage.tsx'
import PrivacyPolicyPage from '../features/info/PrivacyPolicyPage.tsx'
import SupportChatPage from '../features/info/SupportChatPage.tsx'
import TermsOfUsePage from '../features/info/TermsOfUsePage.tsx'

const InfoRoutes = [
	<Route
		key='privacy'
		path='/privacy-policy'
		element={<PrivacyPolicyPage />}
	/>,
	<Route key='terms' path='/terms-of-use' element={<TermsOfUsePage />} />,
	<Route key='about' path='/about-us' element={<AboutUsPage />} />,
	<Route key='contact' path='/contact-us' element={<ContactUsPage />} />,
	<Route key='info' path='/info' element={<InfoCenterPage />} />,
	<Route key='legal' path='/legal-notice' element={<LegalNoticePage />} />,
	<Route key='manifesto' path='/manifesto' element={<ManifestoPage />} />,
	<Route key='support' path='/support-chat' element={<SupportChatPage />} />,
	<Route key='account' path='/account-info' element={<AccountInfoPage />} />,
	<Route key='legal' path='/legal-notice' element={<LegalNoticePage />} />,
	<Route
		key='partner'
		path='/partner-program'
		element={<PartnerProgramPage />}
	/>
]

export default InfoRoutes
