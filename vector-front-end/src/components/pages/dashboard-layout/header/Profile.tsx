'use client'

import styles from '../dashboard.module.css'

import { LogoutButton } from './LogoutButton'
import Loader from '@/src/components/ui/loaders/Loader/Loader'
import { useProfile } from '@/src/hooks/useProfile'

export default function Profile() {
	const { data, isLoading } = useProfile()

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.header}>
					<LogoutButton />
					<div className={styles.profile}>
						<div className={styles.profileData}>
							<p className={styles.username}>{data?.user.name}</p>
							<p className={styles.email}>{data?.user.email}</p>
						</div>

						<div className={styles.avatar}>
							{data?.user.name?.charAt(0) || 'A'}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
