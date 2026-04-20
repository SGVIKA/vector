import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { useTimeBlockDnd } from '../../../hooks/time-blocking/useTimeBlockDnd'
import { useTimeBlocks } from '../../../hooks/time-blocking/useTimeBlocks'

import { TimeBlock } from './TimeBlock'
import { calcTime } from './calc-time'
import styles from './timeBlocking.module.css'
import Loader from '@/src/components/ui/loaders/Loader/Loader'

export function TimeBlockingList() {
	const { items, setItems, isLoading } = useTimeBlocks()
	const { handleDragEnd, sensors } = useTimeBlockDnd(items, setItems)

	if (isLoading) return <Loader />

	const { hoursLeft } = calcTime(items)

	return (
		<div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div>
					<SortableContext
						items={items || []}
						strategy={verticalListSortingStrategy}
					>
						{items?.length ? (
							items?.map(item => (
								<TimeBlock
									key={item.id}
									item={item}
								/>
							))
						) : (
							<div>Добавьте первый блок с помощью формы справа</div>
						)}
					</SortableContext>
				</div>
			</DndContext>
			<div className={styles.freeTime}>
				{hoursLeft > 0
					? `Свободно  ${hoursLeft} ч. из 24`
					: 'Свободного времени не осталось'}
			</div>
		</div>
	)
}
