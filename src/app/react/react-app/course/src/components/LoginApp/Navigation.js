import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const Navigation = (props) => {
    let context = useContext(AuthContext); // objektumot ad vissza ( <AuthContext.Provider value={{ isLoggedIn: isLoggedIn }}> )

    return (
        <>
            {
                context.isLoggedIn && // props.isLoggedIn helyett
                <div className="buttons">

                    <button className="btn btn-sm btn-info">Users</button>
                    <button className="btn btn-sm btn-info">Admin</button>
                    <button className="btn btn-sm btn-primary" onClick={context.onLogout}>Logout</button>
                </div>
            }
        </>
    )
}

export default Navigation;