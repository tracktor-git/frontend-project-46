import { readFileSync } from 'node:fs';
import parse from '../parsers.js';
import { getFixturePath, genDiff } from '../index.js';

const diff1 = getFixturePath('diff1.txt');
const expected = readFileSync(diff1, 'utf-8');

test('Geneate flat diffs', () => {
  const json1 = getFixturePath('file1.json');
  const json2 = getFixturePath('file2.json');
  const yaml1 = getFixturePath('flat1.yaml');
  const yaml2 = getFixturePath('flat2.yml');
  const result1 = genDiff(parse(json1), parse(json2));
  const result2 = genDiff(parse(yaml1), parse(yaml2));

  expect(result1).toBe(expected);
  expect(result2).toBe(expected);
  expect(typeof result1).toBe('string');
  expect(typeof result2).toBe('string');
});

test('Throws on invalid file extension', () => {
  const checkParse = () => parse('some.file');
  const error = new Error('Not supported file extension');
  expect(checkParse).toThrow(error);
});
