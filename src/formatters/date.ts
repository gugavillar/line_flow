import { format } from 'date-fns'

export const formatDateAndHours = (date: Date | null) =>
	!date ? '' : format(date, 'dd/MM/yyyy - HH:mm')
