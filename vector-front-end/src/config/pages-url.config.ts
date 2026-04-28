class DASHBOARD {
	private root = '/dashboard'

	HOME = this.root
	TASKS = `${this.root}/tasks`
	HABITS = `${this.root}/habits`
	TIME_BLOCKING = `${this.root}/time-blocking`
	NOTES = `${this.root}/notes`
	SETTINGS = `${this.root}/settings`
}

export const DASHBOARD_PAGES = new DASHBOARD()
