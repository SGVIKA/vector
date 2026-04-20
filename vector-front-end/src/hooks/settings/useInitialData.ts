import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { useProfile } from '@/src/hooks/useProfile'
import { TypeUserForm } from '@/src/types/auth.types'

export function useInitialData(reset: UseFormReset<TypeUserForm>) {
	const { data, isSuccess } = useProfile()

	useEffect(() => {
		if (isSuccess && data) {
			reset({
				email: data.user.email,
				name: data.user.name,
				breakInterval: data.user.breakInterval,
				intervalsCount: data.user.intervalsCount,
				workInterval: data.user.workInterval
			})
		}
	}, [isSuccess])
}
