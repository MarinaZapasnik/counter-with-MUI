import { combineReducers, configureStore } from "@reduxjs/toolkit";


// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
    
});

// создание store
export const store = configureStore({
    reducer: rootReducer,
});

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch;

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store;
