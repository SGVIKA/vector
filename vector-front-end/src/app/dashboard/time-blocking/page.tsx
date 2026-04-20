import { Metadata } from 'next'

import { TimeBlocking } from '@/src/components/pages/time-blocking/TimeBlocking'
import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Тайм-блокинг',
	...NO_INDEX_PAGE
}

export default function TimeBlockingPage() {
	return (
		<div>
			<TimeBlocking />
		</div>
	)
}
