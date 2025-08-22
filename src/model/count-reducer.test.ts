import { test, expect } from 'vitest';
import { countReducer, IncrementAC, ResetAС, SetCountAC, SetSettingsAC } from './count-reducer';

    test('should handle set_count action', () => {
        const newState = countReducer(null, SetCountAC(5));
        expect(newState).toBe(5);
    });

    test('should handle increment action', () => {
        const newState = countReducer(5, IncrementAC(6));
        expect(newState).toBe(6);
    });

    test('should handle reset action', () => {
        const newState = countReducer(10, ResetAС(0));
        expect(newState).toBe(0);
    });

    test('should handle set-settings action', () => {
        const newState = countReducer(10, SetSettingsAC());
        expect(newState).toBe(null);
    });

    test('should return current state for unknown action', () => {
        const newState = countReducer(5, { type: 'unknown' } as any);
        expect(newState).toBe(5);
    });
