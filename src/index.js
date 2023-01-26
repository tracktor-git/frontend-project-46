import { readFileSync } from 'node:fs';
import parse from './parsers.js';
import generateDiffTree from './generateDiffTree.js';
import getFormattedData from './formatters/index.js';

export const getExtension = (filename) => filename.split('.').at(-1);
export const getData = (filepath) => readFileSync(filepath, 'utf-8');

const makeDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const parsedData1 = parse(data1, getExtension(filepath1));
  const parsedData2 = parse(data2, getExtension(filepath2));
  const diffTree = generateDiffTree(parsedData1, parsedData2);
  return getFormattedData(diffTree, format);
};

export default makeDiff;
