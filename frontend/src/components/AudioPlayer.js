import React from 'react';

const AUDIO_STREAM_URL = 'http://localhost:3000/snippets';

class AudioPlayer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<audio controls src={`${AUDIO_STREAM_URL}/${this.props.fileName}`}>Audio element not supported</audio>
			</div>
		);
	}
}

export default AudioPlayer;