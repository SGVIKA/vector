'use client'

import { NoteRow } from './NoteRow'
import { INotesWithFilter } from '@/src/components/interfaces/notes.interface'

export function NotesListView({ data }: { data: INotesWithFilter }) {
	return (
		<div>
			{data?.data?.map(item => (
				<NoteRow
					key={item.id}
					item={item}
				/>
			))}
		</div>
	)
}
