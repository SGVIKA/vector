import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'
import { NotesView } from '@/src/components/pages/notes/NotesView'
import styles from '../../../components/pages/notes/notes.module.css'

export const metadata: Metadata = {
	title: 'Заметки',
	...NO_INDEX_PAGE
}

export default function NotesPage() {
	return (
		<div className={styles.notesContainer}>
			<NotesView />
		</div>
	)
}
