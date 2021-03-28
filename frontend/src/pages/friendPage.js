import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import FriendBubble from '../components/friends/friendBubble';
import Friend from '../components/friends/Friend';
import { withCookies, Cookies } from 'react-cookie';
import './friendPage.css';
import config from './../config';
import Navbar from '../components/Navbar';
import Create from '../components/create';

const exampleIMG = "https://images.ctfassets.net/hrltx12pl8hq/6YSoTmOYPk2VtQ7JSkPuzS/8250a3d54c1a714aa5e57f6a2826509e/shutterstock_1554086789.jpg?fit=fill&w=480&h=270";
const exampleUserId = "605ece9f30695a7a5428dc0c";
const exampleFriendsList = [{ username: 'Mingjia', profilePic: exampleIMG }, { username: 'Josh', profilePic: exampleIMG }, { username: 'Ethan', profilePic: exampleIMG }, { username: 'Braedon', profilePic: exampleIMG }, { username: 'Xuan', profilePic: exampleIMG }];

const FriendPage = (props) => {
    const { cookies } = props;
    const [showPopUp, setShowPopUp] = useState(false);
    const [friendToOpen, setFriendToOpen] = useState("");
    const [friendsList, setFriendsList] = useState([]); //temp for testing

    useEffect(() => {
        (async () => {
            const userId = cookies.get('userId');
            const res = await axios.get(`${config.GET_FRIENDS_URL}/${userId}`);
            setFriendsList(res.data);
        })();
    }
        , []);

    const displayFriends = useMemo(() => friendsList.map(
        (friend) => (
            <FriendBubble username={friend.username} userId={friend._id} profilePic={exampleIMG} setShowPopUp={setShowPopUp} setFriendToOpen={setFriendToOpen} />
        )
    ), [friendsList]);

    return (
        <div>
            <Navbar />
            <div className='displayView'>
                {displayFriends}
                <Create />
            </div>
            {showPopUp ? <Friend user={friendToOpen} setShowPopUp={setShowPopUp} /> : null}
        </div>
    );
}

export default withCookies(FriendPage);
