import { PropsWithChildren } from 'react'

import DashboardLayout from '@/src/components/pages/dashboard-layout/DashboardLayout'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <DashboardLayout>{children}</DashboardLayout>
}
