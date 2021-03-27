import React, { useState } from 'react'
import SignUp from '../components/SignUp'
import Friend from '../components/Friend'

const Login = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="Login">
            <img src="/" alt={"Logo Goes Here"}/>
            <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
                <input className="firstname" type="text" placeholder="First Name" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                <input className="lastname" type="text" placeholder="Last Name" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                <input className="username" type="text" placeholder="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="password" type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <Friend />
        </div>
    );
}

export default Login;