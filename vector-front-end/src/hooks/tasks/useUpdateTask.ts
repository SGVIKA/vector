import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskService } from '@/src/services/task.service'
import { TypeTaskFormState } from '@/src/types/task.types'

export function useUpdateTask(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateTask } = useMutation({
		mutationKey: ['update task', key],
		mutationFn: ({ id, data }: { id: string; data: TypeTaskFormState }) =>
			taskService.updateTask(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
		}
	})

	return { updateTask }
}
