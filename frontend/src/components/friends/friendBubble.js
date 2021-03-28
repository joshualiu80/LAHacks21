import React from 'react';
import CurvedName from './curvedName';
import './friendBubble.css';

const FriendBubble = ({ username, profilePic, setShowPopUp, setFriendToOpen }) => {

    const openFriend = () => {
        setShowPopUp(true);
        setFriendToOpen(username);
    };

    return (
        <div className="profileCard">
            <div className='bubble' >
                <img src={profilePic} alt={"no img found"} onClick={openFriend}/> 
                {/* replace "no img found" with one of those anon profile pics */}
            </div>
            <p className="name">{username}</p>
            {/* <CurvedName text={username} arc={120} radius={30} className="name"/> */}
            {/* sigh this dont work */}
        </div>
    );
}

export default FriendBubble;