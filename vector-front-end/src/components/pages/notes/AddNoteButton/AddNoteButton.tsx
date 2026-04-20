import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import styles from './add-note-button.module.css'

import { DASHBOARD_PAGES } from '@/src/config/pages-url.config'
import { useCreateNote } from '@/src/hooks/notes/useCreateNote'

export function AddNoteButton({}) {
	const { push } = useRouter()
	const { createNote, isCreatePending } = useCreateNote()

	const handleCreateNote = async () => {
		try {
			const newNote = await createNote({
				title: 'Без названия',
				text: ''
			})
			push(`${DASHBOARD_PAGES.NOTES}/edit/${newNote.data.id}`)
		} catch {
			toast.error('Не удалось создать заметку')
		}
	}
	return (
		<div>
			<button className={`button ${styles.addNoteButton}`}
				onClick={handleCreateNote}
				disabled={isCreatePending}
			>
				Создать +
			</button>
		</div>
	)
}
