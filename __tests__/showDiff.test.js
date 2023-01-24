import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import showDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('Throws on invalid format', () => {
  const checkshowDiff = () => showDiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'), 'format');
  const error = new Error('Unknown format');
  expect(checkshowDiff).toThrow(error);
});
