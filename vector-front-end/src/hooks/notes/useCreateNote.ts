import { useMutation, useQueryClient } from '@tanstack/react-query'

import { noteService } from '@/src/services/notes.service'
import { TypeNoteFormState } from '@/src/types/note.types'

export function useCreateNote() {
	const queryClient = useQueryClient()

	const { mutateAsync: createNote, isPending } = useMutation({
		mutationKey: ['create note'],
		mutationFn: (data: TypeNoteFormState) => noteService.createNote(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['notes']
			})
		}
	})
	return { createNote, isCreatePending: isPending }
}
