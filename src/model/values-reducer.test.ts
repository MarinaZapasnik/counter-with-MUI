import { ChangeEvent } from "react";
import { ValuesProps } from "../components/Counter/Counter";
import { valuesReducer } from "./values-reducer";
import { test, expect } from 'vitest';





    test('should update minValue correctly', () => {
        const initialState: ValuesProps = { minValue: 0, maxValue: 10, stepValue: 1 };
        const mockEvent = { target: { value: '5' } } as ChangeEvent<HTMLInputElement>;
        
        const newState = valuesReducer(initialState, {
        type: 'get_values',
        payload: { event: mockEvent, value: 'minValue' }
        });

        expect(newState.minValue).toBe(5);
        expect(newState.maxValue).toBe(10);
    });

    test('should update maxValue correctly', () => {
        const initialState: ValuesProps = { minValue: 0, maxValue: 10, stepValue: 1 };
        const mockEvent = { target: { value: '20' } } as ChangeEvent<HTMLInputElement>;
        
        const newState = valuesReducer(initialState, {
        type: 'get_values',
        payload: { event: mockEvent, value: 'maxValue' }
        });

        expect(newState.maxValue).toBe(20);
        expect(newState.minValue).toBe(0);
    });
