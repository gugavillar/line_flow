'use client'
import {
	createContext,
	useState,
	useContext,
	useEffect,
	ReactNode,
	Dispatch,
	SetStateAction,
} from 'react'
import {
	equalTo,
	get,
	onValue,
	orderByChild,
	push,
	query,
	ref,
	set,
	update,
} from 'firebase/database'

import { database } from '@/services/firebase'

export type Codes = {
	number: number
	called_at: string
	finished_at: string | null
	started_at: string | null
	guiche: 1 | 2 | 3
}

export type CodeFromFirebase = Codes & {
	id: string
}

type ContextType = {
	callCode: (
		guiche: Codes['guiche'],
		number: number
	) => Promise<CodeFromFirebase>
	codes: Array<Codes>
	startService: (refUrl: string) => Promise<CodeFromFirebase>
	setCalledCode: Dispatch<SetStateAction<CodeFromFirebase | null>>
	calledCode: CodeFromFirebase | null
}

const CodeContext = createContext<ContextType>({} as ContextType)

const isExistThisNumber = async (number: number) => {
	const codesRef = query(
		ref(database, 'codes'),
		...[orderByChild('number'), equalTo(number)]
	)
	const snapshot = await get(codesRef)

	return snapshot.exists()
}

export function CodesProvider({ children }: { children: ReactNode }) {
	const [codes, setCodes] = useState<Array<Codes>>([])
	const [calledCode, setCalledCode] = useState<CodeFromFirebase | null>(null)

	useEffect(() => {
		const codesRef = ref(database, 'codes')
		onValue(codesRef, (snapshot) => {
			const newCodes: Array<Codes> = []
			snapshot.forEach((childSnapshot) => {
				const childData = childSnapshot.val()
				newCodes.push(childData)
			})
			setCodes(newCodes)
		})
	}, [])

	const callCode = async (guiche: Codes['guiche'], number: number) => {
		let newNumber = number
		const codesRef = ref(database, 'codes')
		const newCode = push(codesRef)

		const calledNumber = await isExistThisNumber(newNumber)

		if (calledNumber) {
			newNumber = newNumber + 1
			return callCode(guiche, newNumber)
		}

		await set(newCode, {
			number: number,
			called_at: new Date().toISOString(),
			guiche: guiche,
		})

		const response = await get(newCode)

		return {
			...response.val(),
			id: response.key,
		}
	}

	const startService = async (refUrl: string) => {
		const newCode = ref(database, `codes/${refUrl}`)

		await update(newCode, {
			started_at: new Date().toISOString(),
		})

		const response = await get(newCode)

		return {
			...response.val(),
			id: response.key,
		}
	}

	return (
		<CodeContext.Provider
			value={{ codes, callCode, startService, calledCode, setCalledCode }}
		>
			{children}
		</CodeContext.Provider>
	)
}

export function useCode() {
	const context = useContext(CodeContext)
	return context
}
