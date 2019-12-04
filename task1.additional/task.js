const utils = require('./utils');

utils.createTmpDir()
  .then(utils.processInput);
