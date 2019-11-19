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

const checkDataHasHeader = data => {
  const headerLineRegex = new RegExp(`^${constants.HEADER_LINE}`);

  return headerLineRegex.test(data);
};

const addHeaderToData = data => {
  const hasHeader = checkDataHasHeader(data);

  return hasHeader
    ? data
    : `${constants.HEADER_LINE}\r\n${data}`;
};

const createOutputLine = ({ Book, Author, Price }) => {
  const item = {
    book: Book,
    author: Author,
    price: +Price,
  };

  return JSON.stringify(item) + '\r\n';
};

const createOutputLines = lines => {
  let response = '';

  for (let line of lines)
    response += createOutputLine(line);

  return response.trim();
};

const writeToOutput = async (data, writeStream) => {
  const lines = createOutputLines(data);

  writeStream.write(lines);
};

const readInput = ({ onData, onClose }) => {
  const readStream = fs.createReadStream(constants.INPUT_FILE_PATH);

  readStream.on('close', onClose);

  readStream.on('data', data => {
    const dataString = data.toString();

    onData(dataString);
  });
};

const processInput = () =>
  new Promise((resolve, reject) => {
    utils.createTmpDir();

    const writeStream = fs.createWriteStream(constants.OUTPUT_FILE_PATH, {
      flags: 'a',
    });

    const onData = async data => {
      const dataPrepared = addHeaderToData(data);
      const dataObject = await csv().fromString(dataPrepared);

      writeToOutput(dataObject, writeStream);
    };

    const onClose = () => {
      writeStream.close();
      resolve();
    };

    readInput({ onData, onClose });
  });

module.exports = {
  processInput,
  flushOutputFile,
};
