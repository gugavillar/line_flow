import { PassedCodeProps } from './PassedCode.types'

export const PassedCode = ({ code }: PassedCodeProps) => {
	return (
		<div className="flex flex-col">
			<h2 className="text-5xl font-semibold">Senha</h2>
			<h1 className="text-6xl font-bold">{code}</h1>
		</div>
	)
}
