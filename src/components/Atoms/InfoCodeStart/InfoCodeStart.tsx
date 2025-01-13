import { formatDateAndHours } from '@/formatters'

export const InfoCodeStart = ({ start }: { start: string | null }) => {
	if (!start) return null
	return (
		<p>
			<span className="font-bold">Atendimento iniciado em:</span>{' '}
			{formatDateAndHours(new Date(start))}
		</p>
	)
}
