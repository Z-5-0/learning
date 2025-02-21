import React, { useRef } from 'react';
import './UserForm.scss';

function UserForm(props) {
    let formRefs = useRef({
        fname: null,
        lname: null,
        email: null,
        password: null,
        country: null,
        city: null,
        date: null,
        gender: null,
    });

    const onFormSubmit = (event) => {
        event.preventDefault();
        let user = {
            firstName: formRefs.current.fname.value,
            lastName: formRefs.current.lname.value,
            emailAddress: formRefs.current.email.value,
            Password: formRefs.current.password.value,
            country: formRefs.current.country.value,
            city: formRefs.current.city.value,
            dateOfBirth: formRefs.current.date.value,
            gender: formRefs.current.gender.value,
        }

        props.editMode ? props.updateUser(user, props.selectedUser.id) : props.createUser(user);
    }

    return <>
        <div id="myModal" className="modal">
            <div className="modal-content">
                <div className="close" onClick={props.closeForm}>&times;</div>
                <h3>{props.editMode ? 'Edit user' : 'Create new user'}</h3>
                <div className="user-form">
                    <form onSubmit={(event) => onFormSubmit(event)}>
                        <div>
                            <input type="text" placeholder="First name" ref={(el) => (formRefs.current.fname = el)}
                                defaultValue={props.editMode ? props.selectedUser.fname : ''} />
                            <input type="text" placeholder="Last name" ref={(el) => (formRefs.current.lname = el)}
                                defaultValue={props.editMode ? props.selectedUser.lname : ''} />
                        </div>
                        <div>
                            <input type="email" placeholder="Email" ref={(el) => (formRefs.current.email = el)}
                                defaultValue={props.editMode ? props.selectedUser.email : ''} />
                        </div>
                        <div>
                            <input type="password" placeholder="Password" ref={(el) => (formRefs.current.password = el)}
                                defaultValue={props.editMode ? props.selectedUser.password : ''} />
                            <input type="password" placeholder="Confirm Password"
                                defaultValue={props.editMode ? props.selectedUser.password : ''} />
                        </div>
                        <div>
                            <select name="country" ref={(el) => (formRefs.current.country = el)}
                                defaultValue={props.editMode ? props.selectedUser.country : ''}>
                                <option value="Germany">Germany</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                            </select>
                            <select name="city" ref={(el) => (formRefs.current.city = el)}
                                defaultValue={props.editMode ? props.selectedUser.city : ''}>
                                <option value="Berlin">Berlin</option>
                                <option value="New York">New York</option>
                                <option value="London">London</option>
                            </select>
                        </div>
                        <div>
                            <input type="date" placeholder="Date of Birth" ref={(el) => (formRefs.current.date = el)}
                                defaultValue={props.editMode ? props.selectedUser.dateOfBirth : ''} />
                            <select name="gender" ref={(el) => (formRefs.current.gender = el)}
                                defaultValue={props.editMode ? props.selectedUser.gender : ''}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Unknown">Unknown</option>
                            </select>
                        </div>
                        <button className='add-user-button'>{props.editMode ? 'Update user' : 'Create user'}</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default UserForm;