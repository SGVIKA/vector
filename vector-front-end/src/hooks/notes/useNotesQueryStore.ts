import debounce from 'lodash.debounce'
import { create } from 'zustand'

import { IQuery } from '@/src/components/interfaces/query.interface'

export interface IQueryStore {
	totalPages: number
	setTotalPages: (totalPages: number) => void

	setPage: (page: number) => void
	setLimit: (limit: number) => void
	setSearch: (search: string) => void
}

export const useNotesQueryStore = create<IQuery & IQueryStore>(set => ({
	page: 1,
	limit: 10,
	search: '',
	setPage: (page: number) => set({ page }),
	setLimit: (limit: number) => set({ limit }),
	setSearch: debounce((search: string) => {
		set({ search, page: 1 })
	}, 1000),

	totalPages: 0,
	setTotalPages: (totalPages: number) => set({ totalPages })
}))
