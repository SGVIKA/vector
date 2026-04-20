import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'

import { useCreateTask } from './useCreateTask'
import { useUpdateTask } from './useUpdateTask'
import { IUseTaskDebounce } from '@/src/components/interfaces/tasks.interface'
import { TypeTaskFormState } from '@/src/types/task.types'

export function useTaskDebounce({ watch, itemId }: IUseTaskDebounce) {
	const { createTask } = useCreateTask()
	const { updateTask } = useUpdateTask()

	const debouncedCreateTask = useCallback(
		debounce((formData: TypeTaskFormState) => {
			createTask(formData)
		}, 1000),
		[]
	)

	const debouncedUpdateTask = useCallback(
		debounce((formData: TypeTaskFormState) => {
			updateTask({ id: itemId, data: formData })
		}, 1000),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debouncedUpdateTask({
					...formData,
					priority: formData.priority
				})
			} else {
				debouncedCreateTask(formData)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdateTask, debouncedCreateTask])
}
