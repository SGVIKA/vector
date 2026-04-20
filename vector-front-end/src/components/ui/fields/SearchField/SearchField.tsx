import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import styles from './search-field.module.css'
import { useNotesQueryStore } from '@/src/hooks/notes/useNotesQueryStore'

export function SearchField() {
	const { search, setSearch } = useNotesQueryStore()

	const inputRef = useRef<HTMLInputElement>(null)

	const [localSearch, setLocalSearch] = useState(search)

	useEffect(() => {
		setLocalSearch(search)
	}, [search])

	const handleClear = () => {
		setLocalSearch('')
		setSearch('')
		inputRef.current?.focus()
	}

	return (
		<div className={styles.search}>
			<input
				className={styles.input}
				type='text'
				value={localSearch}
				onChange={e => {
					setLocalSearch(e.target.value)
					setSearch(e.target.value)
				}}
				placeholder='Поиск...'
			/>
			<div className={styles.icon}>
				<Search size={25} />
			</div>
			{search && (
				<button
					onClick={handleClear}
					className={`${styles.icon} ${styles.clearIcon}`}
				>
					<X size={20} />
				</button>
			)}
		</div>
	)
}
