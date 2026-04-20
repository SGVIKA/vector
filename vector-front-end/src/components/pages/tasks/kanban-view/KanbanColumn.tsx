import { Draggable, Droppable } from '@hello-pangea/dnd'

import { FILTERS } from '../../../data/columns.data'
import { filterTasks } from '../filter-tasks'
import taskStyles from '../tasks.module.css'

import { KanbanAddCardInput } from './KanbanAddCardInput'
import { KanbanCard } from './KanbanCard'
import styles from './kanbanView.module.css'
import { IKanbanColumn } from '@/src/components/interfaces/tasks.interface'

export function KanbanColumn({ value, label, items, setItems }: IKanbanColumn) {
	return (
		<Droppable droppableId={value}>
			{provided => (
				<div
					className={styles.column}
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div>
						<div className={taskStyles.parentLable}>{label}</div>

						{filterTasks(items, value)?.map((item, index) => (
							<Draggable
								key={item.id}
								draggableId={item.id}
								index={index}
							>
								{provided => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<KanbanCard
											key={item.id}
											item={item}
											setItems={setItems}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
						{value !== 'completed' && !items?.some(item => !item.id) && (
							<KanbanAddCardInput
								setItems={setItems}
								filterDate={
									FILTERS[value] ? FILTERS[value].format() : undefined
								}
							/>
						)}
					</div>
				</div>
			)}
		</Droppable>
	)
}
