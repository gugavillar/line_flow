'use client'
import { useEffect } from 'react'
import { Button, Card, Modal } from '@/components/Atoms'
import { CodeService } from '@/components/Molecules'
import { Codes, useCode } from '@/context/useCode'
import { lastCalledNumber } from '@/helpers/findLastCalled'
import { GUICHE_TOTAL, MODAL_ID } from '@/constants/globals'

export const CheckInActions = () => {
	const {
		callCode,
		codes,
		calledCode,
		setCalledCode,
		recallCode,
		guicheNumber,
		handleSaveGuicheNumber,
		startedCode,
	} = useCode()

	const lastCalledCode = startedCode
		? Number(startedCode)
		: lastCalledNumber(codes)

	const handleCallCode = async () => {
		const response = await callCode(
			guicheNumber as Codes['guiche'],
			lastCalledCode
		)
		setCalledCode(response)
	}

	useEffect(() => {
		if (!codes.length) return

		const hasLostCode = codes.find(
			(code) => code.guiche === guicheNumber && !code.finished_at
		)

		if (!hasLostCode) return

		setCalledCode(hasLostCode)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [codes.length])

	return (
		<>
			<h1 className="text-4xl font-bold">Guichê {guicheNumber}</h1>
			<div className="flex size-full flex-col items-center justify-center gap-16 py-8 lg:flex-row">
				<Card heading="Controle de senha">
					<div className="flex h-full flex-col justify-evenly gap-4 py-5">
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
				<Modal title="Selecione o número do guichê" id={MODAL_ID.GUICHE_MODAL}>
					{Array.from({ length: GUICHE_TOTAL }).map((_, index) => (
						<Button
							key={index}
							data-hs-overlay={`#${MODAL_ID.GUICHE_MODAL}`}
							className="w-full"
							onClick={() => handleSaveGuicheNumber(index + 1)}
						>
							{(index + 1).toString().padStart(2, '0')}
						</Button>
					))}
				</Modal>
			</div>
		</>
	)
}
