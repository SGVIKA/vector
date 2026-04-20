import { useMutation, useQueryClient } from '@tanstack/react-query'

import { noteService } from '@/src/services/notes.service'

export function useDeleteNote() {
	const queryClient = useQueryClient()

	const { mutate: deleteNote, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete note'],
		mutationFn: (id: string) => noteService.deleteNote(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['notes']
			})
		}
	})
	return { deleteNote, isDeletePending }
}
