import { ITimeBlockResponse } from '../components/interfaces/time-blocking.interface'

export type TypeTimeBlockFormState = Partial<
	Omit<ITimeBlockResponse, 'createAt' | 'updateAt'>
>
