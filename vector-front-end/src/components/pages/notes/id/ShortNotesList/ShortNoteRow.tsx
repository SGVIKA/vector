import Link from 'next/link'

import styles from './short-notes-list.module.css'
import { INoteResponse } from '@/src/components/interfaces/notes.interface'

export function ShortNoteRow({ item }: { item: INoteResponse }) {
	return (
		<div className={`${styles.noteRow}`}>
			<Link
				className={`${styles.link}`}
				href={`/dashboard/notes/edit/${item.id}`}
			>
				<span className={`${styles.title}`}>{item.title}</span>
			</Link>
		</div>
	)
}
