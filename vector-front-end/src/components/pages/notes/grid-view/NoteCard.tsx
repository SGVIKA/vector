import { Loader, Trash } from 'lucide-react'
import Link from 'next/link'

import { DeleteNoteButton } from '../DeleteNoteButton/DeleteNoteButton'
import { SliceText } from '../slice-text'

import styles from './notes-grid-view.module.css'
import { INote } from '@/src/components/interfaces/notes.interface'
import { useDeleteNote } from '@/src/hooks/notes/useDeleteNote'

export function NoteCard({ item, setItems }: INote) {
	const { deleteNote, isDeletePending } = useDeleteNote()

	const truncatedTitle = SliceText(30, item.title)

	const truncatedText = SliceText(60, item.text)

	return (
		<div className={`${styles.noteCard}`}>
			<Link
				className={`${styles.link}`}
				href={`/dashboard/notes/edit/${item.id}`}
			>
				<span className={`${styles.title}`}>{truncatedTitle}</span>
				<span className={`${styles.text}`}>{truncatedText}</span>
			</Link>
			<DeleteNoteButton itemId={item.id} sizeIcon={17}/>
		</div>
	)
}
