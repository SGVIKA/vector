import type { PropsWithChildren } from 'react'

import { IBadge } from '../interfaces/ui.interface'

import styles from './ui.module.css'

export function Badge({
	children,
	className = '',
	style,
	variant = 'none'
}: PropsWithChildren<IBadge>) {
	return (
		<span
			className={`${styles.badge} ${styles[variant]} ${className}`}
			style={style}
		>
			{children}
		</span>
	)
}
