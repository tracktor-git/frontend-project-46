import _ from 'lodash';
import parse from '../parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const genDiff = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);

  const diff1 = keys1.reduce((acc, key) => {
    const [value1, value2] = [file1[key], file2[key]];
    if (keys2.includes(key)) {
      if (_.isEqual(value1, value2)) {
        return { ...acc, [key]: { status: 'unmodified', children: value1 } };
      }
      if (_.isObject(value1) && _.isObject(value2)) {
        return { ...acc, [key]: { status: 'nested', children: genDiff(value1, value2) } };
      }
      return { ...acc, [key]: { status: 'updated', previous: value1, current: value2 } };
    }
    return { ...acc, [key]: { status: 'removed', children: value1 } };
  }, {});

  const diff2 = keys2.reduce((acc2, key2) => {
    const result = { ...acc2, [key2]: { status: 'added', children: file2[key2] } };
    return !keys1.includes(key2) ? result : acc2;
  }, {});

  return { ...diff1, ...diff2 };
};

const makeDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const diffTree = genDiff(file1, file2);
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

export { genDiff };
export default showDiff;
