import { CurrentCodeProps } from './CurrentCode.types'

export const CurrentCode = ({ code, guiche }: CurrentCodeProps) => {
	return (
		<div className="row-span-2 flex h-full flex-col items-center justify-center gap-6 bg-blue-300 p-4">
			<h2 className="text-4xl font-semibold">Senha</h2>
			<h1 className="text-9xl font-bold">{code}</h1>
			<h3 className="text-6xl font-semibold">{guiche}</h3>
		</div>
	)
}
