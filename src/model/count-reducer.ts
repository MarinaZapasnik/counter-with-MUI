import { ChangeEvent } from "react"

export type GetValuesActionType = {
    type: 'get_values',
    payload: {
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: 'minValue' | 'maxValue' | 'stepValue'
    }
}

export type setCountActionType = ReturnType<typeof SetCountAC>

export type incrementActionType = ReturnType<typeof IncrementAC>

export type resetActionType = ReturnType<typeof ResetAС>

export type setSettingsActionType = ReturnType<typeof SetSettingsAC>

type ActionType = 
    GetValuesActionType |
    setCountActionType |
    incrementActionType |
    resetActionType |
    setSettingsActionType

export const countReducer = (count: number | null, action: ActionType): number | null => {
    switch (action.type) {
        case 'get_values' :
            return null
        case 'set_count' :
            return action.payload.minValue
        case 'increment' :
            return action.payload.newCount
        case "reset":
            return action.payload.minValue
        case "set-settings":
            return null
        
    
    default: 
        return count
} }

export const GetValuesAC = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: 'minValue' | 'maxValue' | 'stepValue'
): GetValuesActionType => ({
type: 'get_values',
payload: {
    event,
    value
}
} as const)

export const SetCountAC = (minValue: number) => ({
    type: 'set_count',
    payload: {
        minValue
}
} as const)

export const IncrementAC = (newCount: number) => ({
    type : 'increment',
    payload: {
        newCount
    }
} as const )

export const ResetAС = (minValue: number) => ({
    type : 'reset',
    payload: {
        minValue
    }
} as const )

export const SetSettingsAC = () => ( {
    type : 'set-settings'
} as const )