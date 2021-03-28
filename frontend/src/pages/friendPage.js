import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import FriendBubble from '../components/friends/friendBubble';
import Friend from '../components/friends/Friend';
import { withCookies, Cookies } from 'react-cookie';
import './friendPage.css';

const exampleIMG = "https://images.ctfassets.net/hrltx12pl8hq/6YSoTmOYPk2VtQ7JSkPuzS/8250a3d54c1a714aa5e57f6a2826509e/shutterstock_1554086789.jpg?fit=fill&w=480&h=270";
const exampleUserId = "605ece9f30695a7a5428dc0c";
const exampleFriendsList = [{username: 'Mingjia', profilePic: exampleIMG}, {username: 'Josh', profilePic: exampleIMG}, {username: 'Ethan', profilePic: exampleIMG}, {username: 'Braedon', profilePic: exampleIMG}, {username: 'Xuan', profilePic: exampleIMG}];

const FriendPage = (props) => {
    const { cookies } = props;
    const userId = cookies.get('userId');
    const [showPopUp, setShowPopUp] = useState(false);
    const [friendToOpen, setFriendToOpen] = useState("");
    const [friendsList, setFriendsList] = useState([]);
    const [friendsMap, setFriendsMap] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`http://localhost:3000/users/getFriends/${userId}`);
            setFriendsList(res.data);
        })();

    }, []); 

    let snippetMap = new Map();

    useEffect(() => {
        (async () => {
            let snippetList = await axios.get(`http://localhost:3000/snippets/users/${userId}`);
            console.log('snippetList:', snippetList);
            snippetList.data.map((snippet => {
                let currFriendSnipList = snippetMap.get(snippet.creator);
                console.log('currFriendSnipList:', currFriendSnipList);
                if (currFriendSnipList === undefined) {
                    currFriendSnipList = [];
                }
                currFriendSnipList.push(snippet);
                snippetMap.set(snippet.creator, currFriendSnipList);
                return snippet;
            }));
            console.log('snippetMap:', snippetMap);
            setFriendsMap(snippetMap);
        })();

    }, []);

    const displayFriends = useMemo(() => friendsList.map(
        (friend) => (
            <FriendBubble username={friend.username} userId={friend._id} profilePic={exampleIMG} setShowPopUp={setShowPopUp} setFriendToOpen={setFriendToOpen} />
        )
    ), [friendsList]);

    return (
        <div>
            <div className='displayView'>
                {displayFriends}
            </div>
            {showPopUp ? <Friend user={friendToOpen} setShowPopUp={setShowPopUp} friendsMap={friendsMap}/> : null}
        </div>
    );
}

export default withCookies(FriendPage);
