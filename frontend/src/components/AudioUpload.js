import React from 'react';
import axios from 'axios';

const AUDIO_UPLOAD_URL = 'http://localhost:3000/upload';

class AudioUpload extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selectedFile: null, loaded: null };
	}

	handleUpload = () => {
		const data = new FormData();
		data.append('file', this.state.selectedFile, this.state.selectedFile.name);

		axios.post(AUDIO_UPLOAD_URL, data, {
			onUploadProgress: ProgressEvent => {

				this.setState({ loaded: (ProgressEvent.loaded / ProgressEvent.total * 100) });
			},
		}).then(res => {
			console.log(res.statusText);
		});
	};

	handleSelectedFile = event => {
		this.setState({ selectedFile: event.target.files[0], loaded: 0 });
	}

	render() {
		return (
			<div>
				<input type='file' onChange={this.handleSelectedFile} />
				<button onClick={this.handleUpload}>Upload</button>
				<div> {Math.round(this.state.loaded, 2)} %</div>
			</div>
		);
	}
}

export default AudioUpload;