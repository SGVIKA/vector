import { Check } from 'lucide-react'

import styles from '../ui.module.css'

const Checkbox = (props: { id?: string; extra?: string; [x: string]: any }) => {
	const { extra, id, checked, disabled, ...rest } = props
	return (
		<div className={styles.checkboxContainer}>
			<input
				id={id}
				type='checkbox'
				className={`${styles.checkbox} ${extra}`}
				name='weekly'
				checked={checked}
				disabled={disabled}
				{...rest}
			/>
			{checked && !disabled && (
				<Check
					className={styles.icon}
					size={14}
					strokeWidth={3}
				/>
			)}
		</div>
	)
}

export default Checkbox
