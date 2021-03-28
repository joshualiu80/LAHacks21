import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Friend.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faClock, faEdit, faWindowClose } from '@fortawesome/free-regular-svg-icons'
import Schedule from './schedule.js'
import AudioPlayer from '../AudioPlayer';

const Friend = ({ user, setShowPopUp }) => {
  const [currUser, setCurrUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const openTab = (e, tab) => {
    const content = document.getElementsByClassName('tabcontent');
    const tabs = document.getElementsByClassName('tablinks');
    // make all content display none
    for (let i = 0; i < content.length; i++) {
      content[i].classList.add('hidden');
    }
    // make all tablinks not active
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active-tab');
    }
    // show tab/content you want
    document.getElementById(tab).classList.remove('hidden');
    e.currentTarget.classList.add('active-tab');
  }

  useEffect(() => { (async () => {
      const res = await axios.get(`http://localhost:3000/users/${user}`);
      setCurrUser(res.data);
      setIsLoading(false);
  })();

  }, []);

  if (currUser) console.log(currUser.snippetsSent);

  const friendInfo = () => {return (
    <div className="friend-info">
      <div style={{ width: "50px", height: "50px", backgroundColor: "#7a5197", borderRadius: "50%" }}/>
      <h1>{currUser.fname + ' ' + currUser.lname}</h1>
    </div>
  );};

  const closePopUp = () => {
    console.log('hi');
    setShowPopUp(false);
  }

  if (isLoading) {
    return <div></div>;
  }
  return (
    <>
      <div className="overlay"/>
      <div className="friend">
        <div className="tabs">
          <button id="close" className="tablinks close" onClick={closePopUp}>
            <FontAwesomeIcon icon={faWindowClose} />
          </button>
          <button className="tablinks messages active-tab" onClick={(e) => {openTab(e, 'messages')}}>
            <FontAwesomeIcon icon={faComment}/>
          </button>
          <button className="tablinks schedule" onClick={(e) => {openTab(e, 'schedule')}}>
            <FontAwesomeIcon icon={faClock} />
          </button>
          <button className="tablinks settings" onClick={(e) => {openTab(e, 'settings')}}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
        <div id="messages" className="tabcontent">
          {friendInfo()}
          <AudioPlayer audio={'paramore.mp3'} />
        </div>
        <div id="schedule" className="tabcontent hidden">
          {friendInfo()}
          <Schedule />
        </div>
        <div id="settings" className="tabcontent hidden">
          {friendInfo()}
          <h3>Settings</h3>
          <p>unadd friend or something here</p>
        </div>
      </div>
    </>
  )
}

export default Friend
