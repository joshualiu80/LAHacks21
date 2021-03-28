import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { ReactMic } from 'react-mic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const Schedule = ({closePopUp}) => {
  const [datetime, setDatetime] = useState(new Date());
  const [subject, setSubject] = useState('');
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  const toggleRecording = () => {
    if (recording) setRecording(false);
    else setRecording(true)
  }
  const onStop = (blob) => {
    setAudioUrl(blob.blobURL);
    setAudioBlob(blob);
  }
  const onSave = () => {
    const formData = new FormData();
    formData.append('audio-file', audioBlob);
    closePopUp();
  }
  const deleteSound = () => {
    setAudioUrl(null);
  }
  const playSound = () => {
    const sound = new Audio(audioUrl);
    sound.play();
  }

  return (
    <form className="record-msg">
      <input type="text" placeholder="Subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <DateTimePicker
        className="datetime"
        onChange={setDatetime}
        value={datetime}
        disableClock
        clearIcon={null}
        minDate={new Date()}
      />
      <button className="record-btn" onClick={(e) => {e.preventDefault()}}>
        <ReactMic
          record={recording}
          onStop={onStop}
          mimeType="audio/mp3" 
          strokeColor="#ffffff"
          backgroundColor="#7a5494" />
        {!recording && audioUrl === null ? <p>click the moon to record</p> : null}
        {!recording && audioUrl !== null ? <p>play back your audio recording</p> : null}
        <img src="/images/moon.png" onClick={toggleRecording}/>
      </button>
      {!recording && audioUrl !== null ? (
      <div class="audio-controls">
        <FontAwesomeIcon icon={faTimes} onClick={deleteSound} color="#7a5494"/>
        <FontAwesomeIcon icon={faPlay} onClick={playSound} color="#7a5494"/>
        <FontAwesomeIcon icon={faCheck} onClick={onSave} color="#7a5494"/>
      </div>
      ) : null}
    </form>
  )
}

export default Schedule
