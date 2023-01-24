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
    let out = '';
    if (status === 'removed') {
      out = `Property '${path}' was removed`;
    }
    if (status === 'updated') {
      const previous = generateString(children.previous);
      const current = generateString(children.current);
      out = `Property '${path}' was updated. From ${previous} to ${current}`;
    }
    if (status === 'added') {
      const added = generateString(children);
      out = `Property '${path}' was added with value: ${added}`;
    }
    if (status === 'nested') {
      out = plain(children, path);
    }
    return out;
  });
  return result.filter((item) => item).join('\n');
};

export default plain;
