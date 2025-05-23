import React, { useState, useEffect } from 'react';

let AuthContext = React.createContext( // kezdő értéket adhatunk meg argumentumnak (number, string, boolean, array, object)
    {
        isLoggedIn: false,
        onLogin: undefined,
        onLogout: undefined
    }
);

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => { // függvény is megadható
        const savedStatus = localStorage.getItem('isLoggedIn');
        return savedStatus ? JSON.parse(savedStatus) : false;
    });

    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn)); // az isLoggedIn változása frissíti a localStorage-t
    }, [isLoggedIn]);

    const loginHandler = () => { // event handler function
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        setIsLoggedIn(true);
    }

    const logoutHandler = () => { // event handler function
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }

    return <AuthContext.Provider value={
        {
            isLoggedIn: isLoggedIn,
            onLogin: loginHandler,
            onLogout: logoutHandler,
        }
    }>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;