import React, { useState, useEffect } from 'react';
import { ReactMic } from 'react-mic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import config from '../config';

const Create = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const getTags = async () => {
      const res = await axios.get(`${config.API_URL}/tags`);
      setTags(res.data);
    }
    getTags();
  }, [])

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
  }
  const deleteSound = () => {
    setAudioUrl(null);
  }
  const playSound = () => {
    const sound = new Audio(audioUrl);
    sound.play();
  }

  const selectTag = (e) => {
    setSelectedTag(e.target.id);
    const options = document.getElementsByTagName("label");
    // make everything gray
    for (let i = 0; i < options.length; i++) {
      if (options[i].innerHTML === e.target.id) {
        options[i].classList.add("active-tag");
      } else {
        options[i].classList.remove('active-tag');
      }
    }
  }

  return (
    <div className="tabcontent">
      <div className="audio-tags">
        {tags.map((tag) => {
          return (
            <>
              <input type="radio" id={tag.name} name="audio-tag" onChange={selectTag} style={{display: 'none'}}/>
              <label for={tag.name}>{tag.name}</label>
            </>
            )
        })}
      </div>
      <button className="record-btn" onClick={(e) => {e.preventDefault()}}>
        <ReactMic
          record={recording}
          onStop={onStop}
          mimeType="audio/mp3" 
          strokeColor="#ffffff"
          backgroundColor="#7a5494" />
        {!recording && audioUrl === null ? <p style={{width: "32%"}}>click the moon to record</p> : null}
        {!recording && audioUrl !== null ? <p style={{width: "32%"}}>audio waveform goes here</p> : null}
        <img src="/images/moon.png" onClick={toggleRecording}/>
      </button>
      {!recording && audioUrl !== null ? (
      <div class="audio-controls">
        <FontAwesomeIcon icon={faTimes} onClick={deleteSound} color="#7a5494"/>
        <FontAwesomeIcon icon={faPlay} onClick={playSound} color="#7a5494"/>
        <FontAwesomeIcon icon={faCheck} onClick={onSave} color="#7a5494"/>
      </div>
      ) : null}
    </div>
  )
}

export default Create
