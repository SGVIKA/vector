import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskService } from '@/src/services/task.service'
import { TypeTaskFormState } from '@/src/types/task.types'

export function useCreateTask() {
	// Получаем экземпляр QueryClient для управления кэшем React Query
	const queryClient = useQueryClient()

	// Настройка мутации для создания задачи
	const { mutate: createTask } = useMutation({
		// Уникальный ключ для идентификации мутации
		mutationKey: ['create task'],
		
		// Асинхронная функция, которая отправляет данные на сервер для создания задачи
		mutationFn: (data: TypeTaskFormState) => taskService.createTask(data),
		
		// Колбэк, вызываемый при успешном выполнении мутации
		onSuccess() {
			// Отмечаем как устаревшие запросы с ключом ['tasks']
			// Это заставит React Query автоматически перезапросить актуальный список задач
			// после успешного создания новой задачи
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
		}
	})
	
	// Возвращаем функцию createTask, которую можно вызвать для создания задачи
	return { createTask }
}