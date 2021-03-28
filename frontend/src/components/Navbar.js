import React, { useState } from 'react';
import './Navbar.css';
import axios from 'axios';
import config from '../config';
import { withCookies, Cookies } from 'react-cookie';
import logo from '../images/logo.png'

const exampleIMG = "https://images.ctfassets.net/hrltx12pl8hq/6YSoTmOYPk2VtQ7JSkPuzS/8250a3d54c1a714aa5e57f6a2826509e/shutterstock_1554086789.jpg?fit=fill&w=480&h=270";

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { profileImg: `${config.GET_PROFILE_IMAGE_URL}/${this.props.cookies.get('userId')}` };
		console.log(this.props.cookies.get('userId'), this.state.profileImg)

		// axios.get(url)
		// 	.then(res => new Blob([res.data], { type: 'application/jpeg' }))
		// 	.then(blob => {
		// 		this.state = { profileImg: URL.createObjectURL(blob) };
		// 		console.log(this.state.profileImg);
		// 	}).catch(err => console.log(err));
	}

	render() {
		return (
			<div id='navbar' >
				<a href='/' id='luna-talks-logo'>
					<img src={logo} alt='LunaTalks Logo' />
					<p>TalkLuna</p>
				</a>
				<ul>
					<li><a href='/feed'>Community</a></li>
					<li><a href='/friends'>Friends</a></li>
					<li><a href='/profile'>
						<img src={this.state.profileImg} alt='Profile Image' id='profile-image' />
					</a></li>
				</ul>
			</div>
		);
	}
}

export default withCookies(Navbar);