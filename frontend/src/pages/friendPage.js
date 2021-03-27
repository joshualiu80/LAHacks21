import React, { useState } from 'react';
import FriendBubble from '../components/friendBubble';

const FriendPage = () => {
    const [showPopUp, setShowPopUp] = useState(false);

    return (
        <div>
            <FriendBubble username={"Mingjia"} profilePic={"https://images.ctfassets.net/hrltx12pl8hq/6YSoTmOYPk2VtQ7JSkPuzS/8250a3d54c1a714aa5e57f6a2826509e/shutterstock_1554086789.jpg?fit=fill&w=480&h=270"} setShowPopUp={setShowPopUp}/>
            {showPopUp ? <div>Luna</div> : null}
            {/* click image to open friend pop up */}
        </div>
    );
}

export default FriendPage;