import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { userservice } from '@/src/services/user.service'
import { TypeUserForm } from '@/src/types/auth.types'

export function useUpdateSettings() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TypeUserForm) => userservice.update(data),
		onSuccess() {
			toast.success('Профиль успешно обновлен!')
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		},
		onError() {
			toast.error('Не удалось обновить профиль')
		}
	})
	return { mutate, isPending }
}
