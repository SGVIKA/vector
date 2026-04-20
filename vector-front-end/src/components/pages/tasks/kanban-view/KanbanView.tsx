'use client'

import { DragDropContext } from '@hello-pangea/dnd'

import { COLUMNS } from '../../../data/columns.data'

import { KanbanColumn } from './KanbanColumn'
import styles from './kanbanView.module.css'
import { useTaskDnd } from '@/src/hooks/tasks/useTaskDnd'
import { useTasks } from '@/src/hooks/tasks/useTasks'

export function KanbanView() {
	const { items, setItems } = useTasks()
	const { onDragEnd } = useTaskDnd()
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.container}>
				{COLUMNS.map(column => (
					<KanbanColumn
						key={column.value}
						value={column.value}
						label={column.label}
						items={items}
						setItems={setItems}
					/>
				))}
			</div>
		</DragDropContext>
	)
}
