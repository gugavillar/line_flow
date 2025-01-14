import { LogoLinkProps } from '@/components/Atoms/LogoLink/LogoLink.types'
import { LinkProps } from 'next/link'

export type NavbarProps = LogoLinkProps & {
	links?: Array<LinkProps & { children: string }>
}
