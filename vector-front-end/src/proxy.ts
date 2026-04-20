import { NextRequest, NextResponse } from 'next/server'

import { DASHBOARD_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-token.service'

export async function proxy(request: NextRequest) {
	const url = request.nextUrl.pathname

	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isAuthPage = url.startsWith('/auth')

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/auth/:path*']
}
