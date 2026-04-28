import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ITaskResponse } from '@/src/components/interfaces/tasks.interface'
import { taskService } from '@/src/services/task.service'

export function useTasks() {
	// Запрос на получение задач с сервера с использованием React Query
	
	
	const { data } = useQuery({
		queryKey: ['tasks'],     // ключ для кэширования данных
		queryFn: () => taskService.getTasks()  // асинхронная функция, которая вызывает API для получения задач
	})

	// Локальное состояние для хранения списка задач
	// Инициализируется данными из запроса
	const [items, setItems] = useState<ITaskResponse[] | undefined>(data)

	// Эффект, который синхронизирует локальное состояние с данными из запроса
	// Срабатывает каждый раз, когда меняются данные с сервера (data)
	useEffect(() => {
		setItems(data) // Обновляем локальное состояние новыми данными
	}, [data]) // Зависимость от data - эффект выполняется только при изменении data

	// Возвращаем текущий список задач и функцию для его обновления
	return { items, setItems }
}