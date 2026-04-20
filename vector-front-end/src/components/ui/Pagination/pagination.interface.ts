import { CSSProperties } from 'react'

export interface IPagination {
	className?: string
	// value: number
	// onChange: (value: number) => void
	total: number
	hasMore?: boolean
}
