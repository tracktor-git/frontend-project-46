import { readFileSync } from 'node:fs';
import parse from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';
import generateDiffTree from './generateDiffTree.js';

export const getExtension = (filename) => filename.split('.').at(-1);
export const getData = (filepath) => readFileSync(filepath, 'utf-8');

const makeDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const file1 = parse(data1, getExtension(filepath1));
  const file2 = parse(data2, getExtension(filepath2));
  const diffTree = generateDiffTree(file1, file2);
  return diffTree;
};

const showDiff = (filepath1, filepath2, format = 'stylish') => {
  const diff = makeDiff(filepath1, filepath2);

  switch (format) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error('Unknown format');
  }
};

export { generateDiffTree };
export default showDiff;
