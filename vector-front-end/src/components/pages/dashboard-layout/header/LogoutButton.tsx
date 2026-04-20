'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import styles from '../dashboard.module.css'

import { authService } from '@/src/services/auth.service'

export function LogoutButton() {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})
	return (
		<div>
			<button
			type='submit'
				className={styles.logoutButton}
				onClick={() => mutate()}
			>
				<LogOut size={25} />
			</button>
		</div>
	)
}
