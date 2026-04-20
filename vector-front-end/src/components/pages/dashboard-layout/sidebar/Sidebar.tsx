import { BrainCircuit, TrendingUp } from 'lucide-react'
import Link from 'next/link'

import { MENU } from '../../../data/menu.data'
import styles from '../dashboard.module.css'

import { MenuItem } from './MenuItem'
import { SITE_NAME } from '@/src/constants/seo.constants'

export default function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<div>
				<Link
					className={styles.menuHeading}
					href='/'
				>
					<TrendingUp />
					<span className={styles.sidebarLink}>{SITE_NAME}</span>
				</Link>

				<div>
					{MENU.map(item => (
						<MenuItem
							item={item}
							key={item.link}
						/>
					))}
				</div>
			</div>
			<footer></footer>
		</aside>
	)
}
