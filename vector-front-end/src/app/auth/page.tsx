import { Metadata } from 'next'

import { Auth } from '../../components/pages/auth/Auth'

import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Авторизация',
	...NO_INDEX_PAGE
}

export default function AuthPage() {
	return <Auth />
}
