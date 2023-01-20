import { readFileSync } from 'node:fs';
import { getFixturePath, genDiff, getData } from '../index.js';

test('Geneate flat diff', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const diff1 = getFixturePath('diff1.txt');
  const expected = readFileSync(diff1, 'utf-8');
  const result = genDiff(getData(path1), getData(path2));

  expect(result).toBe(expected);
  expect(typeof result).toBe('string');
});
