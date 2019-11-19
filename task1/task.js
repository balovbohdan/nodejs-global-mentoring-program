process.stdin.resume();
process.stdin.setEncoding('utf8');

const log = text => process.stdout.write(text + '\r\n');
const reverseText = text => text.trim().split('').reverse().join('');

process.stdin.on('data', text => {
  const textReversed = reverseText(text);

  log(textReversed);
});
