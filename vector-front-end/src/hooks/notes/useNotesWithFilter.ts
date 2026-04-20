import { useQuery } from '@tanstack/react-query'

import { noteService } from '@/src/services/notes.service'
import { TypeQuery } from '@/src/types/query.types'

export function useNotesWithFilter(query: TypeQuery) {
	const { data } = useQuery({
		queryKey: ['notes', query],
		queryFn: () => noteService.getWithFilter(query)
	})

	return { data }
}
