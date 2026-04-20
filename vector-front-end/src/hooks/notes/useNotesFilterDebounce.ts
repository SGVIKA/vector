import debounce from 'lodash.debounce'
import { useCallback, useEffect, useState } from 'react'

import { useNotesQueryStore } from './useNotesQueryStore'
import { useNotesWithFilter } from './useNotesWithFilter'
import { INotesFilterDebounce } from '@/src/components/interfaces/notes.interface'
import { TypeQuery } from '@/src/types/query.types'

export function useNotesFilterDebounce({ watch }: INotesFilterDebounce) {
	const query = useNotesQueryStore()
	const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>(
		query.search
	)

	const debouncedNoteSearch = useCallback(
		debounce((formData: TypeQuery) => {
			setDebouncedSearch(formData.search)
		}, 1000),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			debouncedNoteSearch(formData)
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedNoteSearch])

	const debouncedQuery: TypeQuery = {
		...query,
		search: debouncedSearch
	}

	const { data } = useNotesWithFilter(debouncedQuery)

	return { data }
}
