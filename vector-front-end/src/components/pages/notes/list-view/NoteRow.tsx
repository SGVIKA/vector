import Link from 'next/link'

import { DeleteNoteButton } from '../DeleteNoteButton/DeleteNoteButton'
import { SliceText } from '../slice-text'

import styles from './notes-list-view.module.css'
import { INote } from '@/src/components/interfaces/notes.interface'

export function NoteRow({ item}: INote) {

	const truncatedTitle = SliceText(90, item.title)

	const truncatedText = SliceText(230, item.text)

	return (
		<div className={`${styles.noteRow}`}>
			<div className={`${styles.actions}`}>
				<Link
					className={`${styles.link}`}
					href={`/dashboard/notes/edit/${item.id}`}
				>
					<span className={`${styles.title}`}>{truncatedTitle}</span>
					<span className={`${styles.text}`}> {truncatedText}</span>
				</Link>
				<DeleteNoteButton
					itemId={item.id}
					sizeIcon={17}
				/>
			</div>
		</div>
	)
}
