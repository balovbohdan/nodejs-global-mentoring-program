const fs = require('fs');
const { csv } = require('csvtojson');
const readline = require('readline');
const { pipeline } = require('stream');

const { utils } = require('../shared');
const constants = require('./constants');

const checkOutputFileExists = () => fs.existsSync(constants.OUTPUT_FILE_PATH);

const flushOutputFile = async () => {
  const outputFileExists = checkOutputFileExists();

  if (!outputFileExists) return;

  await fs.promises.writeFile(constants.OUTPUT_FILE_PATH);
};

const createOutputLine = ({ Book, Author, Price }) => {
  const item = {
    book: Book,
    author: Author,
    price: +Price,
  };

  return JSON.stringify(item) + '\r\n';
};

const readInput = () =>
  new Promise((resolve, reject) => {
    const lines = [];
    const stream = fs.createReadStream(constants.INPUT_FILE_PATH);

    stream.on('data', line => lines.push(line));

    stream.on('close', async () => {
      const linesString = Buffer.concat(lines).toString();
      const response = await csv().fromString(linesString);

      resolve(response);
    });
  });

const writeOutput = async data => {
  flushOutputFile();
  utils.createTmpDir();

  const stream = fs.createWriteStream(constants.OUTPUT_FILE_PATH, {
    flags: 'a',
  });

  data.map(async item => {
    const line = createOutputLine(item);

    stream.write(line);
  });

  stream.end();
};

module.exports = {
  readInput,
  writeOutput,
};
