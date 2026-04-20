'use client'

import { useEffect } from 'react'

import { NOTES_VIEWS } from '../../data/switcher.data'
import { Pagination } from '../../ui/Pagination/Pagination'
import { SwitcherView } from '../../ui/SwitcherView'
import { SearchField } from '../../ui/fields/SearchField/SearchField'
import Loader from '../../ui/loaders/Loader/Loader'

import { AddNoteButton } from './AddNoteButton/AddNoteButton'
import styles from './notes.module.css'
import { useNotesQueryStore } from '@/src/hooks/notes/useNotesQueryStore'
import { useNotesWithFilter } from '@/src/hooks/notes/useNotesWithFilter'
import { useLocalStorage } from '@/src/hooks/useLocalStorage'

export function NotesView() {
	const { page, limit, search, setLimit, setTotalPages, totalPages } =
		useNotesQueryStore()
	const { data } = useNotesWithFilter({
		page,
		limit,
		search
	})

	useEffect(() => {
		const totalItems = data?.pagination.total || 0
		const newTotalPages = Math.ceil(totalItems / limit)
		setTotalPages(newTotalPages)
	}, [data, limit])

	const [viewType, setViewType, isLoadingView] = useLocalStorage<string>({
		key: 'view-type',
		defaultValue: 'list'
	})

	const CurrentView = NOTES_VIEWS.find(view => view.type === viewType)?.view

	useEffect(() => {
		if (viewType == 'grid') {
			setLimit(9)
		} else {
			setLimit(10)
		}
	}, [viewType, limit])

	if (isLoadingView) return <Loader />

	return (
		<div>
			<div className={`${styles.actions}`}>
				<SwitcherView
					options={NOTES_VIEWS}
					value={viewType}
					onChange={setViewType}
				/>
				<div className={`${styles.actionsBarContainer}`}>
					<div className={`${styles.searchContainer}`}>
						<SearchField />
					</div>
					<AddNoteButton />
				</div>
			</div>
			<div className={styles.viewContainer}>
				<Pagination
					hasMore={data?.pagination.hasMore}
					className={styles.pagination}
					total={totalPages}
				/>
				{data && CurrentView ? <CurrentView data={data} /> : null}
				<Pagination
					hasMore={data?.pagination.hasMore}
					className={styles.pagination}
					total={totalPages}
				/>
			</div>
		</div>
	)
}
