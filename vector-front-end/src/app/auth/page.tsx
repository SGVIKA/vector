import { Metadata } from 'next'



import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'
import { Auth } from '@/src/components/pages/auth/Auth'

export const metadata: Metadata = {
	title: 'Авторизация',
	...NO_INDEX_PAGE
}

export default function AuthPage() {
	return <Auth />
}
