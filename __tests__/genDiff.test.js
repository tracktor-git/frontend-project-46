import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { readFileSync } from 'node:fs';
import { generateDiffTree } from '../src/index.js';
import parse from '../parsers.js';
import stylish, { getStatusIcon } from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const nestedDiff = getFixturePath('nested.txt');
const plainDiff = getFixturePath('plain.txt');
const jsonDiff = getFixturePath('json.txt');
const expected1 = readFileSync(nestedDiff, 'utf-8');
const expected2 = readFileSync(plainDiff, 'utf-8');
const expected3 = readFileSync(jsonDiff, 'utf-8');

test('Geneate nested diffs', () => {
  const json1 = getFixturePath('nested1.json');
  const json2 = getFixturePath('nested2.json');
  const yaml1 = getFixturePath('nested1.yaml');
  const yaml2 = getFixturePath('nested2.yml');
  const result1 = stylish(generateDiffTree(parse(json1), parse(json2)));
  const result2 = stylish(generateDiffTree(parse(yaml1), parse(yaml2)));
  const result3 = plain(generateDiffTree(parse(json1), parse(json2)));
  const result4 = json(generateDiffTree(parse(yaml1), parse(yaml2)));

  expect(result1).toBe(expected1);
  expect(result2).toBe(expected1);
  expect(result3).toBe(expected2);
  expect(result4).toBe(expected3);
});

test('Throws errors', () => {
  const checkParse = () => parse('some.file');
  const checkGetStatusIcon = () => getStatusIcon('NoSuchStatus');
  expect(checkParse).toThrow(new Error('Not supported file extension'));
  expect(checkGetStatusIcon).toThrow(new Error('Invalid status'));
});
