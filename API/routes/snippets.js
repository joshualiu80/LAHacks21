const router = require('express').Router();
const mongoose = require('mongoose');
const Snippet = require('../models/snippet.model');
const ms = require('mediaserver');
const User = require('../models/user.model');
const format = require('date-fns/format');

const AUDIO_FILE_LOCATION = `${__dirname}/../public/files`;
const FILE_EXTENSION_PATTERN = /(?:\.([^.]+))?$/;
const DATE_FORMAT = 'yyyy.MM.dd_HH.mm.ss.SSS';


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
	ms.pipe(req, res, snippetLoc);
});

router.get('/notifications/:id', (req, res) => {
	Snippet.find({ recipient: req.params.id }, (err, snippets) => {
		if (err){
			console.log(err);
		}
	})
})



// Get all snippets for a user
router.get('/users/:userId', (req, res, next) => {
	let target = (req.query.sent) ? 'snippetsSent' : 'snippetsReceived';
	User.findById(req.params.userId, target, (err, user) => {
		if (err) res.status(500).send(err);

		let outputSnippets = user[target];
		if (!req.query.all) {
			// Filter out future snippets
			outputSnippets = outputSnippets.filter(snippet => !snippet.scheduledDate || snippet.scheduledDate < new Date());
		}

		res.send(outputSnippets);
	});
});
// Create a new snippet

router.post('/', (req, res, next) => {
	if (req.body.recipient && req.body.tag)
		return res.status(400).send('Either recipient or tag must be provided, not both');

	let audioFile = req.files.file;
	let fileExtension = FILE_EXTENSION_PATTERN.exec(audioFile.name)[1];
	let formattedCreateDate = format(req.body.creationDate, DATE_FORMAT)
	let fileName = `${req.body.creator}_${formattedCreateDate}.${fileExtension}`;

	const snippetInfo = {
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		creator: req.body.creator,
		recipient: req.body.recipient,
		fileName: fileName,
		tag: req.body.tag,
		creationDate: req.body.creationDate,
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
		`${AUDIO_FILE_LOCATION}/${fileName}`,
		(err) => {
			if (err) {
				return res.status(500).send(err);
			}

			res.json({
				file: `public/${fileName}`,
			});
		}
	);
});


module.exports = router;