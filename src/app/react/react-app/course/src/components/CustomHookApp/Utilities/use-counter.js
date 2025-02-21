import { useState, useEffect } from "react";

function useCounter(direction = true) {
    let [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => { // a setInterval minden másodpercben egyel növeli a counter értékét
            setCounter(prevValue => prevValue + (direction ? 1 : -1));
        }, 1000);
        return () => clearInterval(interval);
    }, []) // üres dependencia tömb, tehát a useEffect csak egyszer fog lefutni

    return counter;
}

export default useCounter;