import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const SelectCounterState = (state: AppState) => state.counter;

export const SelectCount = createSelector(
    SelectCounterState, 
    (state) => state.count // projektáló függvény
)