import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { PrelineScript } from '@/scripts'

import './globals.css'
import { CodesProvider } from '@/context/useCode'

const roboto = Roboto({
	weight: ['400', '500', '700', '900'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Line Flow',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<CodesProvider>
				<body
					className={`${roboto.className} flex h-dvh w-dvw flex-col antialiased`}
				>
					{children}
					<PrelineScript />
				</body>
			</CodesProvider>
		</html>
	)
}
