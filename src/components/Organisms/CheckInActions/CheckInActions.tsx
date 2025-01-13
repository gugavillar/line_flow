'use client'
import { Button, Card } from '@/components/Atoms'
import { useCode } from '@/context/useCode'
import { lastCalledNumber } from '@/helpers/findLastCalled'
import { CodeService } from '@/components/Molecules'
import { useEffect } from 'react'

export const CheckInActions = () => {
	const { callCode, codes, calledCode, setCalledCode, recallCode } = useCode()

	const lastCalledCode = lastCalledNumber(codes)

	const handleCallCode = async () => {
		const response = await callCode(1, lastCalledCode)
		setCalledCode(response)
	}

	useEffect(() => {
		if (!codes.length) return

		const hasLostCode = codes.find(
			(code) => code.guiche === 1 && (!code.started_at || !code.finished_at)
		)

		if (!hasLostCode) return

		setCalledCode(hasLostCode)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [codes.length])

	return (
		<div className="flex h-full flex-col items-center justify-center gap-16 p-4 lg:flex-row">
			<Card heading="Controle de senha">
				<div className="flex h-full flex-col justify-evenly">
					<Button onClick={handleCallCode} disabled={!!calledCode?.number}>
						Chamar próxima senha
					</Button>
					{calledCode?.number && (
						<>
							<Button
								disabled={!!calledCode?.started_at}
								onClick={() => recallCode(calledCode.id)}
							>
								Rechamar senha {calledCode?.number}
							</Button>
							<div className="flex flex-col items-center justify-center text-center">
								<p className="text-lg">Senha em atendimento</p>
								<p className="text-7xl">{calledCode?.number}</p>
							</div>
						</>
					)}
				</div>
			</Card>
			<CodeService code={calledCode} />
		</div>
	)
}
