'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import useSound from 'use-sound'

import { useCode } from '@/context/useCode'
import { lastCalled } from '@/helpers/findLastCalled'
import { twMerge } from 'tailwind-merge'

export const CurrentCode = () => {
	const [bounce, setBounce] = useState(false)

	const { codes } = useCode()
	const [play] = useSound('/assets/tone.mp3')
	const lastCalledCode = lastCalled(codes)

	const activeCode = lastCalledCode?.number
		? String(lastCalledCode?.number).padStart(3, '0')
		: ''

	useEffect(() => {
		if (!lastCalledCode?.called_at) return

		play()
		setBounce(true)

		setTimeout(() => setBounce(false), 1500)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastCalledCode?.called_at])

	return (
		<div className="row-span-2 flex h-full flex-col items-center justify-center gap-6 bg-brand p-4 text-white">
			<Image
				width={300}
				height={300}
				src="/assets/logo.png"
				alt="logo"
				className="w-full"
			/>
			<h2 className="text-7xl font-semibold">SENHA</h2>
			<h1 className={twMerge('text-9xl font-bold', bounce && 'animate-bounce')}>
				{activeCode}
			</h1>
			{lastCalledCode?.guiche && (
				<h3 className="text-7xl font-semibold">
					Guichê {lastCalledCode?.guiche}
				</h3>
			)}
		</div>
	)
}
