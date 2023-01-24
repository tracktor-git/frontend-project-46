import _ from 'lodash';
import { getStatus, getChildren } from '../utils.js';

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
  const entries = _.entries(object);
  const sortedEnntries = _.sortBy(entries);
  return sortedEnntries.map(([key, value]) => {
    const status = getStatus(value);
    const children = getChildren(value);
    const path = [parent, key].filter((item) => item).join('.');
    if (status === 'removed') {
      return `Property '${path}' was removed`;
    }
    if (status === 'updated') {
      const previous = generateString(children.previous);
      const current = generateString(children.current);
      return `Property '${path}' was updated. From ${previous} to ${current}`;
    }
    if (status === 'added') {
      const added = generateString(children);
      return `Property '${path}' was added with value: ${added}`;
    }
    if (status === 'nested') {
      return plain(children, path);
    }
    return null;
  })
    .filter((item) => item).join('\n');
};

export default plain;
