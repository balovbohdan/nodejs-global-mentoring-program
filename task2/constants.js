const path = require('path');

const TMP_DIR_PATH = path.join(__dirname, '../tmp/');
const CSV_DIR_PATH = path.join(__dirname, '../csv/');
const HEADER_LINE = 'Book,Author,Amount,Price';
const INPUT_FILE_PATH = CSV_DIR_PATH + 'task2.csv';
const OUTPUT_FILE_PATH = TMP_DIR_PATH + 'task2.txt';

module.exports = {
  HEADER_LINE,
  TMP_DIR_PATH,
  CSV_DIR_PATH,
  INPUT_FILE_PATH,
  OUTPUT_FILE_PATH,
};
