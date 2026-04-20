'use client'

import styles from './statistics.module.css'
import { Heading } from '@/src/components/ui/Heading'
import Loader from '@/src/components/ui/loaders/Loader/Loader'
import { useProfile } from '@/src/hooks/useProfile'

export function Statistics() {
	const { data, isLoading } = useProfile()

	return isLoading ? (
		<Loader />
	) : (
		<div className={styles.container}>
			<Heading
				title='Задачи'
				className={styles.title}
			/>
			<div className={`${styles.block}`}>
				{data?.statistics?.tasks.length ? (
					data.statistics.tasks.map((statistic, index) => (
						<div
							className={styles.statisticCard}
							key={index}
						>
							<div className={styles.statValue}>{statistic.value}</div>
							<div className={styles.statLabel}>{statistic.label}</div>
						</div>
					))
				) : (
					<div>Статистика по задачам не найдена</div>
				)}
			</div>

			<Heading
				title='Заметки'
				className={styles.statTitle}
			/>
			<div className={`${styles.block}`}>
				{data?.statistics.notes.length ? (
					data.statistics.notes.map((statistic, index) => (
						<div
							className={styles.statisticCard}
							key={index}
						>
							<div className={styles.statValue}>{statistic.value}</div>
							<div className={styles.statLabel}>{statistic.label}</div>
						</div>
					))
				) : (
					<div>Статистика по заметкам не найдена</div>
				)}
			</div>
		</div>
	)
}
