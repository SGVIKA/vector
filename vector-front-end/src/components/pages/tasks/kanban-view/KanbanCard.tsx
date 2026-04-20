import { GripVertical, Loader, Trash } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import taskStyles from '../tasks.module.css'

import styles from './kanbanView.module.css'
import { IKanbanCard } from '@/src/components/interfaces/tasks.interface'
import { SingleSelect } from '@/src/components/ui/SingleSelect'
import Checkbox from '@/src/components/ui/checkbox/checkbox'
import { DatePicker } from '@/src/components/ui/date-picker/DatePicket'
import { TransparentField } from '@/src/components/ui/fields/TransparentFields'
import { useDeleteTask } from '@/src/hooks/tasks/useDeleteTask'
import { useTaskDebounce } from '@/src/hooks/tasks/useTaskDebounce'
import { TypeTaskFormState } from '@/src/types/task.types'

export function KanbanCard({ item, setItems }: IKanbanCard) {
	const { register, control, watch } = useForm<TypeTaskFormState>({
		defaultValues: {
			text: item.text,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	})

	useTaskDebounce({ watch, itemId: item.id })

	const { deleteTask, isDeletePending } = useDeleteTask()

	return (
		<div className={styles.card}>
			<div className={`${styles.cardItem} ${styles.taskHeader}`}>
				<Controller
					control={control}
					name='isCompleted'
					render={({ field: { value, onChange } }) => (
						<Checkbox
							onChange={onChange}
							checked={value}
						/>
					)}
				/>

				<TransparentField className={`${watch('isCompleted') ? taskStyles.completedTask : ''}`} {...register('text')} />
				<button
					className={taskStyles.grip}
					aria-describedby='todo-item'
				>
					<GripVertical />
				</button>
			</div>
			<div className={styles.cardItem}>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => (
						<DatePicker
							onChange={onChange}
							value={value || ''}
							position='left'
						/>
					)}
				/>
			</div>
			<div className={styles.cardItem}>
				<Controller
					control={control}
					name='priority'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={['high', 'medium', 'low'].map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>
			<div className={`${styles.cardItem} ${styles.deleteButtonPosition}`}>
				<button
					className={taskStyles.deleteBtn}
					onClick={() =>
						item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
					}
				>
					{isDeletePending ? <Loader size={18} /> : <Trash size={18} />}
				</button>
			</div>
		</div>
	)
}
