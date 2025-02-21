import React, { useImperativeHandle, useRef } from 'react';
import styles from './Input.module.scss'

const Input = React.forwardRef((props, ref) => {
    return (
        <>
            <div className={`input-group mb-3 ${styles.input_container}`}>
                <span className="input-group-text" id="basic-addon1">{props.label}</span>
                <input
                    ref={ref}
                    id={props.id}
                    type={props.type}
                    className='form-control'
                    style={{
                        borderColor: props.emailState.isValid === false ? 'red' : '',
                        backgroundColor: props.emailState.isValid === false ? 'rgb(190, 170, 170)' : '',
                    }}
                    value={props.value}
                    onChange={(e) => props.onChangeHandler(e.target.value)}
                    onBlur={props.onBlurHandler}>
                </input>
            </div>
        </>
    )
}
)

export default Input;