import {
	Calendar,
	LayoutDashboard,
	Settings,
	SquareCheckBig,
	StickyNote
} from 'lucide-react'

import { IMenuItem } from '../interfaces/ui.interface'

import { DASHBOARD_PAGES } from '@/src/config/pages-url.config'

export const MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		link: DASHBOARD_PAGES.HOME,
		name: 'Главная'
	},
	{
		icon: SquareCheckBig,
		link: DASHBOARD_PAGES.TASKS,
		name: 'Задачи'
	},
	{
		icon: StickyNote,
		link: DASHBOARD_PAGES.NOTES,
		name: 'Заметки'
	},

	{
		icon: Calendar,
		link: DASHBOARD_PAGES.TIME_BLOCKING,
		name: 'Тайм-блокинг'
	},
	{
		icon: Settings,
		link: DASHBOARD_PAGES.SETTINGS,
		name: 'Настройки'
	}
]
