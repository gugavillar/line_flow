import { format } from 'date-fns'

export const formatDateAndHours = (date: Date) =>
	format(date, 'dd/MM/yyyy - HH:mm')
