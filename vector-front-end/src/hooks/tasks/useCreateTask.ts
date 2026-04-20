import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskService } from '@/src/services/task.service'
import { TypeTaskFormState } from '@/src/types/task.types'

export function useCreateTask() {
	const queryClient = useQueryClient()

	const { mutate: createTask } = useMutation({
		mutationKey: ['create task'],
		mutationFn: (data: TypeTaskFormState) => taskService.createTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
		}
	})
	return { createTask }
}
