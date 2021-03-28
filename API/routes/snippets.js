const router = require('express').Router();
const mongoose = require('mongoose');
const Snippet = require('../models/snippet.model');
const ms = require('mediaserver');
const User = require('../models/user.model');
const format = require('date-fns/format');
const config = require('../config');

// Get a snippet's info from its id
router.get('/snippet/:id', (req, res) => {
	// TODO: error handle bad id value (backend crashes)
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

router.get('/tagged', (req, res) => {
	Snippet.find({ tag: { $exists: true } }, (err, taggedSnippets) => {
		if (err) {
			console.log(err);
			res.status(400).send('Error:' + err);
		}
		if (taggedSnippets) {
			res.status(200).json(taggedSnippets);
		} else {
			res.status(400).send('Error:' + err);
		}
	})
})

// Stream an audio file
router.get('/files/:fileName', (req, res, next) => {
	const snippetLoc = `${config.AUDIO_FILE_LOCATION}/${req.params.fileName}`;
	console.log(snippetLoc)
	ms.pipe(req, res, snippetLoc);
});

// Get all snippets for a user
router.get('/users/:userId', (req, res, next) => {
	const target = (req.query.isSender && req.query.isSender.toLowerCase === 'true') ? 'snippetsSent' : 'snippetsReceived';

	const currentDate = new Date();

	Snippet.find({ recipient: req.params.userId }, (err, snippets) => {
		if (err) {
			console.log('Error:' + err);
			res.status(500).send(err);
		}
		console.log('snippets:', snippets);
		let outputSnippets = snippets;
		console.log(outputSnippets);
		if (target === 'snippetsReceived') {
			// Filter out future snippets
			outputSnippets = outputSnippets.filter(snippet => snippet.scheduledDate <= currentDate);
		}

		console.log(outputSnippets);

		res.status(200).send(outputSnippets);
	});
});

// Create a new snippet
router.post('/', (req, res, next) => {
	if (req.body.recipient && req.body.tag)
		return res.status(400).send('Either recipient or tag must be provided, not both');

	// TODO: restrict accepted audio formats
	const audioFile = req.files.file;
	const fileExtension = config.FILE_EXTENSION_PATTERN.exec(audioFile.name)[1];
	const formattedCreateDate = format(req.body.creationDate, config.DATE_FORMAT)
	const fileName = `${req.body.creator}_${formattedCreateDate}.${fileExtension}`;

	const snippetInfo = {
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		creator: req.body.creator,
		recipient: req.body.recipient,
		fileName: fileName,
		tag: req.body.tag,
		//creationDate: req.body.creationDate,
		scheduledDate: req.body.scheduledDate || req.body.creationDate,

	};

	// Create the mongoDB entry
	Snippet.create(snippetInfo, (err, snippet) => {
		if (err) return res.status(500).send(err);

		// Update the sender's list
		User.findByIdAndUpdate(req.body.creator,
			{
				$push: {
					snippetsSent: snippet
				}
			}, (err, succ) => {
				if (err) res.status(500).send(err);
			}
		);

		// Update the recipient's/tag list
		User.findByIdAndUpdate(req.body.recipient,
			{
				$push: {
					snippetsReceived: snippet
				}
			}, (err, succ) => {
				if (err) res.status(500).send(err);
			}
		);
	});

	// Create the file on the server
	audioFile.mv(
		`${config.AUDIO_FILE_LOCATION}/${fileName}`,
		(err) => {
			if (err) {
				return res.status(500).send(err);
			}

			res.json({
				file: `fileName`,
			});
		}
	);
});


router.put('/:id', async (req, res) => {
	try {
		await Snippet.updateOne({ _id: req.params.id }, { $set: { listened: true } });
		res.status(200).send(`Snippet with id ${req.params.id} updated successfully!`);
	} catch (err) {
		console.log('Error: ' + err);
		res.status(400).send(err);
	}
});

module.exports = router;