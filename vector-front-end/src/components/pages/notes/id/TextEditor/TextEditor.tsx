import {
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	CodeToggle,
	CreateLink,
	InsertTable,
	InsertThematicBreak,
	ListsToggle,
	MDXEditor,
	UndoRedo,
	headingsPlugin,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	markdownShortcutPlugin,
	quotePlugin,
	tablePlugin,
	thematicBreakPlugin,
	toolbarPlugin
} from '@mdxeditor/editor'

import { ITextEditor } from './text-editor.interface'
import styles from './text-editor.module.css'

import '@mdxeditor/editor/style.css'

export function TextEditor({ item, setValue }: ITextEditor) {
	return (
		<div className={styles.textEditor}>
			<MDXEditor
				markdown={item.text || ''}
				onChange={markdown => setValue('text', markdown || '')}
				plugins={[
					tablePlugin(),
					linkPlugin(),
					linkDialogPlugin(),
					thematicBreakPlugin(),
					toolbarPlugin({
						toolbarContents: () => (
							<>
								<BlockTypeSelect />
								<BoldItalicUnderlineToggles />
								<CodeToggle />
								<CreateLink />
								<InsertTable />
								<ListsToggle />
								<InsertThematicBreak />
								<UndoRedo />
							</>
						)
					}),
					headingsPlugin(),
					listsPlugin(),
					linkPlugin(),
					quotePlugin(),
					markdownShortcutPlugin()
				]}
			/>
		</div>
	)
}
