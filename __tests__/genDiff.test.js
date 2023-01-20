import { readFileSync } from 'node:fs';
import { genDiff, getData } from '../index.js';

test('Geneate flat diff', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';
  const expected = readFileSync('__fixtures__/diff1.txt', 'utf-8');
  const diff = genDiff(getData(path1), getData(path2));
  expect(diff).toBe(expected);
  expect(typeof diff).toBe('string');
});
