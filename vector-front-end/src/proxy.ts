import { NextRequest, NextResponse } from 'next/server'

import { DASHBOARD_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-token.service'

export async function proxy(request: NextRequest) {
	const url = request.nextUrl.pathname

	// Проверяем оба токена
	const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	
	// Если есть хотя бы один токен — пользователь авторизован
	const hasToken = !!(accessToken || refreshToken)

	const isAuthPage = url.startsWith('/auth')

	console.log('Middleware check:', { url, hasToken, isAuthPage })

	// Если на странице авторизации и есть токен — перенаправляем на дашборд
	if (isAuthPage && hasToken) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url))
	}

	// Если на странице авторизации и нет токена — пускаем
	if (isAuthPage) {
		return NextResponse.next()
	}

	// Если на защищённой странице и нет токена — перенаправляем на авторизацию
	if (!hasToken) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	// В остальных случаях пускаем
	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/auth/:path*']
}