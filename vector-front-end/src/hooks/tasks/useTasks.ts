import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ITaskResponse } from '@/src/components/interfaces/tasks.interface'
import { taskService } from '@/src/services/task.service'

export function useTasks() {
	const { data } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTasks()
	})

	const [items, setItems] = useState<ITaskResponse[] | undefined>(data)

	useEffect(() => {
		setItems(data)
	}, [data])

	return { items, setItems }
}
