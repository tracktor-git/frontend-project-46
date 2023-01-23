import { readFileSync } from 'node:fs';
import parse from '../parsers.js';
import { getFixturePath, genDiff } from '../index.js';
import stylish from '../stylish.js';

const diff = getFixturePath('diff.txt');
const expected = readFileSync(diff, 'utf-8');

test('Geneate nested diffs', () => {
  const json1 = getFixturePath('nested1.json');
  const json2 = getFixturePath('nested2.json');
  const yaml1 = getFixturePath('nested1.yaml');
  const yaml2 = getFixturePath('nested2.yml');
  const result1 = stylish(genDiff(parse(json1), parse(json2)));
  const result2 = stylish(genDiff(parse(yaml1), parse(yaml2)));

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
