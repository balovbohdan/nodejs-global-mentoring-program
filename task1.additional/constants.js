const path = require('path');

const RESPONSE_FILE_EXT = 'csv';
const RESPONSE_FILE_NAME = 'task1.additional';
const TMP_DIR_PATH = path.join(__dirname, '../tmp/');

module.exports = {
  TMP_DIR_PATH,
  RESPONSE_FILE_EXT,
  RESPONSE_FILE_NAME,
};
