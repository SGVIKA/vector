import { register } from 'module'

import { SearchField } from '../../ui/fields/SearchField/SearchField'
import { TransparentField } from '../../ui/fields/TransparentFields'

import { AddNoteButton } from './AddNoteButton/AddNoteButton'
import styles from './notes.module.css'

export function ActionsBar() {
	return (
		<div className={`${styles.actionsBarContainer}`}>
			<div className={`${styles.searchContainer}`}>
				<SearchField />
			</div>
			<AddNoteButton />
		</div>
	)
}
