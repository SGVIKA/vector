import { useMutation, useQueryClient } from '@tanstack/react-query'

import { timeBlockService } from '@/src/services/time-block.service'
import { TypeTimeBlockFormState } from '@/src/types/time-block.types'

export function useUpdateTimeBlock(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateTimeBlock } = useMutation({
		mutationKey: ['update time-block', key],
		mutationFn: ({ id, data }: { id: string; data: TypeTimeBlockFormState }) =>
			timeBlockService.updateTimeBlock(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['time-block']
			})
		}
	})

	return { updateTimeBlock }
}
