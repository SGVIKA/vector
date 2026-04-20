import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'

import { useCreateNote } from './useCreateNote'
import { useUpdateNote } from './useUpdateNote'
import { IUseNoteDebounce } from '@/src/components/interfaces/notes.interface'
import { TypeNoteFormState } from '@/src/types/note.types'

export function useNoteDebounce({ watch, itemId }: IUseNoteDebounce) {
	const { createNote } = useCreateNote()
	const { updateNote } = useUpdateNote()

	const debouncedCreateNote = useCallback(
		debounce((formData: TypeNoteFormState) => {
			createNote(formData)
		}, 1000),
		[]
	)

	const debouncedUpdateNote = useCallback(
		debounce((formData: TypeNoteFormState) => {
			updateNote({ id: itemId, data: formData })
		}, 1000),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debouncedUpdateNote({
					...formData
				})
			} else {
				debouncedCreateNote(formData)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdateNote, debouncedCreateNote])
}
