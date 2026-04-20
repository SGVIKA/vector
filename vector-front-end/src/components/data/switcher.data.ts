import { Kanban, LayoutGrid, LayoutList, ListTodo } from 'lucide-react'

import { IViewOptions } from '../interfaces/ui.interface'
import { NotesGridView } from '../pages/notes/grid-view/NotesGridView'
import { NotesListView } from '../pages/notes/list-view/NotesListView'
import { KanbanView } from '../pages/tasks/kanban-view/KanbanView'
import { TasksListView } from '../pages/tasks/list-view/TasksListView'

export const TASKS_VIEWS: IViewOptions[] = [
	{
		type: 'list',
		label: 'Список',
		icon: ListTodo,
		view: TasksListView
	},
	{ type: 'kanban', label: 'Доска', icon: Kanban, view: KanbanView }
]

export const NOTES_VIEWS: IViewOptions[] = [
	{
		type: 'list',
		label: 'Список',
		icon: LayoutList,
		view: NotesListView
	},
	{ type: 'grid', label: 'Сетка', icon: LayoutGrid, view: NotesGridView }
]
