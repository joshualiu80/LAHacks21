let config = {};

config.PROFILE_FILE_LOCATION = `${__dirname}/public/profiles`;
config.FILE_EXTENSION_PATTERN = /(?:\.([^.]+))?$/;
config.AUDIO_FILE_LOCATION = `${__dirname}/public/files`;
config.DATE_FORMAT = 'yyyy.MM.dd_HH.mm.ss.SSS';

module.exports = config;