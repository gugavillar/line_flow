import { ComponentProps, ReactNode } from 'react'

export type ModalProps = ComponentProps<'div'> & {
	title: string
	labelButton: string
	children: ReactNode
}
