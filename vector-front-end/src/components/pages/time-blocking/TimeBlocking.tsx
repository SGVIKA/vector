'use client'
import { FormProvider, useForm } from 'react-hook-form'

import { TimeBlockingForm } from '../../../components/pages/time-blocking/TimeBlockingForm'

import { TimeBlockingList } from './TimeBlockingList'
import styles from './timeBlocking.module.css'
import type { TypeTimeBlockFormState } from '@/src/types/time-block.types'

export function TimeBlocking() {
	const methods = useForm<TypeTimeBlockFormState>()

	return (
		<FormProvider {...methods}>
			<div className={styles.container}>
				<TimeBlockingList />
				<TimeBlockingForm />
			</div>
		</FormProvider>
	)
}
