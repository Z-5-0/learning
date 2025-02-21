import { useContext } from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import Home from "./Home";
import AuthContext from "../Context/AuthContext";

const LoginApp = (props) => {
    /* const [isLoggedIn, updateLoginStatus] = useState(() => { // függvény is megadható
        const savedStatus = localStorage.getItem('isLoggedIn');
        return savedStatus ? JSON.parse(savedStatus) : false;
    });

    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn)); // az isLoggedIn változása frissíti a localStorage-t
    }, [isLoggedIn]);

    const onLogin = (email, password) => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        updateLoginStatus(true);
    }

    const onLogout = () => {
        updateLoginStatus(false);
    } */

    let authCtx = useContext(AuthContext);

    return (
        <>
            <LoginHeader /> {/* az isLoggedIn attribútummal való átadására nincs már szükség isLoggedIn={isLoggedIn} */}
            {!authCtx.isLoggedIn && <LoginForm />}
            {authCtx.isLoggedIn && <Home />}
        </>
    )
}

export default LoginApp;