import { ChevronLeft, ChevronRight } from 'lucide-react'

import { IPagination } from './pagination.interface'
import styles from './pagination.module.css'
import { useNotesQueryStore } from '@/src/hooks/notes/useNotesQueryStore'

export function Pagination({ className }: IPagination) {
	const { page, setPage, totalPages } = useNotesQueryStore()

	const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const numValue = Number(value)

		if (value === '' || (numValue >= 1 && numValue <= totalPages)) {
			setPage(numValue)
		}
	}

	return (
		<div className={`${styles.container} ${className}`}>
			<button
				onClick={() => setPage(page - 1)}
				className={styles.paginationButton}
				disabled={page <= 1}
			>
				<ChevronLeft />
			</button>
			<div>
				<input
					type='number'
					className={styles.input}
					value={page}
					onChange={handlePageChange}
					max={totalPages}
					min={1}
				/>
				<span>из {totalPages}</span>
			</div>
			<button
				onClick={() => setPage(page + 1)}
				className={styles.paginationButton}
				disabled={page >= totalPages}
			>
				<ChevronRight />
			</button>
		</div>
	)
}
