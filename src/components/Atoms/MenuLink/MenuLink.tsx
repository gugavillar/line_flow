import Link, { LinkProps } from 'next/link'

export const MenuLink = ({
	children,
	...props
}: LinkProps & { children: string }) => {
	return (
		<Link
			className="font-medium text-gray-600 hover:text-gray-900 focus:outline-none"
			{...props}
		>
			{children}
		</Link>
	)
}
