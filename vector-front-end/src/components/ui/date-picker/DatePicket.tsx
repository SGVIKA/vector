import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { X } from 'lucide-react'
import { useState } from 'react'
import { DayPicker } from 'react-day-picker'

import { IDatePicker } from '../../interfaces/ui.interface'
import styles from '../ui.module.css'

import { useOutside } from '@/src/hooks/useOutside'

import 'react-day-picker/dist/style.css'

dayjs.extend(LocalizedFormat)

export function DatePicker({
	onChange,
	value,
	position = 'right'
}: IDatePicker) {
	const [selected, setSelected] = useState<Date>()
	const { isShow, setIsShow, ref } = useOutside(false)

	const handleDaySelect = (date?: Date) => {
		const ISOdate = date?.toISOString()

		setSelected(date)
		if (ISOdate) {
			onChange(ISOdate)
			setIsShow(false)
		} else {
			onChange('')
		}
	}

	return (
		<div ref={ref}>
			<button
				className={styles.datePickerBtn}
				onClick={() => setIsShow(!isShow)}
			>
				{value ? dayjs(value).format('LL') : 'Нажмите для выбора'}
			</button>
			{value && (
				<button
					className={styles.clearBtn}
					onClick={() => onChange('')}
				>
					<X size={14} />
				</button>
			)}
			{isShow && (
				<div className={`${styles.dayPickerContainer}`}>
					<DayPicker
						startMonth={new Date(2000, 0)}
						endMonth={new Date(2220, 0)}
						autoFocus={isShow}
						mode='single'
						defaultMonth={selected || new Date()}
						selected={selected}
						onSelect={handleDaySelect}
						weekStartsOn={1}
					/>
				</div>
			)}
		</div>
	)
}
