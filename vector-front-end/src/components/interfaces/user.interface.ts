export interface IUser {
	Id: string
	email: string
	name?: string

	workInterval?: number
	breakInterval?: number
	intervalsCount?: number
}

export interface IProfileResponse {
	user: IUser
	statistics: {
		tasks: { label: string; value: string }[]
		notes: { label: string; value: string }[]
	}
}
