import { Button, Card, InfoCodeStart } from '@/components/Atoms'
import { ENDTYPE } from '@/constants/globals'
import { CodeFromFirebase, Codes, useCode } from '@/context/useCode'

export const CodeService = ({ code }: { code: CodeFromFirebase | null }) => {
	const { startService, setCalledCode, endService } = useCode()

	if (!code) return null

	const handleStartService = async (codeId: string) => {
		const response = await startService(codeId)
		setCalledCode(response)
	}

	const handleEndService = async (
		codeId: string,
		endType: Codes['end_type']
	) => {
		await endService(codeId, endType)
		setCalledCode(null)
	}

	return (
		<Card heading="Atendimento da senha">
			<div className="flex flex-col gap-4 py-5">
				<div className="text-center text-lg">
					<InfoCodeStart start={code.started_at} />
				</div>
				<Button
					className="bg-blue-100 text-blue-800 hover:bg-blue-200 focus:bg-blue-200"
					onClick={() => handleStartService(code.id)}
					disabled={!!code.started_at}
				>
					Iniciar atendimento
				</Button>
				<Button
					className="bg-red-100 text-red-800 hover:bg-red-200 focus:bg-red-200"
					onClick={() => handleEndService(code.id, ENDTYPE.FINISH)}
					disabled={!code.started_at}
				>
					Finalizar atendimento
				</Button>
				<Button
					className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:bg-yellow-200"
					disabled={!!code.started_at}
					onClick={() => handleEndService(code.id, ENDTYPE.CANCEL)}
				>
					Não compareceu
				</Button>
			</div>
		</Card>
	)
}
