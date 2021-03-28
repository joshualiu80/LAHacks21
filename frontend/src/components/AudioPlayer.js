import React from 'react';
import './AudioPlayer.css';

const AudioPlayer = (props) => {
	const { audio } = props;
	return (
		<div className="audio-player">
			<audio controls controlsList="nodownload" src={`http://localhost:3000/snippets/files/${audio}`}>
				Audio element not supported
			</audio>
		</div>
	);
}

export default AudioPlayer;