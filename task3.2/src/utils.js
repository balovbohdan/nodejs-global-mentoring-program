import fs from 'fs';
import { csv } from 'csvtojson';
import readline from 'readline';

import * as constants from './constants';

const checkTmpDirExists = () => fs.existsSync(constants.TMP_DIR_PATH);

const createReadLineInterface = () =>
  readline.createInterface({
    input: fs.createReadStream(constants.INPUT_FILE_PATH, {
      encoding: 'utf8',
    }),
  });

const createOutputLine = ({ Book, Author, Price }) => {
  const item = {
    book: Book,
    author: Author,
    price: +Price,
  };

  return JSON.stringify(item) + '\r\n';
  };

const createWriteStream = () =>
  fs.createWriteStream(constants.OUTPUT_FILE_PATH, {
    flags: 'w',
    encoding: 'utf8',
  });

const handleLine = async ({ line, headers, writeStream }) => {
  const lineWithHeaders = `${headers}\r\n${line}`;
  const [lineParsed] = await csv().fromString(lineWithHeaders);
  const outputLine = createOutputLine(lineParsed);

  writeStream.write(outputLine);
};

const getHeaders = (readLineInterface, handleLine) =>
  readLineInterface.once('line', handleLine);

export const createTmpDir = async () => {
  const tmpDirExists = checkTmpDirExists();

  if (tmpDirExists) return;

  await fs.promises.mkdir(constants.TMP_DIR_PATH);
};

export const processInput = async () => {
  const writeStream = createWriteStream();
  const readLineInterface = createReadLineInterface();

  readLineInterface.on('close', () => writeStream.end());

  getHeaders(readLineInterface, headers => {
    readLineInterface.on('line', line => {
      handleLine({ line, headers, writeStream })
    });
  });
};
