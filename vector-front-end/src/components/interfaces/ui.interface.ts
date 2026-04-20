import { LucideIcon } from 'lucide-react'
import { CSSProperties, ComponentType } from 'react'

import { INotesView, INotesWithFilter } from '../interfaces/notes.interface'

import { TypeQuery } from '@/src/types/query.types'

export interface IBadge {
	className?: string
	variant?: string
	style?: CSSProperties
}

export interface IHeading {
	title: string
	className?: string
}

export interface IOption {
	label: string
	value: string
}

export interface ISingleSelect {
	data: IOption[]
	onChange: (value: string) => void
	value: string
	isColorSelect?: boolean
}

export interface IDatePicker {
	onChange: (value: string) => void
	value: string
	position?: 'left' | 'right'
}

export interface InputFieldProps {
	id: string
	label: string
	extra?: string
	placeholder: string
	variant?: string
	state?: 'error' | 'success'
	disabled?: boolean
	type?: string
	isNumber?: boolean
}

export interface IMenuItem {
	link: string
	name: string
	icon: LucideIcon
}

//SwitcherView

export interface IViewTasksOptions {
	type: string
	label: string
	icon: LucideIcon
	view: ComponentType
}

export interface IViewOptions<T> {
	type: string
	label: string
	icon: LucideIcon
	view: ComponentType<{ data: T }>
}

export interface ISwitcherView<T> {
	options: IViewOptions<T>[]
	value: string
	onChange: (value: string) => void
}
