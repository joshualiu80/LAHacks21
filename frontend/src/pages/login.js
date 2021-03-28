import React, { useState, useEffect } from 'react';
import SignUp from '../components/login/SignUp';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') || false);

    const displayPopUp = () => {
        setShowPopUp(true);
    };

    const hidePopUp = () => {
        setShowPopUp(false);
    };

    useEffect(() => {
        localStorage.setItem('loggedIn', loggedIn);
    })

    const submitLogin = async (e) => {
        const res = await axios.get("http://localhost:3000/auth/verify", { username: username, password: password });
        if (res.status === 200) {
            setLoggedIn(true);
            localStorage.setItem('loggedIn', true);
        } else {
            console.log(res);
            // display error message?
        }
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
            {loggedIn ? <div>Logged In</div> : <div>not logged in</div> } 
            {/* this should redirect to either feed or friends list */}
        </div>
    );
}

export default Login;