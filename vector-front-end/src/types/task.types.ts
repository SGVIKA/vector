import { ITaskResponse } from '../components/interfaces/tasks.interface'

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updateAt'>>
