import { X } from 'lucide-react'
import { Button } from '../Button'
import { ModalProps } from './Modal.types'

export const Modal = ({ title, id, children, ...props }: ModalProps) => {
	return (
		<div
			id={id}
			className="hs-overlay pointer-events-none fixed start-0 top-0 z-[80] hidden size-full overflow-y-auto overflow-x-hidden"
		>
			<div className="m-3 mt-0 flex min-h-[calc(100%-3.5rem)] items-center opacity-0 transition-all ease-out hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 sm:mx-auto sm:w-full sm:max-w-lg">
				<div
					className="pointer-events-auto flex w-full flex-col rounded-xl border bg-white shadow-sm"
					{...props}
				>
					<div className="flex items-center justify-between border-b px-4 py-3">
						<h3 className="text-xl font-bold text-gray-800">{title}</h3>
						<Button
							data-hs-overlay={`#${id}`}
							className="rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 sm:p-1"
						>
							<span className="sr-only">Close</span>
							<X className="size-4" />
						</Button>
					</div>
					<div className="overflow-y-auto p-4">
						<div className="flex w-full gap-8">{children}</div>
					</div>
				</div>
			</div>
		</div>
	)
}
