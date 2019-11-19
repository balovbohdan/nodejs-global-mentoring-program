const fs = require('fs');
const { csv } = require('csvtojson');
const readline = require('readline');

const { utils, constants } = require('../shared');

const INPUT_FILE_PATH = constants.CSV_DIR_PATH + 'task2.csv';
const OUTPUT_FILE_PATH = constants.TMP_DIR_PATH + 'task2.txt';

const createOutputLine = ({ Book, Author, Price }) => {
  const item = {
    book: Book,
    author: Author,
    price: +Price,
  };

  return JSON.stringify(item) + '\r\n';
};

const readInputLineByLine = () =>
  new Promise((resolve, reject) => {
    let lines = '';

    const lineReader = readline.createInterface({
      input: fs.createReadStream(INPUT_FILE_PATH),
    });

    lineReader.on('line', line => lines += line + '\r\n');

    lineReader.on('close', async () => {
      const linesTrimmed = lines.trim();
      const response = await csv().fromString(linesTrimmed);

      resolve(response);
    });
  });

const writeOutputLineByLine = async data => {
  const makeTmpDir = utils.createTmpDirMaker();

  const promises = data.map(async item => {
    const line = createOutputLine(item);

    await makeTmpDir();
    await fs.promises.appendFile(OUTPUT_FILE_PATH, line);
  });

  await Promise.all(promises);
};

module.exports = {
  readInputLineByLine,
  writeOutputLineByLine,
};
