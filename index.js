import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

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
    return { ...acc, [key]: { status: 'deleted', children: value1 } };
  }, {});

  const diff2 = keys2.reduce((acc2, key2) => {
    const result = { ...acc2, [key2]: { status: 'added', children: file2[key2] } };
    return !keys1.includes(key2) ? result : acc2;
  }, {});

  return { ...diff1, ...diff2 };
};

export { getFixturePath, genDiff };
