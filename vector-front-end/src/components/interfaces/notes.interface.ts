import { Dispatch, SetStateAction } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { IBase } from './IBase.interface'
import { IQuery } from './query.interface'
import { TypeNoteFormState } from '@/src/types/note.types'
import { TypeQuery } from '@/src/types/query.types'

export interface INoteResponse extends IBase {
	title?: string
	text?: string
}

export interface INote {
	item: INoteResponse
	// setItems: Dispatch<SetStateAction<INoteResponse[] | undefined>>
}

export interface IUseNoteDebounce {
	watch: UseFormWatch<TypeNoteFormState>
	itemId: string
}

export interface INotesWithFilter {
	data: INoteResponse[]
	pagination: {
		total: number
		page: number
		limit: number
		hasMore: boolean
	}
}

export interface INotesFilterDebounce {
	watch: UseFormWatch<TypeQuery>
	query: IQuery
}

export interface INotesView {
	// setTotal: (total: number) => void
	// watch: UseFormWatch<Partial<TypeNoteFormState>>
}
