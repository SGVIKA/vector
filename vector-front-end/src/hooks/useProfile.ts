import { useQuery } from '@tanstack/react-query'

import { userservice } from '../services/user.service'

export function useProfile() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userservice.getProfile()
	})
	return { data, isLoading, isSuccess }
}
