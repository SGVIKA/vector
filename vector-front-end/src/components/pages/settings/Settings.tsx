'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './settings.module.css'
import { Heading } from '@/src/components/ui/Heading'
import { Button } from '@/src/components/ui/buttons/Button'
import { Field } from '@/src/components/ui/fields/Field'
import { useInitialData } from '@/src/hooks/settings/useInitialData'
import { useUpdateSettings } from '@/src/hooks/settings/useUpdateSettings'
import { TypeUserForm } from '@/src/types/auth.types'

export function Settings() {
	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	})

	useInitialData(reset)

	const { isPending, mutate } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data
		mutate({
			...rest,
			password: password || undefined
		})
	}

	return (
		<div className={styles.container}>
			<Heading title='Настройки' />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.settings}>
					<div className={styles.block}>
						<Field
							id='email'
							label='Email'
							placeholder='Введите новый email...'
							type='email'
							{...register('email', {
								required: 'Email is required!'
							})}
							extra={styles.settingsItem}
						/>

						<Field
							id='name'
							label='Имя'
							placeholder='Введите новое имя...'
							{...register('name')}
							extra={styles.settingsItem}
						/>

						<Field
							id='password'
							label='Пароль'
							placeholder='Введите новый пароль...'
							type='password'
							{...register('password')}
							extra={styles.settingsItem}
						/>
					</div>

					{/* <div className={styles.block}>
						<Field
							id='workInterval'
							label='Рабочий интервал (мин.)'
							placeholder='Введите значение...'
							isNumber
							{...register('workInterval', {
								valueAsNumber: true
							})}
							extra={styles.settingsItem}
						/>
						<Field
							id='breakInterval'
							label='Интервал отдыха (мин.)'
							placeholder='Введите значение...'
							isNumber
							{...register('breakInterval', {
								valueAsNumber: true
							})}
							extra={styles.settingsItem}
						/>
						<Field
							id='intervalsCount'
							label='Кол-во интервалов (макс. 10)'
							placeholder='Введите значение...'
							isNumber
							{...register('intervalsCount', {
								valueAsNumber: true
							})}
							extra={styles.settingsItem}
						/>
					</div> */}
				</div>
				<Button
					type='submit'
					disabled={isPending}
				>
					Сохранить
				</Button>
			</form>
		</div>
	)
}
