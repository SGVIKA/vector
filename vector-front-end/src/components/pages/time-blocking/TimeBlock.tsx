import { Edit, GripVertical, Loader, Trash } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { COLORS } from '../../../components/data/colors.data'
import { useDeleteTimeBlock } from '../../../hooks/time-blocking/useDeleteTimeBlock'
import { useTimeBlockSortable } from '../../../hooks/time-blocking/useTimeBlockSortable'
import { ITimeBlockResponse } from '../../interfaces/time-blocking.interface'

import styles from './timeBlocking.module.css'
import { TypeTimeBlockFormState } from '@/src/types/time-block.types'

export function TimeBlock({ item }: { item: ITimeBlockResponse }) {
	const { attributes, listeners, setNodeRef, style } = useTimeBlockSortable(
		item.id
	)
	const { reset } = useFormContext<TypeTimeBlockFormState>()
	const { deleteTimeBlock, isDeletePending } = useDeleteTimeBlock(item.id)

	return (
		<div
			className={styles.blockContainer}
			ref={setNodeRef}
			style={style}
		>
			<div
				className={styles.block}
				style={{
					backgroundColor: item.color || Object.values(COLORS)[0],
					height: `${item.duration}px`
				}}
			>
				<div className={styles.title}>
					<button
						className={styles.action}
						{...attributes}
						{...listeners}
						aria-describedby='time-block'
					>
						<GripVertical size={20} />
					</button>
					<div>
						{item.name} <i>({item.duration} мин.)</i>
					</div>
				</div>

				<div>
					<button
						className={styles.action}
						onClick={() => {
							reset({
								id: item.id,
								color: item.color,
								duration: item.duration,
								name: item.name,
								order: item.order
							})
						}}
					>
						<Edit size={16} />
					</button>
					<button
						className={styles.action}
						onClick={() => deleteTimeBlock()}
					>
						{isDeletePending ? <Loader size={16} /> : <Trash size={16} />}
					</button>
				</div>
			</div>
		</div>
	)
}
