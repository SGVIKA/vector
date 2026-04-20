'use client'
import { ISwitcherView } from '../interfaces/ui.interface'

import styles from './ui.module.css'

export function SwitcherView<T>({ options, value, onChange }: ISwitcherView<T>) {
	return (
		<div className={styles.switcherView}>
			{options.map(option => (
				<button
					key={option.type}
					className={`button ${styles.switcher} ${
						value === option.type ? 'active' : ''
					}`}
					onClick={() => onChange(option.type)}
					title={option.label}
				>
					<option.icon className={styles.switcherIcon} />
					<span>{option.label}</span>
				</button>
			))}
		</div>
	)
}
