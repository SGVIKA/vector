import debounce from 'lodash.debounce'
import { create } from 'zustand'

import { IQuery } from '@/src/components/interfaces/query.interface'

/**
 * Интерфейс хранилища параметров запроса
 * Расширяет базовый интерфейс IQuery дополнительными методами
 */
export interface IQueryStore {
	/** Общее количество страниц, полученное от сервера */
	totalPages: number
	/** Установка общего количества страниц */
	setTotalPages: (totalPages: number) => void

	/** Установка номера текущей страницы */
	setPage: (page: number) => void
	/** Установка количества элементов на одной странице */
	setLimit: (limit: number) => void
	/** Установка поискового запроса с задержкой для оптимизации */
	setSearch: (search: string) => void
}

/**
 * Хранилище состояния параметров запроса для заметок
 * 
 * Управляет параметрами пагинации и поиском.
 * Поисковый запрос обрабатывается с debounce для снижения нагрузки на сервер.
 */
export const useNotesQueryStore = create<IQuery & IQueryStore>(set => ({
	// Начальные значения параметров запроса
	page: 1,      // Номер текущей страницы
	limit: 10,    // Количество элементов на странице
	search: '',   // Строка поискового фильтра
	
	// Методы управления состоянием
	setPage: (page: number) => set({ page }),
	setLimit: (limit: number) => set({ limit }),
	
	// Обработка поискового запроса с задержкой 1000 мс
	// Используется для предотвращения частых запросов при вводе текста
	setSearch: debounce((search: string) => {
		// При изменении поиска страница сбрасывается на первую
		set({ search, page: 1 })
	}, 1000),
	
	// Данные о пагинации от сервера
	totalPages: 0,
	setTotalPages: (totalPages: number) => set({ totalPages })
}))