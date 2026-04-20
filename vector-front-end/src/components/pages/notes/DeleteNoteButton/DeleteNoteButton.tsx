import { Loader, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { IDeleteNoteButton } from './delete-note-button.interface'
import styles from './delete-note-button.module.css'
import { DASHBOARD_PAGES } from '@/src/config/pages-url.config'
import { useDeleteNote } from '@/src/hooks/notes/useDeleteNote'

export function DeleteNoteButton({ itemId, sizeIcon }: IDeleteNoteButton) {
	const { deleteNote, isDeletePending } = useDeleteNote()
	const { push } = useRouter()
	const handleDelete = () => {
		if (itemId) {
			try {
				deleteNote(itemId)
				push(DASHBOARD_PAGES.NOTES)
			} catch (error) {
				toast.error('Не удалось удалить заметку')
			}
		} else {
			toast.error('Не удалось удалить заметку')
		}
	}
	return (
		<div>
			<button
				className={`${styles.deleteBtn}`}
				onClick={handleDelete}
				disabled={isDeletePending}
			>
				{isDeletePending ? (
					<Loader size={sizeIcon} />
				) : (
					<Trash size={sizeIcon} />
				)}
			</button>
		</div>
	)
}
