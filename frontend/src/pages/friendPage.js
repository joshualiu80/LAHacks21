import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import FriendBubble from '../components/friends/friendBubble';
import Friend from '../components/friends/Friend';
import './friendPage.css';

const exampleIMG = "https://images.ctfassets.net/hrltx12pl8hq/6YSoTmOYPk2VtQ7JSkPuzS/8250a3d54c1a714aa5e57f6a2826509e/shutterstock_1554086789.jpg?fit=fill&w=480&h=270";

const FriendPage = () => {
    const [showPopUp, setShowPopUp] = useState(false);
    const [friendToOpen, setFriendToOpen] = useState("");
    const [friendsList, setFriendsList] = useState([{username: 'Mingjia', profilePic: exampleIMG}, {username: 'Josh', profilePic: exampleIMG}]); //temp for testing

    // useEffect(() => {
    //     const res = axios.get('this is where the route goes, probably include userId from cookies');
    //     setFriendsList(res);
    // }
    // , []);

    const displayFriends = useMemo(() => friendsList.map(
        (friend) => (
            <FriendBubble username={friend.username} profilePic={friend.profilePic} setShowPopUp={setShowPopUp} setFriendToOpen={setFriendToOpen} />
        )
    ), [friendsList]);

    return (
        <div>
            {displayFriends}
            {showPopUp ? <Friend user={friendToOpen} /> : null}
        </div>
    );
}

export default FriendPage;