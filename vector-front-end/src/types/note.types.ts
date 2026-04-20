import { INoteResponse } from '../components/interfaces/notes.interface'

export type TypeNoteFormState = Partial<Omit<INoteResponse, 'id' | 'updateAt'>>
