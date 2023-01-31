import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import path, { dirname } from 'node:path';
import makeDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylish = readFileSync(getFixturePath('nested.txt'), 'utf-8');
const expectedPlain = readFileSync(getFixturePath('plain.txt'), 'utf-8');
const expectedJson = readFileSync(getFixturePath('json.txt'), 'utf-8');

test('Nested diffs', () => {
  const json1 = getFixturePath('nested1.json');
  const json2 = getFixturePath('nested2.json');
  expect(makeDiff(json1, json2)).toBe(expectedStylish);
  expect(makeDiff(json1, json2, 'plain')).toBe(expectedPlain);
  expect(makeDiff(json1, json2, 'json')).toBe(expectedJson);

  const yaml1 = getFixturePath('nested1.yaml');
  const yaml2 = getFixturePath('nested2.yml');
  expect(makeDiff(yaml1, yaml2)).toBe(expectedStylish);
  expect(makeDiff(yaml1, yaml2, 'plain')).toBe(expectedPlain);
  expect(makeDiff(yaml1, yaml2, 'json')).toBe(expectedJson);
});
