'use client'

import { DragDropContext } from '@hello-pangea/dnd'

import { COLUMNS } from '../../../data/columns.data'

import { ListRowParent } from './ListRowParent'
import styles from './listView.module.css'
import { useTaskDnd } from '@/src/hooks/tasks/useTaskDnd'
import { useTasks } from '@/src/hooks/tasks/useTasks'

export function TasksListView() {
	const { items, setItems } = useTasks()
	const { onDragEnd } = useTaskDnd()
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.listViewContainer}>
				<div className={styles.tableHeader}>
					<div></div>
					<div></div>
					<div>Задача</div>
					<div>Дедлайн</div>
					<div>Приоритет</div>
					<div></div>
				</div>

				<div>
					{COLUMNS.map(column => (
						<ListRowParent
							items={items}
							label={column.label}
							value={column.value}
							setItems={setItems}
							key={column.value}
						/>
					))}
				</div>
			</div>
		</DragDropContext>
	)
}
