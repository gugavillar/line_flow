import { Codes } from '@/context/useCode'

export const lastCalled = (items: Array<Codes>) => {
	if (!items.length) return null

	const now = new Date().getTime()

	return items.reduce((closest, current) => {
		const currentDate = new Date(current.called_at).getTime()
		const closestDate = new Date(closest.called_at).getTime()

		return Math.abs(currentDate - now) < Math.abs(closestDate - now)
			? current
			: closest
	})
}

export const lastCalledNumber = (items: Array<Codes>) => {
	if (!items.length) return 1

	return Math.max(...items.map((item) => item.number)) + 1
}
