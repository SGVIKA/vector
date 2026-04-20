'use client'

import { About } from './About/About'
import { StartFooter } from './About/StartFooter/StartFooter'
import StartPageHeader from './StartPageProfile.tsx/StartPageHeader'
import styles from './start-page.module.css'

export function StartPage() {
	return (
		<div className={styles.container}>
			<StartPageHeader />
			<About />
			<StartFooter />
		</div>
	)
}
