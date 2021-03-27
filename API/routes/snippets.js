const router = require('express').Router();
const mongoose = require('mongoose');
const Snippet = require('../models/snippet.model');
const ms = require('mediaserver');
const User = require('../models/user.model');

const AUDIO_FILE_LOCATION = `${__dirname}/../public/files`;

router.get('/:fileName', (req, res, next) => {
	let snippetLoc = `${AUDIO_FILE_LOCATION}/${req.params.fileName}`;
	ms.pipe(req, res, snippetLoc);
});

router.get('/users/:userId', (req, res, next) => {
	let target = (req.query.sent) ? 'snippetsSent' : 'snippetsReceived';
	User.findById(req.params.userId, target, (err, user) => {
		if (err) res.send(err);

		let outputSnippets = user[target];
		if (!req.query.all) {
			// Filter out future snippets
			outputSnippets = outputSnippets.filter(snippet => !snippet.scheduledDate || snippet.scheduledDate < new Date());
		}

		res.send(outputSnippets);
	});
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