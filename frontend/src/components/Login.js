import * as React from "react"
import "./LoginPopup.css"
import GoogleButton from 'react-google-button'
import { useAuth } from "../context/Authentication.js";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

export function LoginButton() {
    const [pop, Setpop] = React.useState(false)
    return (
        <React.Fragment>
            <button onClick={() => Setpop(true)}>Login</button>
            <LoginPopup trigger={pop} setTrigger={Setpop} />
        </React.Fragment>
    )
}

function LoginPopup(props) {
    const navigate = useNavigate();
    const { signInWithGoogle } = useAuth()
    const [error, setError] = React.useState("")
    let { currentUser } = useAuth();

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithGoogle();
            navigate("/");
            //automatic navigate to home
        } catch (err) {
            setError(err.message)
        }
        //calls the signin function, but will throw an error if an error during login
    }
    console.log(currentUser)


    return (props.trigger) ?
        (<div className="popup">
            <div className="pop-inside">
                <button className="exit" onClick={() => props.setTrigger(false)}>
                    close
                </button>
                <React.Fragment>
                    {error && <Alert variant="danger"> {error} </Alert>}
                    <GoogleButton onClick={handleGoogleSignIn} style={{ color: "#FFFFFF", }}>Login</GoogleButton>
                </React.Fragment>
            </div>
        </div>)
        : "";

}

export default LoginPopup