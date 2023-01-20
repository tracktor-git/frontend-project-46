import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const stringify = (data, replacer = ' ', spacesCount = 1) => {
  const iter = (innerData, depth) => {
    if (!_.isObject(innerData)) {
      return `${innerData}`;
    }

    const entries = Object.entries(innerData);
    const strings = entries.map(([key, value]) => {
      const startIndent = replacer.repeat(depth * spacesCount);
      return `${startIndent}${key}: ${iter(value, depth + 1)}`;
    });
    const endIndent = replacer.repeat((depth - 1) * spacesCount);
    const result = ['{', ...strings, `${endIndent}}`].join('\n');
    return result;
  };
  return iter(data, 1);
};

const getData = (filepath) => {
  const format = _.last(filepath.split('.'));
  const data = readFileSync(filepath, 'utf-8');

  switch (format) {
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error('Not supported format');
  }
};

const genDiff = (file1, file2) => {
  const keys1 = _.keys(file1).sort();
  const keys2 = _.keys(file2).sort();

  const obj1 = keys1.reduce((acc, key) => {
    if (keys2.includes(key)) {
      return file1[key] === file2[key]
        ? { ...acc, [`  ${key}`]: file1[key] }
        : { ...acc, [`- ${key}`]: file1[key], [`+ ${key}`]: file2[key] };
    }
    return { ...acc, [`- ${key}`]: file1[key] };
  }, {});

  const obj2 = keys2.reduce((acc, key) => (!keys1.includes(key)
    ? { ...acc, [`+ ${key}`]: file2[key] }
    : { ...acc }), {});

  const result = { ...obj1, ...obj2 };
  return stringify(result);
};

export { getFixturePath, genDiff, getData };
