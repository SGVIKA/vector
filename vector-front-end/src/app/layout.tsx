import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { Toaster } from 'sonner'

import { Providers } from '../components/providers'
import { SITE_NAME } from '../constants/seo.constants'

import './globals.css'

// Настройка шрифта Noto Sans для всего приложения
const zen = Noto_Sans({
    subsets: ['cyrillic', 'latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-zen',
    style: ['normal']
})

// Метаданные для SEO-оптимизации приложения
export const metadata: Metadata = {
    title: {
        default: SITE_NAME,
        template: `%s | ${SITE_NAME}`
    },
    description:
        'Определяй направление жизни вместе с Вектор. Задачи, заметки и тайм-блоки - все в одном месте.'
}

/**
 * Корневой компонент макета приложения (Root Layout)
 * 
 * Является обязательным компонентом в Next.js App Router.
 * Оборачивает всё приложение и применяется ко всем страницам.
 */
export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='ru'>
            <body className={zen.className}>
                {/* Провайдеры глобального состояния */}
                <Providers>
                    {/* Контент текущей страницы */}
                    {children}

                    {/* Система уведомлений */}
                    <Toaster
                        position='bottom-right'  // Позиция появления уведомлений
                        duration={1500}          // Продолжительность отображения (мс)
                    />
                </Providers>
            </body>
        </html>
    )
}