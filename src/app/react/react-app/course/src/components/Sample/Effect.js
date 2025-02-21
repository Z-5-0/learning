import { useState, useEffect } from "react";


const Effect = (props) => {
    let [selectedButton, updateSelectedButton] = useState('HOME')

    const buttons = ['HOME', 'ABOUT', 'CONTACT'];

    /* const onButtonClick = (text) => {
        updateSelectedButton(text);
    } */

    useEffect(() => (
        console.log(selectedButton)
    ), [selectedButton])

    return (
        <>
            {
                buttons.map(b => {
                    return (
                        <button key={b} onClick={() => { updateSelectedButton(b) }}>{b}</button>
                        /* <button value={b} onClick={(e) => { onButtonClick(e.target.value) }}>{b}</button> */ // eredmény szempontjából ugyanaz, csak szükséges egy frissítő fgv
                    )
                })
            }
            <h5>{selectedButton}</h5>
        </>
    )
}

export default Effect;