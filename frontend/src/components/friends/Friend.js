import React from 'react'
import './Friend.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faClock, faEdit } from '@fortawesome/free-regular-svg-icons'
import Schedule from './schedule.js'

const DUMMYDATA = {
  fname: 'Xuan',
  lname: 'Vu'
}

const Friend = ({ setShowPopUp }) => {
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

  const friendInfo = (
    <div className="friend-info">
      <div style={{ width: "50px", height: "50px", backgroundColor: "#7a5197", borderRadius: "50%" }}/>
      <h1>{DUMMYDATA.fname + ' ' + DUMMYDATA.lname}</h1>
    </div>
  )
  
  return (
    <>
      <div className="overlay"/>
      <div className="friend">
        <div className="tabs">
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
          {friendInfo}
          <p>wait don't we need to store a user's messages too? bc snippets are just scheduled ones right?</p>
        </div>
        <div id="schedule" className="tabcontent hidden">
          {friendInfo}
          <Schedule />
        </div>
        <div id="settings" className="tabcontent hidden">
          {friendInfo}
          <h3>Settings</h3>
          <p>unadd friend or something here</p>
        </div>
      </div>
    </>
  )
}

export default Friend
