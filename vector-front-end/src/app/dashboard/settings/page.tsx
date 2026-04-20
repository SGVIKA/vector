import { Metadata } from 'next'

import { Settings } from '@/src/components/pages/settings/Settings'
import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Настройки',
	...NO_INDEX_PAGE
}

export default function SettingsPage() {
	return (
		<div>
			<Settings />
		</div>
	)
}
