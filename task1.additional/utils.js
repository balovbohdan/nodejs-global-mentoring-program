const fs = require('fs');
const path = require('path');

const constants = require('./constants');

const createTmpDir = async () => {
  const tmpDirExists = fs.existsSync(constants.TMP_DIR_PATH);

  if (tmpDirExists) return;

  await fs.promises.mkdir(constants.TMP_DIR_PATH);
};

const createResponseFilePath = () => {
  const name = constants.RESPONSE_FILE_NAME
    + '-' + String(Math.random()).slice(2)
    + '-' + Date.now()
    + '.' + constants.RESPONSE_FILE_EXT;

    return path.join(constants.TMP_DIR_PATH, name);
};

const processInput = () => {
  process.stdin.resume();
  process.stdin.setEncoding('utf-8');

  const responseFilePath = createResponseFilePath();

  const writeStream = fs.createWriteStream(responseFilePath, {
    flags: 'a',
    encoding: 'utf8',
  });

  process.stdin.pipe(writeStream);
};

module.exports = {
  createTmpDir,
  processInput,
};
