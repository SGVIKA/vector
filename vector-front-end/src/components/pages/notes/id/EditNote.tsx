'use client'

import { ChevronLeft, Menu, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { DeleteNoteButton } from '../DeleteNoteButton/DeleteNoteButton'

import { ShortNotesList } from './ShortNotesList/ShortNotesList'
import { TextEditor } from './TextEditor/TextEditor'
import styles from './edit-note.module.css'
import { TransparentField } from '@/src/components/ui/fields/TransparentFields'
import Loader from '@/src/components/ui/loaders/Loader/Loader'
import { DASHBOARD_PAGES } from '@/src/config/pages-url.config'
import { useNoteById } from '@/src/hooks/notes/useNoteById'
import { useNoteDebounce } from '@/src/hooks/notes/useNoteDebounce'
import { TypeNoteFormState } from '@/src/types/note.types'

export function EditNote({ id }: { id: string }) {
	const { item } = useNoteById(id)
	const { register, watch, reset, setValue } = useForm<TypeNoteFormState>({
		defaultValues: {
			title: '',
			text: '',
			updatedAt: '',
			createdAt: ''
		}
	})

	useEffect(() => {
		if (item) {
			reset({
				title: item.title,
				text: item.text,
				updatedAt: item.updatedAt,
				createdAt: item.createdAt
			})
		}
	}, [item, reset])

	useNoteDebounce({ watch, itemId: id })

	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const menuSwitch = () => {
		setIsMenuOpen(prev => !prev)
	}

	if (!item) {
		return (
			<div className={styles.container}>
				<Loader />
			</div>
		)
	}

	return (
		<div className={`${styles.container}`}>
			<div
				className={`${styles.shortListContainer} ${isMenuOpen ? styles.animateIn : styles.animateOut}`}
			>
				<ShortNotesList />
			</div>
			<div className={styles.editContainer}>
				<div className={`${styles.actions}`}>
					<div className={`${styles.actionsContainer}`}>
						<button
							className={`${styles.action}`}
							onClick={menuSwitch}
						>
							<Menu size={25} />
						</button>
						<a
							className={`${styles.action} ${styles.backBtn}`}
							href={DASHBOARD_PAGES.NOTES}
						>
							<ChevronLeft size={25} />
						</a>
					</div>
					<div className={`${styles.actionsContainer}`}>
						<DeleteNoteButton
							itemId={item.id}
							sizeIcon={20}
						/>
					</div>
				</div>
				<div className={`${styles.noteContainer}`}>
					<TransparentField
						className={styles.titleFiel}
						{...register('title')}
					/>
					<div className='line' />
					<TextEditor
						item={item}
						setValue={setValue}
					/>
				</div>
			</div>
		</div>
	)
}
