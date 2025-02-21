import { useRef, useState } from 'react';

const RefsDemo = () => {
    let [inputValue, updateInputValue] = useState('');
    let nameInputRef = useRef();

    const showNameEventHandler = () => {
        updateInputValue(nameInputRef.current.value);
    }

    return (
        <>
            <span>Name: </span>
            <input type="text" ref={nameInputRef}></input>
            <button className="btn btn-secondary" onClick={showNameEventHandler}>Show name</button>
            Current input value: {inputValue}
        </>
    )
}

export default RefsDemo;