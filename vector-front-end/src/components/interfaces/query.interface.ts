import { INoteResponse } from './notes.interface'

export interface IQuery {
	page: number
	limit: number
	search?: string
}

export interface IQueryResponse {
	data: INoteResponse[]
	query: {
		total: number
		offset: number
		limit: number
	}
}
