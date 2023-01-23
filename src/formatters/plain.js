import _ from 'lodash';
import { getStatus, getChildren } from '../index.js';

const generateString = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  if (_.isString(item)) {
    return `'${item}'`;
  }
  return item;
};

const plain = (object, parent = '') => {
  const entries = _.entries(object).sort();
  const result = entries.map(([key, value]) => {
    const status = getStatus(value);
    const children = getChildren(value);
    const path = [parent, key].filter((item) => item).join('.');
    if (status === 'deleted') {
      return `Property '${path}' was removed`;
    }
    if (status === 'updated') {
      const previous = generateString(children.previous);
      const current = generateString(children.current);
      return `Property '${path}' was updated. From ${previous} to ${current}`;
    }
    if (status === 'added') {
      const out = generateString(children);
      return `Property '${path}' was added with value: ${out}`;
    }
    if (status === 'nested') {
      return plain(children, path);
    }
    return '';
  });
  return result.filter((item) => item).join('\n');
};

export default plain;
