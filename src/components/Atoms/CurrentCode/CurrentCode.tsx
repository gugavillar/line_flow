'use client'
import Image from 'next/image'
import { useCode } from '@/context/useCode'
import { lastCalled } from '@/helpers/findLastCalled'

export const CurrentCode = () => {
	const { codes } = useCode()
	const lastCalledCode = lastCalled(codes)
	const activeCode = lastCalledCode?.number
		? String(lastCalledCode?.number).padStart(3, '0')
		: ''

	return (
		<div className="row-span-2 flex h-full flex-col items-center justify-center gap-6 bg-brand p-4 text-white">
			<Image width={300} height={300} src="/assets/logo.png" alt="logo" />
			<h2 className="text-4xl font-semibold">Senha</h2>
			<h1 className="text-9xl font-bold">{activeCode}</h1>
			{lastCalledCode?.guiche && (
				<h3 className="text-6xl font-semibold">
					Guichê {lastCalledCode?.guiche}
				</h3>
			)}
		</div>
	)
}
