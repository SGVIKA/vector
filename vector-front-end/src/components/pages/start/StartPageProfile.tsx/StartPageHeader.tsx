import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

import { LogoutButton } from '../../dashboard-layout/header/LogoutButton'

import styles from './start-page-profile.module.css'
import { SITE_NAME } from '@/src/constants/seo.constants'
import { useProfile } from '@/src/hooks/useProfile'

export default function StartPageHeader() {
	const { data, isLoading } = useProfile()

	return (
		<div>
			<div className={styles.header}>
				<Link
					className={styles.logo}
					href='/'
				>
					<TrendingUp size={50} />
					<span className={styles.logoName}>{SITE_NAME}</span>
				</Link>
				{data?.user ? (
					<Link
						href='/dashboard'
						className={styles.profile}
					>
						<div className={styles.profileData}>
							<p className={styles.username}>{data?.user.name}</p>
							<p className={styles.email}>{data?.user.email}</p>
						</div>

						<div className={styles.avatar}>
							{data?.user.name?.charAt(0) || 'A'}
						</div>
						<LogoutButton />
					</Link>
				) : null}
			</div>
		</div>
	)
}
