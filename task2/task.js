const utils = require('./utils');

utils.flushOutputFile()
  .then(utils.processInput)
  .then(() => console.log('Output file created: /tmp/task2.txt'))
  .catch(err => console.error(err));
