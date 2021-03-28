import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import config from './../config';

const SignUp = ({ onClose }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);

  const signup = async (e) => {
    console.log(profile);
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('fname', firstname);
    data.append('lname', lastname);
    if (profile)
      data.append('file', profile, profile.name);
    const res = await axios.post(config.USERS_URL, data);
    console.log(res);
    e.preventDefault();
    onClose();
    // validation? if username already exists or if name is already in db
    // make POST req with newUser
    // reset form? or display confirmation message
    // function that closes component (probably passed in as props)
  }

  return (
    <>
      <div className="overlay" />
      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
        <span onClick={onClose}>X</span>
        <div>
          <input type="text" placeholder="First Name" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} style={{ marginRight: "25px" }} />
          <input type="text" placeholder="Last Name" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        </div>
        <input type="text" placeholder="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div id="profile-upload-field">
          <p>Profile Pic:</p>
          <input type="file" name="file" onChange={(e) => setProfile(e.target.files[0])} />
        </div>
        <button type="submit" className="signup-btn" onClick={signup}>SIGN UP</button>
      </form>
    </>
  )
}

export default SignUp
