'use client'
import { Menu, X } from 'lucide-react'
import { Button, Input, LogoLink, Modal } from '@/components/Atoms'
import { NavbarProps } from './Navbar.types'
import { MODAL_ID } from '@/constants/globals'
import { useState } from 'react'
import { useCode } from '@/context/useCode'

export const Navbar = ({ label, url }: NavbarProps) => {
	const [initialNumber, setInitialNumber] = useState('')
	const { handleSaveInitialCodeNumber } = useCode()

	const handleDefineInitialCodeNumber = () => {
		handleSaveInitialCodeNumber(initialNumber)
		setInitialNumber('')
	}
	return (
		<header className="relative flex w-full flex-wrap bg-brand px-8 py-4 text-sm sm:flex-nowrap sm:justify-start">
			<nav className="flex w-full items-center justify-between">
				<div className="flex w-full items-center justify-between text-white">
					<LogoLink label={label} url={url} />
					<div className="sm:hidden">
						<button
							type="button"
							className="hs-collapse-toggle relative flex size-7 items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
							data-hs-collapse="#hs-navbar"
						>
							<Menu className="size-4 shrink-0 hs-collapse-open:hidden" />
							<X className="hidden size-4 shrink-0 hs-collapse-open:block" />
							<span className="sr-only">Toggle navigation</span>
						</button>
					</div>
				</div>
				<div
					id="hs-navbar"
					className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block"
				>
					<div className="mt-5 flex flex-col gap-5 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:ps-5">
						<button
							className="text-lg text-white"
							data-hs-overlay={`#${MODAL_ID.NUMBER_MODAL}`}
						>
							Definir senha para atendimento
						</button>
					</div>
				</div>
			</nav>
			<Modal id={MODAL_ID.NUMBER_MODAL} title="Definir senha para atendimento">
				<Input
					type="number"
					placeholder="Número da Senha"
					className="w-full max-w-full"
					value={initialNumber}
					onChange={(e) => setInitialNumber(e.target.value)}
				/>
				<Button
					className="px-3 py-2 sm:px-3 sm:py-2"
					disabled={!initialNumber}
					onClick={handleDefineInitialCodeNumber}
					data-hs-overlay={`#${MODAL_ID.NUMBER_MODAL}`}
				>
					Definir
				</Button>
			</Modal>
		</header>
	)
}
