import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { readFileSync } from 'node:fs';
import { genDiff } from '../src/index.js';
import parse from '../parsers.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const diff = getFixturePath('diff.txt');
const plainDiff = getFixturePath('plain.txt');
const expected1 = readFileSync(diff, 'utf-8');
const expected2 = readFileSync(plainDiff, 'utf-8');

test('Geneate nested diffs', () => {
  const json1 = getFixturePath('nested1.json');
  const json2 = getFixturePath('nested2.json');
  const yaml1 = getFixturePath('nested1.yaml');
  const yaml2 = getFixturePath('nested2.yml');
  const result1 = stylish(genDiff(parse(json1), parse(json2)));
  const result2 = stylish(genDiff(parse(yaml1), parse(yaml2)));
  const result3 = plain(genDiff(parse(json1), parse(json2)));

  expect(result1).toBe(expected1);
  expect(result2).toBe(expected1);
  expect(result3).toBe(expected2);
  expect(typeof result1).toBe('string');
  expect(typeof result2).toBe('string');
  expect(typeof result3).toBe('string');
});

test('Throws on invalid file extension', () => {
  const checkParse = () => parse('some.file');
  const error = new Error('Not supported file extension');
  expect(checkParse).toThrow(error);
});
