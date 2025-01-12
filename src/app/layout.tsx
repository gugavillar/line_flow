import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { PrelineScript } from '@/scripts'

import './globals.css'
import { Navbar } from '@/components/Molecules'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
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
			<body
				className={`${geistSans.variable} ${geistMono.variable} flex h-dvh w-dvw flex-col antialiased`}
			>
				<Navbar label="Line Flow" links={[{ children: 'Home', href: '/' }]} />
				{children}
				<PrelineScript />
			</body>
		</html>
	)
}
