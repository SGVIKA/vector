'use client'
import { TASKS_VIEWS } from '../../data/switcher.data'
import { SwitcherView } from '../../ui/SwitcherView'

import Loader from '@/src/components/ui/loaders/Loader/Loader'
import { useLocalStorage } from '@/src/hooks/useLocalStorage'

export function TasksView() {
	const [type, setType, isLoading] = useLocalStorage<string>({
		key: 'view-type',
		defaultValue: 'list'
	})

	if (isLoading) return <Loader />
	const CurrentView = TASKS_VIEWS.find(view => view.type === type)?.view

	return (
		<div>
			<SwitcherView
				options={TASKS_VIEWS}
				value={type}
				onChange={setType}
			/>
			{CurrentView ? <CurrentView /> : null}
		</div>
	)
}
