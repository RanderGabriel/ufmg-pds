import { reactive, provide, inject } from 'vue';

export interface IGlobalState {
    isAuthenticated: boolean;
}

export const stateSymbol = Symbol('global');
export const createState = () => reactive({
    isAuthenticated: false,
});

export const useState = () => inject(stateSymbol) as IGlobalState;
export const provideState = () => provide(
    stateSymbol, 
    createState(),
);