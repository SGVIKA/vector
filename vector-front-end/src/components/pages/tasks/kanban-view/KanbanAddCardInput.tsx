import styles from '../tasks.module.css'

import { IKanbanAddCardInput } from '@/src/components/interfaces/tasks.interface'

export function KanbanAddCardInput({
	setItems,
	filterDate
}: IKanbanAddCardInput) {
	const addCard = () => {
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
			<button onClick={addCard}>+ Добавить задачу...</button>
		</div>
	)
}
