const utils = require('./utils');

utils.readInput()
  .then(utils.writeOutput)
  .then(() => console.log('Output file created: /tmp/task2.txt'))
  .catch(err => console.error(err));
