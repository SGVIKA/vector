import { Draggable, Droppable } from '@hello-pangea/dnd'

import { FILTERS } from '../../../data/columns.data'
import { filterTasks } from '../filter-tasks'
import taskStyles from '../tasks.module.css'

import { ListAddRowInput } from './ListAddRowInput'
import { ListRow } from './ListRow'
import styles from './listView.module.css'
import { IListRowParent } from '@/src/components/interfaces/tasks.interface'

export function ListRowParent({
	value,
	label,
	items,
	setItems
}: IListRowParent) {
	return (
		<Droppable droppableId={value}>
			{provided => (
				<div
					className={styles.listRowParent}
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={taskStyles.parentLable}>
						<div>{label}</div>
					</div>

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
									<ListRow
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
						<ListAddRowInput
							setItems={setItems}
							filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
						/>
					)}
				</div>
			)}
		</Droppable>
	)
}
