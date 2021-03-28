import React from 'react';
import './friendBubble.css';

const FriendBubble = ({ username, userId, profilePic, setShowPopUp, setFriendToOpen }) => {

    const openFriend = () => {
        setShowPopUp(true);
        setFriendToOpen(userId);
    };

    const getRandomInt = (max, min) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    return (
        <div className="profileCard" style={{flexBasis: getRandomInt(5,1), flexGrow: getRandomInt(3,1), margin: getRandomInt(200,50)}}>
            <div className='bubble' >
                <img src={profilePic} alt={"no img found"} onClick={openFriend}/> 
                {/* replace "no img found" with one of those anon profile pics */}
            </div>
            <p className="name">{username}</p>
        </div>
    );
}

export default FriendBubble;