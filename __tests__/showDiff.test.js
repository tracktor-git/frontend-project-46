import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import showDiff, { getData } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('Showing diff', () => {
  const path1 = getFixturePath('nested1.json');
  const path2 = getFixturePath('nested2.json');
  const expectedPlain = getData(getFixturePath('plain.txt'));
  expect(showDiff(path1, path2, 'plain')).toBe(expectedPlain);
});
