import React, { useState } from 'react'
import SignUp from '../components/SignUp'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signUp = () => {
        return (
            <div>:)</div>
        );
    }

    const submitLogin = (e) => {
        e.preventDefault();
    }

    return (
        <div className="Login">
            <img src="/" alt={"Logo Goes Here"}/>
            <form className="loginForm" onSubmit={submitLogin}>
                <input className="username" type="text" placeholder="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="password" type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                <p>Don't have an account? <span onClick={signUp}>Sign up</span> </p>
            </form>
            <SignUp />
        </div>
    );
}

export default Login;