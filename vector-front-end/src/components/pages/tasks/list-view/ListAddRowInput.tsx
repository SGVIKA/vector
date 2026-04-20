import styles from '../tasks.module.css'

import { IListAddRowInput } from '@/src/components/interfaces/tasks.interface'

export function ListAddRowInput({ setItems, filterDate }: IListAddRowInput) {
	const addRow = () => {
		setItems(prev => {
			if (!prev) return
			return [
				...prev,
				{
					id: '',
					text: '',
					isCompleted: false,
					createdAt: filterDate
				}
			]
		})
	}

	return (
		<div className={styles.addTask}>
			<button onClick={addRow}>+ Добавить задачу...</button>
		</div>
	)
}
