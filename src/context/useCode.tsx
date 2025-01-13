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
import { ENDTYPE } from '@/constants/globals'

export type Codes = {
	number: number
	called_at: string
	finished_at: string | null
	started_at: string | null
	guiche: 1 | 2 | 3
	end_type: `${ENDTYPE}`
}

export type CodeFromFirebase = Codes & {
	id: string
}

type ContextType = {
	callCode: (
		guiche: Codes['guiche'],
		number: number
	) => Promise<CodeFromFirebase>
	codes: Array<CodeFromFirebase>
	startService: (refUrl: string) => Promise<CodeFromFirebase>
	setCalledCode: Dispatch<SetStateAction<CodeFromFirebase | null>>
	calledCode: CodeFromFirebase | null
	endService: (refUrl: string, endType: Codes['end_type']) => Promise<void>
	recallCode: (refUrl: string) => Promise<void>
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
	const [codes, setCodes] = useState<Array<CodeFromFirebase>>([])
	const [calledCode, setCalledCode] = useState<CodeFromFirebase | null>(null)

	useEffect(() => {
		const codesRef = ref(database, 'codes')
		onValue(codesRef, (snapshot) => {
			const newCodes: Array<CodeFromFirebase> = []
			snapshot.forEach((childSnapshot) => {
				const childKey = childSnapshot.key
				const childData = { id: childKey, ...childSnapshot.val() }
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

	const endService = async (refUrl: string, endType: Codes['end_type']) => {
		const newCode = ref(database, `codes/${refUrl}`)

		await update(newCode, {
			finished_at: new Date().toISOString(),
			end_type: endType,
		})
	}

	const recallCode = async (refUrl: string) => {
		const newCode = ref(database, `codes/${refUrl}`)

		await update(newCode, {
			called_at: new Date().toISOString(),
		})
	}

	return (
		<CodeContext.Provider
			value={{
				codes,
				callCode,
				startService,
				calledCode,
				setCalledCode,
				endService,
				recallCode,
			}}
		>
			{children}
		</CodeContext.Provider>
	)
}

export function useCode() {
	const context = useContext(CodeContext)
	return context
}
