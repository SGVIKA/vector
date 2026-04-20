import { Metadata } from 'next'

import styles from '../../../components/pages/tasks/tasks.module.css'

import { TasksView } from '@/src/components/pages/tasks/TasksView'
import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Задачи',
	...NO_INDEX_PAGE
}

export default function TasksPage() {
	return (
		<div className={styles.tasksContainer}>
			<TasksView />
		</div>
	)
}
