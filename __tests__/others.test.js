import parse from '../src/parser.js';
import getFormattedData from '../src/formatters/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

test('Throws errors', () => {
  const checkParse = () => parse('some string', 'mp3');
  const error1 = new Error('Not supported file extension');
  expect(checkParse).toThrow(error1);

  const checkGetFormattedData = () => getFormattedData('some string', 'unknown');
  const error2 = new Error('Unsupported format: unknown');
  expect(checkGetFormattedData).toThrow(error2);

  const data = [{ key: 'test', status: 'unsupported', value: null }];
  const checkStylish = () => stylish(data);
  const checkPlain = () => plain(data);
  const error3 = new Error('Invalid node status: unsupported!');
  expect(checkStylish).toThrow(error3);
  expect(checkPlain).toThrow(error3);
});
