import { X } from 'lucide-react'

import { ISingleSelect } from '../interfaces/ui.interface'
import styles from './ui.module.css'

import { Badge } from './Badge'
import { useOutside } from '@/src/hooks/useOutside'

export function SingleSelect({
	data,
	onChange,
	value,
	isColorSelect
}: ISingleSelect) {
	const { isShow, setIsShow, ref } = useOutside(false)
	const getValue = () => data.find(item => item.value === value)

	return (
		<div ref={ref}>
			<button
				className={styles.badgeBtn}
				onClick={e => {
					e.preventDefault()
					setIsShow(!isShow)
				}}
			>
				{getValue() ? (
					<Badge
						style={isColorSelect ? { backgroundColor: value } : {}}
						variant={value}
					>
						{getValue()?.label}
					</Badge>
				) : (
					<Badge>none</Badge>
				)}
			</button>
			{value &&
				(isColorSelect ? (
					<button
						className={styles.clearBtn}
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							onChange('')
						}}
					>
						<X size={14} />
					</button>
				) : (
					<button
						className={styles.clearBtn}
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							onChange('none')
						}}
					>
						<X size={14} />
					</button>
				))}

			{isShow && (
				<div
					className={`${styles.select}
						${isColorSelect ? styles.colorSelect : styles.prioritySelect}
					`}
				>
					{data.map(item => (
						<button
							className={`${styles.badgeBtn} ${styles.selectBadgeBtn}`}
							key={item.value}
							onClick={e => {
								e.preventDefault()
								onChange(item.value)
								setIsShow(false)
							}}
							style={
								isColorSelect
									? {
											backgroundColor: item.value
										}
									: {}
							}
						>
							<Badge variant={item.value}>{item.label}</Badge>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
