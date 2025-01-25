import { ComponentProps } from 'react'

export type ModalProps = ComponentProps<'div'> & {
	title: string
}
