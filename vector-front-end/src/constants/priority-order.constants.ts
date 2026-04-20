import { EnumTaskPriority } from '../components/enums/tasks.enum'

export const PRIORITY_ORDER: Record<EnumTaskPriority, number> = {
	[EnumTaskPriority.high]: 3,
	[EnumTaskPriority.medium]: 2,
	[EnumTaskPriority.low]: 1,
	[EnumTaskPriority.none]: 0
}
