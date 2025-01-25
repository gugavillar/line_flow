import { CurrentCode, PassedCode } from '@/components/Atoms'

export default function PanelPage() {
	return (
		<div className="grid size-full grid-cols-[75%_25%] grid-rows-[75%_25%]">
			<div>
				<video controls={false} autoPlay muted loop className="w-full">
					<source
						src="/assets/reuniao dos secretários 720.mp4"
						type="video/mp4"
					/>
				</video>
			</div>
			<CurrentCode />
			<div className="flex h-full flex-col bg-brand p-4 text-white">
				<h3 className="text-3xl font-semibold">Senhas anteriores</h3>
				<PassedCode />
			</div>
		</div>
	)
}
