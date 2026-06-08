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
    // Инициализация формы с валидацией onChange
    const { register, handleSubmit, reset } = useForm<TypeUserForm>({ mode: 'onChange' })
    
    useInitialData(reset) // Загрузка начальных данных
    
    const { isPending, mutate } = useUpdateSettings() // Мутация для сохранения
    
    // Обработка отправки формы
    const onSubmit: SubmitHandler<TypeUserForm> = data => {
        const { password, ...rest } = data
        mutate({ ...rest, password: password || undefined }) // Пароль только при заполнении
    }

    return (
        <div className={styles.container}>
            <Heading title='Настройки' />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.settings}>
                    <Field
                        id='email' label='Email' 
                        placeholder='Введите новый email...'
                        type='email'
                        {...register('email', { required: 'Email обязателен' })}
                        extra={styles.settingsItem}
                    />
                    
                    <Field
                        id='name' label='Имя'
                        placeholder='Введите новое имя...'
                        {...register('name')}
                        extra={styles.settingsItem}
                    />
                    
                    <Field
                        id='password' label='Пароль'
                        placeholder='Введите новый пароль...'
                        type='password'
                        {...register('password')}
                        extra={styles.settingsItem}
                    />
                </div>
                <Button type='submit' disabled={isPending}>
                    Сохранить
                </Button>
            </form>
        </div>
    )
}