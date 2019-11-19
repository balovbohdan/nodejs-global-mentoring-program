const fs = require('fs');

const constants = require('./constants');

const checkTmpDirExists = () => fs.existsSync(constants.TMP_DIR_PATH);

const createTmpDir = async () => {
  const tmpDirExists = checkTmpDirExists();

  if (tmpDirExists) return;

  await fs.promises.mkdir(constants.TMP_DIR_PATH);
};

module.exports = {
  createTmpDir,
  checkTmpDirExists,
};
