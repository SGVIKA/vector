import { useMutation, useQueryClient } from '@tanstack/react-query'

import { timeBlockService } from '@/src/services/time-block.service'
import { TypeTimeBlockFormState } from '@/src/types/time-block.types'

export function useCreateTimeBlock() {
	const queryClient = useQueryClient()

	const { mutate: createTimeBlock, isPending } = useMutation({
		mutationKey: ['create time-block'],
		mutationFn: (data: TypeTimeBlockFormState) =>
			timeBlockService.createTimeBlock(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['time-block']
			})
		}
	})

	return { createTimeBlock, isPending }
}
