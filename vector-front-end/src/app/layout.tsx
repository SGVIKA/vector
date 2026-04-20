import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { Toaster } from 'sonner'

import { Providers } from '../components/providers'
import { SITE_NAME } from '../constants/seo.constants'

import './globals.css'

const zen = Noto_Sans({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal']
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description:
		'Определяй направление жизни вместе с Вектор. Задачи, заметки и тайм-блоки - все в одном месте.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={zen.className}>
				<Providers>
					{children}

					<Toaster
						position='bottom-right'
						duration={1500}
					/>
				</Providers>
			</body>
		</html>
	)
}
