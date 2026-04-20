'use client'

import { NoteCard } from './NoteCard'
import styles from './notes-grid-view.module.css'
import { INotesWithFilter } from '@/src/components/interfaces/notes.interface'

export function NotesGridView({ data }: { data: INotesWithFilter }) {
	return (
		<div className={` ${styles.gridView}`}>
			{data?.data?.map(item => (
				<NoteCard
					key={item.id}
					item={item}
				/>
			))}
		</div>
	)
}
