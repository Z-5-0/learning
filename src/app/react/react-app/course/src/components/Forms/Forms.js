import { useState, useRef } from 'react'
import style from './Forms.module.scss'

export const Forms = () => {
    let [firstName, setFirstName] = useState('');
    let [firstNameIsValid, setFirstNameIsValid] = useState(true);

    let firstNameRef = useRef();

    const onFirstNameChange = (event) => {
        setFirstName(event.target.value); // a mező aktuális tartalma billentyűleütés után a event.target.value
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        if (firstName.trim() === '') { // üres keresztnév mező esetében visszatérünk a függvényből
            setFirstNameIsValid(false);
            return;
        }

        setFirstNameIsValid(true);

        setFirstName('');

        // console.log(firstName);
        // console.log(firstNameRef.current.value);
        // firstNameRef.current.value = '';
    }

    return <>
        <div className={`${style.user_form}`}>
            <h3>User form</h3>
            <div >
                <form onSubmit={(event) => onFormSubmit(event)}>
                    <div>
                        <input type="text" placeholder="First name" onChange={onFirstNameChange} ref={firstNameRef} value={firstName} />
                        {!firstNameIsValid && <div><p>First name is required</p></div>}
                        <input type="text" placeholder="Last name" />
                    </div>
                    <div>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Confirm Password" />
                    </div>
                    <div>
                        <select name="country" >
                            <option value="Germany">Germany</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                        </select>
                        <select name="city" >
                            <option value="Berlin">Berlin</option>
                            <option value="New York">New York</option>
                            <option value="London">London</option>
                        </select>
                    </div>
                    <div>
                        <input type="date" placeholder="Date of Birth" />
                        <select name="gender" >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-secondary'>Submit user form</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}