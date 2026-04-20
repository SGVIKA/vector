import { Dispatch, SetStateAction } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { EnumTaskPriority } from '../enums/tasks.enum'

import { IBase } from './IBase.interface'
import { TypeTaskFormState } from '@/src/types/task.types'

export interface ITaskResponse extends IBase {
	text: string
	priority?: EnumTaskPriority
	isCompleted: boolean
}

export interface IKanbanAddCardInput {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export interface IKanbanCard {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export interface IKanbanColumn {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export interface IListAddRowInput {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export interface IListRow {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export interface IListRowParent {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export interface IUseTaskDebounce {
	watch: UseFormWatch<TypeTaskFormState>
	itemId: string
}
