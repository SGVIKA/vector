import dayjs from "dayjs"
import { ITaskResponse } from "../../interfaces/tasks.interface"

// В файле filter-tasks.ts
export const filterTasks = (
  tasks: ITaskResponse[] | undefined,
  value: string
) => {
  if (!tasks) return []
  
  let filteredTasks: ITaskResponse[] = []
  
  // ... твой код фильтрации ...
  
  // 🔥 Добавляем сортировку перед возвратом
  if (value !== 'completed') {
    return filteredTasks.sort((a, b) => 
      dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
    )
  }
  
  return filteredTasks
}