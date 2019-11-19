const utils = require('./utils');

utils.readInputLineByLine()
  .then(utils.writeOutputLineByLine)
  .then(() => console.log('Output file created: /tmp/task2.txt'))
  .catch(err => console.error(err));
