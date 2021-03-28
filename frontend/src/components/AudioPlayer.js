import React from 'react';
import './AudioPlayer.css';
import config from '../config';

class AudioPlayer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="audio-player">
				<audio controls controlsList="nodownload" src={`${config.AUDIO_STREAM_URL}/files/${this.props.audio}`}>
					Audio element not supported
				</audio>
			</div>
		);
	}
}

export default AudioPlayer;