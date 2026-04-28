import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import { FILTERS } from '../../data/columns.data'
import { ITaskResponse } from '../../interfaces/tasks.interface'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

// Функция для сортировки задач по дате (от старых к новым)
const sortByDate = (tasks: ITaskResponse[]) => {
  return [...tasks].sort((a, b) => 
    dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
  )
}

export const filterTasks = (
  tasks: ITaskResponse[] | undefined,
  value: string
) => {
  if (!tasks) return []
  
  let filteredTasks: ITaskResponse[] = []
  
  switch (value) {
    case 'today':
      filteredTasks = tasks.filter(
        item =>
          dayjs(item.createdAt).isSame(FILTERS.today, 'day') &&
          !item.isCompleted
      )
      break
      
    case 'tomorrow':
      filteredTasks = tasks.filter(
        item =>
          dayjs(item.createdAt).isSame(FILTERS.tomorrow, 'day') &&
          !item.isCompleted
      )
      break
      
    case 'on-this-week':
      filteredTasks = tasks.filter(
        item =>
          !dayjs(item.createdAt).isSame(FILTERS.today, 'day') &&
          !dayjs(item.createdAt).isSame(FILTERS.tomorrow, 'day') &&
          dayjs(item.createdAt).isSameOrBefore(FILTERS['on-this-week']) &&
          !item.isCompleted
      )
      break
      
    case 'on-next-week':
      filteredTasks = tasks.filter(
        item =>
          dayjs(item.createdAt).isAfter(FILTERS['on-this-week']) &&
          dayjs(item.createdAt).isSameOrBefore(FILTERS['on-next-week']) &&
          !item.isCompleted
      )
      break
      
    case 'later':
      filteredTasks = tasks.filter(
        item =>
          (dayjs(item.createdAt).isAfter(FILTERS['on-next-week']) ||
            !item.createdAt) &&
          !item.isCompleted
      )
      break
      
    case 'completed':
      filteredTasks = tasks.filter(item => item.isCompleted)
      break
      
    default:
      filteredTasks = []
  }
  
  // 🔥 Применяем сортировку ко всем группам, кроме 'completed'
  if (value !== 'completed') {
    return sortByDate(filteredTasks)
  }
  
  return filteredTasks
}