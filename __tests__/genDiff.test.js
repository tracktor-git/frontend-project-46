import { readFileSync } from 'node:fs';
import parse from '../parsers.js';
import { getFixturePath, genDiff } from '../index.js';

const diff1 = getFixturePath('diff1.txt');
const expected = readFileSync(diff1, 'utf-8');

test('Geneate flat diff JSON', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const result = genDiff(parse(path1), parse(path2));

  expect(result).toBe(expected);
  expect(typeof result).toBe('string');
});

test('generate flat diff YAML', () => {
  const path1 = getFixturePath('flat1.yaml');
  const path2 = getFixturePath('flat2.yml');
  const result = genDiff(parse(path1), parse(path2));

  expect(result).toBe(expected);
  expect(typeof result).toBe('string');
});
