const router = require('express').Router();
const mongoose = require('mongoose');
const Snippet = require('../models/snippet.model');
const ms = require('mediaserver');

const AUDIO_FILE_LOCATION = `${__dirname}/../public/files`;

// NEEDS TESTING
router.get('/:id', (req, res) => {
	Snippet.findById(req.params.id, (err, snippet) => {
		if (err) {
      console.log(err);
      res.status(400).send('Error:' + err);
    }
    if (snippet) {
      res.status(200).json(snippet);
    } else {
      res.status(400).send('Error:' + err);
    }
	})
});

router.get('/tag/:id', (req, res) => {
	Snippet.find({ tag: req.params.id }, (err, snippets) => {
		if (err) {
      console.log(err);
      res.status(400).send('Error:' + err);
    }
    if (snippets) {
      res.status(200).json(snippets);
    } else {
      res.status(400).send('Error:' + err);
    }
	})
});

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