const router = require('express').Router();
const mongoose = require('mongoose');
const Snippet = require('../models/snippet.model');
const ms = require('mediaserver');

const AUDIO_FILE_LOCATION = `${__dirname}/../public/files`;

router.get('/:fileName', (req, res, next) => {
	let snippetLoc = `${AUDIO_FILE_LOCATION}/${req.params.fileName}`;
	console.log(snippetLoc)
	ms.pipe(req, res, snippetLoc);
});

router.post('/', (req, res, next) => {
	// let audioFile = req.files.file;
	// let uploadPath = `${AUDIO_FILE_LOCATION}/${audioFile.name}`;

	// audioFile.mv(
	// 	uploadPath,
	// 	(err) => {
	// 		if (err) {
	// 			return res.status(500).send(err);
	// 		}

	// 		res.json({
	// 			file: `public/${audioFile.name}`,
	// 		});
	// 	}
	// );
});


module.exports = router;