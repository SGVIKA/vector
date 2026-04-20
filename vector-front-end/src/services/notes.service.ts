import { axiosWithAuth } from '../api/interceptors'
import {
	INoteResponse,
	INotesWithFilter
} from '../components/interfaces/notes.interface'
import { TypeNoteFormState } from '../types/note.types'
import { TypeQuery } from '../types/query.types'

class NoteService {
	private BASE_URL = '/user/notes'

	async getNotes() {
		const response = await axiosWithAuth.get<INoteResponse[]>(this.BASE_URL)

		return response.data
	}

	async getNoteById(id: string) {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/${id}`)
		return response.data
	}

	async getWithFilter(query: TypeQuery): Promise<INotesWithFilter> {
		const response = await axiosWithAuth.get<INotesWithFilter>(
			`${this.BASE_URL}/filter`,
			{
				params: query
			}
		)
		return response.data
	}

	async createNote(data: TypeNoteFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updateNote(id: string, data: TypeNoteFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteNote(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const noteService = new NoteService()
