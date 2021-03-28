import React from 'react';
import './AudioPlayer.css';
import config from '../config';


const AudioPlayer = (props) => {
	const { audio } = props;
	return (
		<div className="audio-player">
    	<audio controls controlsList="nodownload" src={`${config.AUDIO_STREAM_URL}/files/${audio}`}>
				Audio element not supported
			</audio>
		</div>
	);
}

export default AudioPlayer;