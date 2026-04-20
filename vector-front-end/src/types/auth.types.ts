import { IUser } from '../components/interfaces/user.interface'

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
