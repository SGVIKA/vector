import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ITimeBlockResponse } from '@/src/components/interfaces/time-blocking.interface'
import { timeBlockService } from '@/src/services/time-block.service'

export function useTimeBlocks() {
	const { data, isLoading } = useQuery({
		queryKey: ['time-block'],
		queryFn: () => timeBlockService.getTimeBlocks()
	})

	const [items, setItems] = useState<ITimeBlockResponse[] | undefined>(
		data?.data
	)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])
	return { items, setItems, isLoading }
}
