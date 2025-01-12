import Link from 'next/link'

import { LogoLinkProps } from './LogoLink.types'
import { UsersRound } from 'lucide-react'

export const LogoLink = ({ label, url = '#' }: LogoLinkProps) => {
	return (
		<Link
			className="flex-none text-xl font-semibold focus:opacity-80 focus:outline-none"
			href={url}
			aria-label="Brand"
		>
			<span className="inline-flex items-center gap-x-2 text-xl font-semibold">
				<UsersRound className="h-auto w-10" />
				{label}
			</span>
		</Link>
	)
}
