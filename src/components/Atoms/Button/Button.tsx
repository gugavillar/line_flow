import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const Button = ({ className, ...props }: ComponentProps<'button'>) => {
	return (
		<button
			type="button"
			className={twMerge(
				'inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 p-4 text-lg font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50 sm:p-5',
				className
			)}
			{...props}
		/>
	)
}
