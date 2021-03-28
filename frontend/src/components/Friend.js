import React, { useState, useEffect } from 'react'
import './Friend.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faClock, faEdit } from '@fortawesome/free-regular-svg-icons'
import DateTimePicker from 'react-datetime-picker'

const DUMMYDATA = {
  fname: 'Xuan',
  lname: 'Vu'
}
// use user prop to fetch data from backend
const Friend = (user) => {
  const [subject, setSubject] = useState('');
  const [datetime, setDatetime] = useState(new Date());

  useEffect(() => {
    const content = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < content.length; i++) {
      content[i].style.display = 'none';
    }
    document.getElementById('messages').style.display = 'block';
  }, [])

  const openTab = (e, tab) => {
    const content = document.getElementsByClassName('tabcontent');
    const tabs = document.getElementsByClassName('tablinks');
    // make all content display none
    for (let i = 0; i < content.length; i++) {
      content[i].style.display = 'none';
    }
    // make all tablinks not active
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active-tab');
    }
    // show tab/content you want
    document.getElementById(tab).style.display = 'block';
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
      <div class="overlay" />
      <div class="friend">
        <div class="tabs">
          <button class="tablinks messages active-tab" onClick={(e) => {openTab(e, 'messages')}}>
            <FontAwesomeIcon icon={faComment}/>
          </button>
          <button class="tablinks schedule" onClick={(e) => {openTab(e, 'schedule')}}>
            <FontAwesomeIcon icon={faClock} />
          </button>
          <button class="tablinks settings" onClick={(e) => {openTab(e, 'settings')}}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
        <div id="messages" class="tabcontent">
          {friendInfo}
          <p>wait don't we need to store a user's messages too? bc snippets are just scheduled ones right?</p>
        </div>
        <div id="schedule" class="tabcontent">
          {friendInfo}
          <form class="record-msg">
            <input type="text" placeholder="Subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <DateTimePicker
              className="datetime"
              onChange={setDatetime}
              value={datetime}
              disableClock
              clearIcon={null}
              minDate={new Date()}
            />
            <button className="record-btn">
              click the moon to record
              <img src="/images/moon.png"/>
            </button>
          </form>
        </div>
        <div id="settings" class="tabcontent">
          {friendInfo}
          <h3>Settings</h3>
          <p>unadd friend or something here</p>
        </div>
      </div>
    </>
  )
}

export default Friend
