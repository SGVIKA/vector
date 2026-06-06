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
			{/* Редактор Markdown */}
			<MDXEditor
				markdown={item.text || ''} // Исходный текст
				onChange={markdown => setValue('text', markdown || '')} // Сохранение изменений
				plugins={[
					tablePlugin(), // Таблицы
					linkPlugin(), // Ссылки
					linkDialogPlugin(), // Диалог вставки ссылки
					thematicBreakPlugin(), // Горизонтальная линия
					toolbarPlugin({
						// Панель инструментов
						toolbarContents: () => (
							<>
								<BlockTypeSelect /> // Типы блоков
								<BoldItalicUnderlineToggles /> // Жирный/курсив/подчеркивание
								<CodeToggle /> // Вставка кода
								<CreateLink /> // Добавить ссылку
								<InsertTable /> // Вставить таблицу
								<ListsToggle /> // Списки
								<InsertThematicBreak /> // Разделитель
								<UndoRedo /> // Отмена/повтор
							</>
						)
					}),
					headingsPlugin(), // Заголовки
					listsPlugin(), // Списки
					quotePlugin(), // Цитаты
					markdownShortcutPlugin() // Быстрые команды
				]}
			/>
		</div>
	)
}
