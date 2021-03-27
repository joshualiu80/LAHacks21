var express = require('express');
var router = express.Router();

const AUDIO_FILE_LOCATION = `${__dirname}/../public/files`;

router.post('/', (req, res, next) => {
  let audioFile = req.files.file;
  let uploadPath = `${AUDIO_FILE_LOCATION}/${audioFile.name}`;

  audioFile.mv(
    uploadPath,
    (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.json({
        file: `public/${audioFile.name}`,
      });
    }
  );
});

module.exports = router;
