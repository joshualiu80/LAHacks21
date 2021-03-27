import React from 'react';

const FriendBubble = ({ username, profilePic, setShowPopUp }) => {

    const openFriend = () => {
        setShowPopUp(true);
    };

    return (
        <div>
            <img src={profilePic} alt={"no img found"} onClick={openFriend}/> 
            {/* replace "no img found" with one of those anon profile pics */}
            <h1>{username}</h1>
        </div>
    );
}

export default FriendBubble;