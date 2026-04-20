'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { IAuthForm } from '../../interfaces/auth.interface'

import styles from './auth.module.css'
import { Heading } from '@/src/components/ui/Heading'
import { Button } from '@/src/components/ui/buttons/Button'
import { Field } from '@/src/components/ui/fields/Field'
import { DASHBOARD_PAGES } from '@/src/config/pages-url.config'
import { authService } from '@/src/services/auth.service'

export function Auth() {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const [isLoginForm, setIsLoginForm] = useState(false)

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast.success(
				isLoginForm
					? 'Вход выполнен успешно!'
					: 'Регистрация выполнена успешно!'
			)
			reset()
			push(DASHBOARD_PAGES.HOME)
		},
		onError() {
			toast.error(
				isLoginForm ? 'Неверный логин или пароль' : 'Ошибка при регистранции'
			)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Heading title='Авторизация' />

				<Field
					{...register('email', {
						required: 'Email is required!'
					})}
					id='email'
					label='Email'
					placeholder='Введите email...'
					type='email'
					extra={styles.element}
				/>
				<Field
					id='password'
					label='Пароль'
					placeholder='Введите пароль...'
					type='password'
					{...register('password', {
						required: 'Password is required!'
					})}
					extra={styles.element}
				/>

				<div className={styles.buttonsСontainer}>
					<Button type="submit" onClick={() => setIsLoginForm(true)}>Войти</Button>
					<Button type="submit" onClick={() => setIsLoginForm(false)}>
						Зарегистрироваться
					</Button>
				</div>
			</form>
		</div>
	)
}
