import fs from 'fs';
import { csv } from 'csvtojson';
import readline from 'readline';

import * as constants from './constants';

const checkTmpDirExists = () => fs.existsSync(constants.TMP_DIR_PATH);
const checkOutputFileExists = () => fs.existsSync(constants.OUTPUT_FILE_PATH);

const createTmpDir = async () => {
  const tmpDirExists = checkTmpDirExists();

  if (tmpDirExists) return;

  await fs.promises.mkdir(constants.TMP_DIR_PATH);
};

export const flushOutputFile = async () => {
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

export const processInput = () =>
  new Promise((resolve, reject) => {
    createTmpDir();

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
