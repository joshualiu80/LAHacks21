import React, { useState } from 'react'
import SignUp from '../components/SignUp'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);

    const displayPopUp = () => {
        setShowPopUp(true);
    };

    const hidePopUp = () => {
        setShowPopUp(false);
    };

    const submitLogin = (e) => {
        e.preventDefault();
    };

    return (
        <div className="Login">
            <img src="/" alt={"Logo Goes Here"}/>
            <form className="loginForm" onSubmit={submitLogin}>
                <input className="username" type="text" placeholder="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="password" type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                <p>Don't have an account? <span onClick={displayPopUp}>Sign up</span> </p>
            </form>
            {showPopUp ? <SignUp onClose={hidePopUp} /> : null}
        </div>
    );
}

export default Login;