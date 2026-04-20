import { Metadata } from 'next'

import { EditNote } from '@/src/components/pages/notes/id/EditNote'
import { NO_INDEX_PAGE } from '@/src/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Заметки',
	...NO_INDEX_PAGE
}

export default async function EditNotesPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	return (
		<div>
			<EditNote id={id} />
		</div>
	)
}
