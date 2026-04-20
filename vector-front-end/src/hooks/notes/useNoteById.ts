import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { INoteResponse } from '@/src/components/interfaces/notes.interface'
import { noteService } from '@/src/services/notes.service'

export function useNoteById(id: string) {
	const { data } = useQuery({
		queryKey: ['notes', id],
		queryFn: () => noteService.getNoteById(id)
	})

	const [item, setItem] = useState<INoteResponse>(data)

	useEffect(() => {
		setItem(data)
	}, [data])

	return { item, setItem }
}
