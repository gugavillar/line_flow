import { Navbar } from '@/components/Molecules'

export default function ServiceLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Navbar label="Line Flow" />
			{children}
		</>
	)
}
