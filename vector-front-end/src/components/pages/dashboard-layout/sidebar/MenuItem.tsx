import Link from 'next/link'

import styles from '../dashboard.module.css'

import { IMenuItem } from '@/src/components/interfaces/ui.interface'

export function MenuItem({ item }: { item: IMenuItem }) {
	return (
		<div>
			<Link
				className={styles.menuItem}
				href={item.link}
			>
				<item.icon />
				<span>{item.name}</span>
			</Link>
		</div>
	)
}
