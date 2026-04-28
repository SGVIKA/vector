import { axiosWithAuth } from '../api/interceptors'
import { ITaskResponse } from '../components/interfaces/tasks.interface'
import { PRIORITY_ORDER } from '../constants/priority-order.constants'
import { TypeTaskFormState } from '../types/task.types'

class TaskService {
	private BASE_URL = '/user/tasks'

	async getTasks(): Promise<ITaskResponse[]> {
		const { data } = await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL)
		const sorted = [...data].sort((a, b) => {
			const aP =
				a.priority && PRIORITY_ORDER[a.priority] !== undefined
					? PRIORITY_ORDER[a.priority]
					: 0
			const bP =
				b.priority && PRIORITY_ORDER[b.priority] !== undefined
					? PRIORITY_ORDER[b.priority]
					: 0
			if (bP !== aP) return bP - aP
			return 0
		})

		return sorted
	}

	async createTask(data: TypeTaskFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updateTask(id: string, data: TypeTaskFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteTask(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const taskService = new TaskService()
