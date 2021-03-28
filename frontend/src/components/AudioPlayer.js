import React from 'react';
import config from './../config';

class AudioPlayer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<audio controls src={`${config.AUDIO_STREAM_URL}/${this.props.fileName}`}>Audio element not supported</audio>
			</div>
		);
	}
}

export default AudioPlayer;