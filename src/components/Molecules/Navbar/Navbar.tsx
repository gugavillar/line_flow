import { Menu, X } from 'lucide-react'
import { LogoLink, MenuLink } from '@/components/Atoms'
import { NavbarProps } from './Navbar.types'

export const Navbar = ({ label, links, url }: NavbarProps) => {
	return (
		<header className="relative flex w-full flex-wrap bg-blue-400 py-4 text-sm sm:flex-nowrap sm:justify-start">
			<nav className="mx-auto w-full max-w-[85rem] px-4 sm:flex sm:items-center sm:justify-between">
				<div className="flex items-center justify-between">
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
						{links.map((link) => (
							<MenuLink {...link} key={link.children}>
								{link.children}
							</MenuLink>
						))}
					</div>
				</div>
			</nav>
		</header>
	)
}
