import './LoginApp.scss';
import Navigation from './Navigation';

const LoginHeader = (props) => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center header">
                <div className='ps-2'><b>Demo login</b></div>
                <Navigation /> {/* kikerült a isLoggedIn={props.isLoggedIn} */}
            </div>
        </>
    )
}

export default LoginHeader;