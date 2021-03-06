import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SignUp from '../components/SignUp';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import './login.css';
import config from './../config';


const Login = (props) => {
    let history = useHistory();

    const { cookies } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const displayPopUp = () => {
        setShowPopUp(true);
    };

    const hidePopUp = () => {
        setShowPopUp(false);
    };

    useEffect(() => {
        localStorage.setItem('loggedIn', loggedIn);
    })
    useEffect(() => {
        if (loggedIn) {
            history.push('/friends');
        }
    }, [loggedIn])

    const submitLogin = async (e) => {
        e.preventDefault();
        const res = await axios.post(config.AUTH_VERIFY_URL, { username: username, password: password });
        if (res.status === 200) {
            setLoggedIn(true);
            localStorage.setItem('loggedIn', true);
            console.log(res);
            cookies.set('userId', res.data._id);
        } else {
            console.log(res);
            // display error message?
        }
    };

    return (
        <div className="Login">
            <div className="logo-header">
                <img src="/images/logo.png" alt="LunaTalks Logo" />
                <h1>LunaTalks</h1>
            </div>
            <form className="loginForm" onSubmit={submitLogin}>
                <input className="username" type="text" placeholder="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="password" type="password" placeholder="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="login-btn">
                    <p>LOGIN</p>
                    <img src="/images/comet.png" />
                </button>
                <p className="signup-link">Don't have an account? <b><span onClick={displayPopUp}>Sign up</span></b></p>
            </form>
            {showPopUp ? <SignUp onClose={hidePopUp} /> : null}
            <img src="/images/sun.png" className="bg-img" id="sun" />
            <img src="/images/earth.png" className="bg-img" id="earth" />
        </div>
    );
}

export default withCookies(Login);