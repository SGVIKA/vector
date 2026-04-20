import { UseFormSetValue } from 'react-hook-form'

import { INoteResponse } from '@/src/components/interfaces/notes.interface'
import { TypeNoteFormState } from '@/src/types/note.types'

export interface ITextEditor {
	item: INoteResponse
	setValue: UseFormSetValue<Partial<TypeNoteFormState>>
}
