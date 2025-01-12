import { Button } from '@/components/Atoms'
import { Card } from '@/components/Atoms/Card'
import { formatDateAndHours } from '@/formatters'

export const CheckInActions = () => {
	return (
		<div className="flex h-full flex-col items-center justify-center gap-16 p-4 lg:flex-row">
			<Card heading="Controle de senha">
				<div className="flex h-full flex-col justify-evenly">
					<Button>Chamar próxima senha</Button>
					<Button>Rechamar senha 05</Button>
					<div className="flex flex-col items-center justify-center text-center">
						<p className="text-lg">Senha em atendimento</p>
						<p className="text-7xl">05</p>
					</div>
				</div>
			</Card>
			<Card heading="Atendimento da senha">
				<div className="flex flex-col gap-4 py-5">
					<div className="text-center text-lg">
						<p>
							<span className="font-bold">Atendimento iniciado em:</span>{' '}
							{formatDateAndHours(new Date())}
						</p>
					</div>
					<Button className="bg-blue-100 text-blue-800 hover:bg-blue-200 focus:bg-blue-200">
						Iniciar atendimento
					</Button>
					<Button className="bg-red-100 text-red-800 hover:bg-red-200 focus:bg-red-200">
						Finalizar atendimento
					</Button>
					<Button className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:bg-yellow-200">
						Não compareceu
					</Button>
				</div>
			</Card>
		</div>
	)
}
