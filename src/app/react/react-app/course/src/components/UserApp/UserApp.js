import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import './App.scss';
import UserDetails from './components/UserDetails';
import axios from 'axios';

export const UserApp = () => {
    let [showForm, setShowForm] = useState(false);
    let [users, setUsers] = useState([]);
    let [isLoading, setLoading] = useState(false);
    let [errorMessage, setErrorMessage] = useState(null);
    let [editMode, setEditMode] = useState(false);
    let [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        onGetUsers();
    }, [])

    function addUserHandler() {
        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
        setEditMode(false);
    }

    const onEditUser = (user) => {
        setEditMode(true);
        setSelectedUser(user);
        setShowForm(true);
    }

    const onCreateUser = (user) => {
        /* fetch('https://react-api-b8dfa-default-rtdb.firebaseio.com/Users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // default típus, csak a példa kedvéért szerepel itt
            },
            body: JSON.stringify(user)
        }).then((resp) => { // a resp-ben érkezik a response a szervertől
            return resp.json(); // JSON-né alakítjuk a válasz body-ját, és továbbadjuk a következő then-nek
        }).then(respData => {
            console.log(respData); // a tényleges visszakapott adat
        }); */

        axios.post('https://react-api-b8dfa-default-rtdb.firebaseio.com/Users.json', user)
            .then((resp) => {
                console.log(resp.data);
                setShowForm(false); // miután megkaptuk a választ, bezárjuk a modal ablakot
                onGetUsers() // POST után frissítjük a listát
            });
    }

    const onGetUsers = () => {
        setErrorMessage(null);
        setLoading(true);

        fetch('https://react-api-b8dfa-default-rtdb.firebaseio.com/Users.json', {
            method: 'GET'
        }).then((response) => { // a callback függvény megkapja a response-t, amikor a Promise feloldódik
            if (!response.ok) {
                throw new Error('Something wrong has just happened'); // manuálisan dobunk hibát, ha a response.ok false
            }
            return response.json(); // visszaadja a response body-ját, mint Promise
        }).then(userData => {
            setUsers(Object.entries(userData).map(([key, user]) => { // object destructuring
                return {
                    id: key,
                    fname: user.firstName,
                    lname: user.lastName,
                    email: user.emailAddress,
                    password: user.Password,
                    country: user.country,
                    city: user.city,
                    dateOfBirth: user.dateOfBirth,
                    gender: user.gender
                }
            }));
            setLoading(false);

            // let forInUsers = []; // ez is egy működő megoldás
            // for (let key in userData) {
            //     forInUsers.push({...userData[key], key});
            // }
        }).catch(error => { // a callback function megkapja az error object-et
            setErrorMessage(error.message);
            setLoading(false);
        });

        /* axios.get('https://react-api-b8dfa-default-rtdb.firebaseio.com/Users.json')
            .then((resp) => {
                return resp.data;
            }).then((userData) => {
                setUsers(Object.entries(userData).map(([key, user]) => { // object destructuring
                    return {
                        id: key,
                        name: user.firstName.concat(' ', user.lastName),
                        // name: user.firstName + ' ' + user.lastName,
                        // name: `${user.firstName} ${user.lastName}`,
                        // name: `${user.firstName ?? ''} ${user.lastName ?? ''}`,
                        email: user.emailAddress,
                        dateOfBirth: user.dateOfBirth,
                        gender: user.gender,
                    }
                }));
                setErrorMessage(null);
                setLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setLoading(false);
            }) */
    }

    const onUpdateUser = (user, id) => {
        /* fetch(`https://react-api-b8dfa-default-rtdb.firebaseio.com/Users/${id}/.xml`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                emailAddress: user.emailAddress,
                Password: user.Password,
                dateOfBirth: user.dateOfBirth,
                city: user.city,
                country: user.country,
                gender: user.gender
            })
        }).then((resp) => { // szándékos hiba esetén (.json --> .xml) nem jutunk el ebbe a blokkba, azonnal a catch ágban találjuk magunkat 'Failed to fetch' hibával
            if (!resp.ok) {
                throw new Error('Failed to update user');
            }
            return resp.json();
        }).then((data) => {
            setShowForm(false);
            onGetUsers() // PUT után frissítjük a listát
        }).catch((error) => {
            setShowForm(false);
            setErrorMessage(error.message);
        }) */

        axios.put(`https://react-api-b8dfa-default-rtdb.firebaseio.com/Users/${id}/.json`, user)
            .then(resp => resp.data)
            .then(userData => {
                console.log(userData);
                onGetUsers() // PUT után frissítjük a listát
            })
            .catch((error) => {
                if (error.response) {
                    // Custom error, ha van válasz
                    throw new Error('Failed to update user', error.response.status);
                } else {
                    // Ha nem volt válasz a szervertől
                    console.error('Network Error', error);
                    setErrorMessage('Network Error');
                }
            })
    }

    const onDeleteUser = (user) => {
        let deleteUserConfirmation = window.confirm(`Do you want to delete ${user.fname.concat(' ', user.lname)}?`);

        if (!deleteUserConfirmation) {
            return;
        }

        /* fetch(`https://react-api-b8dfa-default-rtdb.firebaseio.com/Users/${user.id}/.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw new Error('Failed to delete user');
            }
            return resp.json();
        }).then((data) => {
            onGetUsers() // PUT után frissítjük a listát
        }).catch((error) => {
            setErrorMessage(error.message);
        }); */

        axios.delete(`https://react-api-b8dfa-default-rtdb.firebaseio.com/Users/${user.id}/.json`)
            .then(resp => {
                console.log('User deleted successfully:', resp.data);
                onGetUsers();
            })
            .catch((error) => {
                console.error('Error deleting user:', error.message);
                setErrorMessage(error.message);
            });
    }

    return (
        <div>
            <div className='page-header d-flex justify-content-end'>
                <button className='btn btn-success' onClick={addUserHandler}>Add User</button>
                <button className='btn btn-info' onClick={onGetUsers}>Get Users</button>
            </div>

            {!isLoading && !errorMessage &&
                <UserDetails
                    users={users}
                    onEditUser={onEditUser}
                    onDeleteUser={onDeleteUser}>
                </UserDetails>}
            {errorMessage && <p>ERROR: {errorMessage}</p>}
            {isLoading && <p>Loading...</p>}

            {showForm &&
                <UserForm
                    createUser={onCreateUser}
                    updateUser={onUpdateUser}

                    closeForm={closeForm}
                    editMode={editMode}
                    selectedUser={selectedUser}>
                </UserForm>}
        </div>
    );
}