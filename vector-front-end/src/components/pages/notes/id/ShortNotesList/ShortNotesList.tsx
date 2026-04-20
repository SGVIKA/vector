import { ShortNoteRow } from './ShortNoteRow'
import { useNotes } from '@/src/hooks/notes/useNotes'
import styles from './short-notes-list.module.css'

export function ShortNotesList() {
	const { items } = useNotes()
	return (
		<div className={`${styles.container}`}>
			{items?.map(item => (
				<ShortNoteRow
					key={item.id}
					item={item}
				/>
			))}
		</div>
	)
}
