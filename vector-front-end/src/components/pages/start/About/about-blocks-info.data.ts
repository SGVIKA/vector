import notes from '../../../../assets/about/notes.png'
import tasks from '../../../../assets/about/tasks.png'
import timeBlocking from '../../../../assets/about/time-blocking.png'

import { IAboutBLock } from './AboutBlock/about-block.interface'

export const ABOUT_BLOCKS: IAboutBLock[] = [
	{
		heading: 'Список задач',
		image: tasks.src,
		text: 'Упорядочь свою жизнь',
		subtext:
			'Будь то рабочие проекты, личные задачи или учебные планы — Вектор помогает вам организовать и уверенно справляться со всем в вашей жизни.'
	},
	{
		heading: 'Заметки',
		image: notes.src,
		text: 'Сохраняй самые смелые идеи',
		subtext:
			'От случайных вспышек до великих замыслов. Markdown-редактор поможет превратить безумие в систему.'
	},

	{
		heading: 'Тайм-блокинг',
		image: timeBlocking.src,
		text: 'Покори каждую минуту своего дня',
		subtext:
			'Превратите хаотичный день в четкий план: цветные блоки, гибкое планирование и мгновенные изменения помогают подчинить время вашим амбициям без стресса и суеты.'
	}
]
