import { useState, useCallback, useMemo } from "react";
import Span from "./Span";
import DemoButton from "./DemoButton";

const Demo = (props) => {
    let [count, setCount] = useState(0);
    let [activate, setActivate] = useState(false);

    const decrementHandler = useCallback(() => {
        if (activate) {
            setCount((prevCount) => prevCount - 1);
        }
    }, [activate]);

    const incrementHandler = useCallback(() => {
        if (activate) {
            setCount((prevCount) => prevCount + 1);
        }
    }, [activate]);

    const activateHandler = () => {
        setActivate(true);
    };

    let numberArray = useMemo(() => [333, 555], []);

    return (
        <>
            <div className="demo-container">
                <DemoButton clickHandler={decrementHandler}>-</DemoButton>
                <Span>
                    {numberArray}
                </Span>
                <DemoButton clickHandler={incrementHandler}>+</DemoButton>
                <DemoButton clickHandler={activateHandler}>Activate</DemoButton>
            </div>
        </>
    )
}

export default Demo;