import { Controller, SubmitHandler, useFormContext } from 'react-hook-form'

import { useCreateTimeBlock } from '../../../hooks/time-blocking/useCreateTimeBlock'
import { useUpdateTimeBlock } from '../../../hooks/time-blocking/useUpdateTimeBlock'
import { COLORS } from '../../data/colors.data'
import { SingleSelect } from '../../ui/SingleSelect'
import styles from './timeBlocking.module.css'

import { Button } from '@/src/components/ui/buttons/Button'
import { Field } from '@/src/components/ui/fields/Field'
import { TypeTimeBlockFormState } from '@/src/types/time-block.types'

export function TimeBlockingForm() {
	const { register, control, watch, reset, handleSubmit, getValues } =
		useFormContext<TypeTimeBlockFormState>()

	const existsId = watch('id')

	const { updateTimeBlock } = useUpdateTimeBlock(existsId)
	const { createTimeBlock, isPending } = useCreateTimeBlock()

	const onSubmit: SubmitHandler<TypeTimeBlockFormState> = data => {
		const { color, id, ...rest } = data
		const dto = { ...rest, color: color || undefined }

		if (id) {
			updateTimeBlock({
				id,
				data: dto
			})
		} else {
			createTimeBlock(dto)
		}

		reset({
			color: Object.values(COLORS)[0],
			duration: 0,
			name: '',
			id: undefined,
			order: 1
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Field
				{...register('name', {
					required: true
				})}
				id='name'
				label='Название'
				placeholder='Введите название...'
				extra={styles.formItem}
			/>

			<Field
				{...register('duration', {
					required: true,
					valueAsNumber: true
				})}
				id='duration'
				label='Длительность (мин.)'
				placeholder='Введите значение...'
				isNumber
				extra={styles.formItem}
			/>

			<div className={styles.formItem}>
				<span>Цвет</span>
				<Controller
					control={control}
					name='color'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={Object.entries(COLORS).map(([label, color]) => ({
								value: color,
								label: label
							}))}
							onChange={onChange}
							value={value || Object.values(COLORS)[0]}
							isColorSelect
						/>
					)}
				/>
			</div>

			<Button
				className={styles.saveButton}
				type='submit'
				disabled={isPending}
			>
				{existsId ? 'Обновить' : 'Создать'}
			</Button>
		</form>
	)
}
