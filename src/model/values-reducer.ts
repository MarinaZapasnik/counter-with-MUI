import { ChangeEvent } from "react";
import { ValuesProps } from "../components/Counter/Counter";



export type GetValuesActionType = {
    type: 'get_values',
    payload: {
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: 'minValue' | 'maxValue' | 'stepValue'
    }
}


export const valuesReducer = (values: ValuesProps, action: GetValuesActionType ): ValuesProps => {
    switch (action.type) {
        case 'get_values':
            return {...values, [action.payload.value]: Number(action.payload.event.target.value)}
    
    default:
        return values
}
}


export const GetValuesAC = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: 'minValue' | 'maxValue' | 'stepValue'
    ) => ({
    type: 'get_values',
    payload: {
        event,
        value
    }
} as const)