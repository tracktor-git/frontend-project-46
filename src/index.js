import _ from 'lodash';
import parse from '../parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const generateDiffTree = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.uniq(_.concat(keys1, keys2));

  return _.sortBy(keys).map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!_.has(data1, key)) {
      return { key, status: 'added', value: value2 };
    }
    if (!_.has(data2, key)) {
      return { key, status: 'removed', value: value1 };
    }
    if (_.isEqual(value1, value2)) {
      return { key, status: 'unmodified', value: value2 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, status: 'nested', children: generateDiffTree(value1, value2) };
    }
    return {
      key, status: 'updated', previous: value1, current: value2,
    };
  });
};

const makeDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
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
