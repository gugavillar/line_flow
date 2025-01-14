'use client'
import { useCode } from '@/context/useCode'

export const PassedCode = () => {
	const { codes } = useCode()

	return (
		<div className="flex flex-1 items-center justify-center gap-16 px-4">
			{codes
				.map((code) =>
					code.finished_at ? (
						<div className="flex flex-col items-center" key={code?.id}>
							<h4 className="text-7xl font-bold">
								{String(code?.number).padStart(3, '0')}
							</h4>
						</div>
					) : null
				)
				.reverse()
				.slice(1, 6)}
		</div>
	)
}
