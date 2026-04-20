import { PropsWithChildren } from 'react'

import styles from './dashboard.module.css'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<div className={styles.container}>
			<Sidebar />

			<main className={styles.mainContent}>
				<Header />
				{children}
			</main>
		</div>
	)
}
