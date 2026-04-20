import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

import styles from './start-footer.module.css'
import { SITE_NAME } from '@/src/constants/seo.constants'

export function StartFooter() {
	return (
		<footer className={styles.footerContainer}>
			<Link
				className={styles.logo}
				href='/'
			>
				<TrendingUp size={50} />
				<span className={styles.logoName}>{SITE_NAME}</span>
			</Link>
		</footer>
	)
}
