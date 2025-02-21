import { createReducer, on } from "@ngrx/store"
import { decrement, increment, reset } from "./counter.actions";

export interface CounterState {
    count: number
}

export const initialCounterState: CounterState = {
    count: 0
}

export const CounterReducer = createReducer(
    initialCounterState,
    on(increment, (state) => ({ ...state, count: state.count + 1 })), // counter.action.ts increment Action-je
    on(decrement, (state) => ({ ...state, count: state.count - 1 })), // counter.action.ts decrement Action-je
    on(reset, (state) => ({ ...state, count: 0})) // counter.action.ts reset Action-je
);