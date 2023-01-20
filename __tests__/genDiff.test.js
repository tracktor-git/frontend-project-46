import { readFileSync } from 'node:fs';
import parse from '../parsers.js';
import { getFixturePath, genDiff } from '../index.js';

const diff1 = getFixturePath('diff1.txt');
const expected = readFileSync(diff1, 'utf-8');

test('Geneate flat diffs', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const path3 = getFixturePath('flat1.yaml');
  const path4 = getFixturePath('flat2.yml');
  const result1 = genDiff(parse(path1), parse(path2));
  const result2 = genDiff(parse(path3), parse(path4));

  expect(result1).toBe(expected);
  expect(result2).toBe(expected);
  expect(typeof result1).toBe('string');
  expect(typeof result2).toBe('string');
});
