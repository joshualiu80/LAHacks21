import React from 'react';
import './AudioPlayer.css';

const AUDIO_STREAM_URL = 'http://localhost:3000/snippets';

class AudioPlayer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="audio-player">
				<audio controls controlsList="nodownload" src={`http://localhost:3000/snippets/files/${this.props.audio}`}>
					Audio element not supported
				</audio>
			</div>
		);
	}
}

export default AudioPlayer;