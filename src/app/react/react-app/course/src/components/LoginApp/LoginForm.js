import { useEffect, useState, useReducer, useContext, useRef } from "react";
import AuthContext from "../Context/AuthContext";
import Input from "./Input";

const emailReducer = (currentState, action) => { // azért a komponens függvényen kívülre kerül, mert
    switch (action.type) {
        case 'EMAIL_INPUT':
            return { value: action.value, isValid: undefined };
        case 'EMAIL_VALID':
            // return { value: state.value, isValid: state.value.includes('@') }; // így is jó
            return { value: action.value, isValid: action.value.includes('@') }; // azért érzékel a useEffect változást, mert így új referenciát adunk vissza
        default:
            return currentState;
    }
}

const passwordReducer = (currentState, action) => { // azért a komponens függvényen kívülre kerül, mert
    switch (action.type) {
        case 'PASSWORD_INPUT':
            return { value: action.value, isValid: undefined };
        case 'PASSWORD_VALID':
            // return { value: state.value, isValid: state.value.trim().length > 6 }; // így is jó
            return { value: action.value, isValid: action.value.trim().length > 6 };; // azért érzékel a useEffect változást, mert így új referenciát adunk vissza
        default:
            return currentState;
    }
}

const LoginForm = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState(); // nem adunk kezdeti értéket, hogy az email input mező-re ne kerüljön rá a conditional style
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState(); // nem adunk kezdeti értéket, hogy a password input mező-re ne kerüljön rá a conditional style
    const [formIsValid, setFormIsValid] = useState(false);

    let [emailState, emailDispatcher] = useReducer(emailReducer, { value: '', isValid: null }); // null hatására az első betöltésnél nem lesz invalid az input mező
    let [passwordState, passwordDispatcher] = useReducer(passwordReducer, { value: '', isValid: null }); // null hatására az első betöltésnél nem lesz invalid az input mező

    let authCtx = useContext(AuthContext);

    let emailRef = useRef();
    let pwdRef = useRef();

    const emailChangeHandler = (value) => {
        // setEnteredEmail(value);
        emailDispatcher({ value: value, type: 'EMAIL_INPUT' });
    }

    const validateEmailHandler = () => {
        // setEmailIsValid(!!emailState.value.includes('@'));
        emailDispatcher({ value: emailState.value, type: 'EMAIL_VALID' })
    }

    const passwordChangeHandler = (value) => {
        // setEnteredPassword(value);
        passwordDispatcher({ value: value, type: 'PASSWORD_INPUT' });
    }

    const validatePasswordHandler = () => {
        // setPasswordIsValid(enteredPassword.trim().length > 6);
        passwordDispatcher({ value: passwordState.value, type: 'PASSWORD_VALID' });
    }

    const onLogin = (event) => {
        event.preventDefault();
        if (formIsValid) {
            authCtx.onLogin(emailState.value, passwordState.value);
        } else if (!emailState.isValid) {
            emailRef.current.focus();
            // emailRef.current.onFocus(); // a custom Input komponens useImperativeHandle függvényének második paraméterénél található onFocus kulcs alatt található függvény hívódik meg
        } else { // if (!passwordState.isValid) {
            pwdRef.current.focus();
        }
    }

    useEffect(() => {
        let timerValue = setTimeout(() => {
            setFormIsValid(
                //emailIsValid && passwordIsValid
                // emailState.isValid && passwordState.isValid // ebben az esetben csak a blur esemény után válik valid-dá a form
                emailState.value.includes('@') && passwordState.value.trim().length > 6
            );
        }, 1000);

        return () => {
            clearTimeout(timerValue);
        }
        // }, [enteredEmail, enteredPassword]);
        // }, [emailState, passwordState]); // mindkét state { value: *string* , isValid: *boolean* } objektum
    }, [emailState.isValid, passwordState.isValid]); // csak akkor fut le a useEffect callback függvénye, ha valamelyik isValid érték megváltozik

    return (
        <>
            <form className="mt-3" onSubmit={(e) => onLogin(e)}>
                <Input
                    ref={emailRef}
                    id={'email'}
                    type={'email'}
                    label={'Username'}
                    emailState={emailState}
                    value={emailState.value}
                    isValid={emailState.isValid}
                    onChangeHandler={emailChangeHandler}
                    onBlurHandler={validateEmailHandler}
                />
                {/*<div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Username</span>
                    <input
                        id="email"
                        type="email"
                        ref={emailRef}
                        className="form-control"
                        style={{
                            borderColor: emailState.isValid === false ? 'red' : '',
                            backgroundColor: emailState.isValid === false ? 'rgb(190, 170, 170)' : '',
                        }}
                        value={emailState.value}
                        onChange={(e) => emailChangeHandler(e.target.value)}
                        onBlur={validateEmailHandler}>
                    </input>
                </div>*/}

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Password</span>
                    <input
                        id="password"
                        type="password"
                        ref={pwdRef}
                        className="form-control"
                        style={{
                            borderColor: passwordState.isValid === false ? 'red' : '',
                            backgroundColor: passwordState.isValid === false ? 'rgb(190, 170, 170)' : '',
                        }}
                        value={passwordState.value}
                        onChange={(e) => passwordChangeHandler(e.target.value)}
                        onBlur={validatePasswordHandler}>
                    </input>
                </div>

                <div className="d-flex justify-content-center">
                    {/*<button type="submit" className={`btn ${formIsValid ? 'btn-success' : 'btn-secondary'}`} disabled={!formIsValid}>Login</button>*/}
                    <button type="submit" className={`btn ${formIsValid ? 'btn-success' : 'btn-secondary'}`}>Login</button>
                </div>
            </form>
        </>
    )
}

export default LoginForm;