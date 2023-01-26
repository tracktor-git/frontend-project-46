import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { getData, getExtension } from '../src/index.js';
import generateDiffTree from '../src/generateDiffTree.js';
import parse from '../src/parsers.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const nestedDiff = getFixturePath('nested.txt');
const plainDiff = getFixturePath('plain.txt');
const jsonDiff = getFixturePath('json.txt');
const expected1 = getData(nestedDiff);
const expected2 = getData(plainDiff);
const expected3 = getData(jsonDiff);

test('Geneate nested diffs', () => {
  /* Get filepaths */
  const jsonPath1 = getFixturePath('nested1.json');
  const jsonPath2 = getFixturePath('nested2.json');
  const yamlPath1 = getFixturePath('nested1.yaml');
  const yamlPath2 = getFixturePath('nested2.yml');

  /* Get data using filepaths above */
  const jsonData1 = getData(jsonPath1);
  const jsonData2 = getData(jsonPath2);
  const yamlData1 = getData(yamlPath1);
  const yamlData2 = getData(yamlPath2);

  /* get file extensions */
  const jsonExt1 = getExtension(jsonPath1);
  const jsonExt2 = getExtension(jsonPath2);
  const yamlExt1 = getExtension(yamlPath1);
  const yamlExt2 = getExtension(yamlPath2);

  const result1 = stylish(generateDiffTree(parse(jsonData1, jsonExt1), parse(jsonData2, jsonExt2)));
  const result2 = stylish(generateDiffTree(parse(yamlData1, yamlExt1), parse(yamlData2, yamlExt2)));
  const result3 = plain(generateDiffTree(parse(jsonData1, jsonExt1), parse(jsonData2, jsonExt2)));
  const result4 = json(generateDiffTree(parse(yamlData1, yamlExt1), parse(yamlData2, yamlExt2)));

  expect(result1).toBe(expected1);
  expect(result2).toBe(expected1);
  expect(result3).toBe(expected2);
  expect(result4).toBe(expected3);
});

test('Throws errors', () => {
  const checkParse = () => parse(expected1, 'mp3');
  expect(checkParse).toThrow(new Error('Not supported file extension'));
});
