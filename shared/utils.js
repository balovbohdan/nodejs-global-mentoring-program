const fs = require('fs');

const constants = require('./constants');

const createTmpDirMaker = () => {
  let tmpDirCreated = false;

  return async () => {
    if (tmpDirCreated || fs.existsSync(constants.TMP_DIR_PATH)) return;

    tmpDirCreated = true;

    await fs.promises.mkdir(constants.TMP_DIR_PATH);
  };
};

module.exports = {
  createTmpDirMaker,
};
