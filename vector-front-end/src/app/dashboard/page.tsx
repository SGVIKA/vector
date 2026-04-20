import { Metadata } from 'next'

import { Statistics } from '../../components/pages/statistics/Statistics'

import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Главная',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<div>
			<Statistics />
		</div>
	)
}
