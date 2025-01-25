import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const Input = ({ className, ...props }: ComponentProps<'input'>) => {
	return (
		<div className={twMerge('max-w-sm space-y-3', className)}>
			<input
				className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
				{...props}
			/>
		</div>
	)
}
