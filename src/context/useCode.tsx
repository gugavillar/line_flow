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
import { ENDTYPE, MODAL_ID } from '@/constants/globals'
import { format } from 'date-fns'

export type Codes = {
	number: number
	called_at: string
	finished_at?: string | null
	started_at?: string | null
	guiche: 1 | 2 | 3
	end_type?: `${ENDTYPE}`
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
	handleSaveGuicheNumber: (guicheNumber: number) => void
	guicheNumber: number | null
	startedCode: string
	handleSaveInitialCodeNumber: (number: string) => void
}

const CodeContext = createContext<ContextType>({} as ContextType)

const isExistThisNumber = async (number: number, today: string) => {
	const codesRef = query(
		ref(database, `codes/${today}`),
		...[orderByChild('number'), equalTo(number)]
	)
	const snapshot = await get(codesRef)

	return snapshot.exists()
}

export function CodesProvider({ children }: { children: ReactNode }) {
	const [codes, setCodes] = useState<Array<CodeFromFirebase>>([])
	const [guicheNumber, setGuicheNumber] = useState<number | null>(null)
	const [calledCode, setCalledCode] = useState<CodeFromFirebase | null>(null)
	const [startedCode, setStartedCode] = useState<string>('')

	const today = format(new Date(), 'dd-MM-yyyy')

	useEffect(() => {
		const codesRef = ref(database, `codes/${today}`)
		onValue(codesRef, (snapshot) => {
			const newCodes: Array<CodeFromFirebase> = []
			snapshot.forEach((childSnapshot) => {
				const childKey = childSnapshot.key
				const childData = { id: childKey, ...childSnapshot.val() }
				newCodes.push(childData)
			})
			setCodes(newCodes)
		})
	}, [today])

	const callCode = async (guiche: Codes['guiche'], number: number) => {
		let newNumber = number
		const codesRef = ref(database, `codes/${today}`)
		const newCode = push(codesRef)

		const calledNumber = await isExistThisNumber(newNumber, today)

		if (calledNumber) {
			newNumber = newNumber + 1
			if (startedCode) {
				setStartedCode('')
			}
			return callCode(guiche, newNumber)
		}

		const codeData = {
			number: number,
			called_at: new Date().toISOString(),
			guiche: guiche,
		}

		await set(newCode, codeData)

		return {
			...codeData,
			id: newCode.key as string,
		}
	}

	const startService = async (refUrl: string) => {
		const newCode = ref(database, `codes/${today}/${refUrl}`)

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
		const newCode = ref(database, `codes/${today}/${refUrl}`)

		await update(newCode, {
			finished_at: new Date().toISOString(),
			end_type: endType,
		})
	}

	const recallCode = async (refUrl: string) => {
		const newCode = ref(database, `codes/${today}/${refUrl}`)

		await update(newCode, {
			called_at: new Date().toISOString(),
		})
	}

	useEffect(() => {
		const loadModal = async () => {
			if (guicheNumber) return

			const guicheNumberFromLocalStorage = localStorage.getItem('guiche')

			if (guicheNumberFromLocalStorage) {
				return setGuicheNumber(Number(guicheNumberFromLocalStorage))
			}

			const overlay = await import('preline/preline')
			overlay.HSOverlay.open(`#${MODAL_ID.GUICHE_MODAL}`)
		}

		loadModal()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleSaveGuicheNumber = (guicheNumber: number) => {
		localStorage.setItem('guiche', String(guicheNumber))
		setGuicheNumber(guicheNumber)
	}

	const handleSaveInitialCodeNumber = (number: string) => setStartedCode(number)

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
				handleSaveGuicheNumber,
				guicheNumber,
				handleSaveInitialCodeNumber,
				startedCode,
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
