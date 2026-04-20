import { axiosWithAuth } from '../api/interceptors'
import { IProfileResponse } from '../components/interfaces/user.interface'
import { TypeUserForm } from '../types/auth.types'

class UserService {
	private BASE_URL = '/user/profile'

	async getProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL)
		return response.data
	}

	async update(data: TypeUserForm) {
		const response = await axiosWithAuth.put(this.BASE_URL, data)
		return response.data
	}
}

export const userservice = new UserService()
