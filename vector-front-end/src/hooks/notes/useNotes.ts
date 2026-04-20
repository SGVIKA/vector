import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { INoteResponse } from '@/src/components/interfaces/notes.interface'
import { noteService } from '@/src/services/notes.service'

export function useNotes() {
	const { data } = useQuery({
		queryKey: ['notes'],
		queryFn: () => noteService.getNotes()
	})

	const [items, setItems] = useState<INoteResponse[] | undefined>(data)

	useEffect(() => {
		setItems(data)
	}, [data])

	return { items, setItems }
}
