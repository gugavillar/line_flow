import { CurrentCode, PassedCode } from '@/components/Atoms'

export default function PanelPage() {
	return (
		<div className="grid size-full grid-cols-[70%_30%] grid-rows-[70%_30%]">
			<div className="h-full">
				<iframe
					width="100%"
					height="100%"
					src="https://www.youtube.com/embed/rv3OZWe30p0?controls=0&loop=1&autoplay=1&mute=1"
					title="CONHEÇA VITÓRIA DE SANTO ANTÃO NO ESTADO DE PERNAMBUCO UMA BELÍSSIMA CIDADE DO NORDESTE DO BRASIL."
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				/>
			</div>
			<CurrentCode />
			<div className="flex h-full flex-col p-4">
				<h3 className="text-3xl font-semibold">Senhas anteriores</h3>
				<div className="flex flex-1 items-center justify-center gap-16 px-4">
					<PassedCode code="004" />
					<PassedCode code="003" />
					<PassedCode code="002" />
					<PassedCode code="001" />
				</div>
			</div>
		</div>
	)
}
