import './ReducerApp.scss';
import { useReducer } from 'react';

const reducer = (currentState, action) => {
    console.log(currentState, action);
    switch (action.type) {
        case '-': {
            return { ...currentState, count: currentState.count - 1 };
            // return {...currentState, count: --currentState.count}; // közvetlen változtatja az aktuális értéket, ami tilos
        }
        case '+': {
            return { ...currentState, count: currentState.count + 1 };
        }
        default: {
            return currentState;
        }
    }
}

const ReducerApp = (props) => {
    let [state, dispatcher] = useReducer(reducer, { count: 0 });

    const decrementHandler = () => {
        dispatcher({ type: '-' });
    }

    const incrementHandler = () => {
        dispatcher({ type: '+' });
    }

    return (
        <>
            <div className="reducer-container">
                <button onClick={decrementHandler}>-</button>
                <span>{state.count}</span>
                <button onClick={incrementHandler}>+</button>
            </div>
        </>
    )
}

export default ReducerApp;