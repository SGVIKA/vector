import { useMutation, useQueryClient } from '@tanstack/react-query'

import { noteService } from '@/src/services/notes.service'
import { TypeNoteFormState } from '@/src/types/note.types'

export function useUpdateNote(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateNote } = useMutation({
		mutationKey: ['update note', key],
		mutationFn: ({ id, data }: { id: string; data: TypeNoteFormState }) =>
			noteService.updateNote(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['notes']
			})
		}
	})

	return { updateNote }
}
