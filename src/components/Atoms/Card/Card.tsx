import { CardProps } from './Card.types'

export const Card = ({ children, heading }: CardProps) => {
	return (
		<div className="flex h-full max-h-[25rem] min-h-[25rem] min-w-[30rem] flex-col rounded-xl border border-t-4 border-t-brand bg-white shadow-sm">
			<div className="flex h-full flex-col p-4 md:p-5">
				<h3 className="text-center text-2xl font-bold text-gray-800 md:text-4xl">
					{heading}
				</h3>
				{children}
			</div>
		</div>
	)
}
