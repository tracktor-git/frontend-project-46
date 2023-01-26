import _ from 'lodash';
import {
  getStatus, getChildren, getKey, getValue,
} from '../utils.js';

const generateString = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  if (_.isString(item)) {
    return `'${item}'`;
  }
  return item;
};

const plain = (data, parent = '') => {
  const clone = _.cloneDeep(data);

  return clone.map((node) => {
    const status = getStatus(node);
    const key = getKey(node);
    const path = [parent, key].filter((item) => item).join('.');
    if (status === 'removed') {
      return `Property '${path}' was removed`;
    }
    if (status === 'updated') {
      const { previous, current } = node;
      return `Property '${path}' was updated. From ${generateString(previous)} to ${generateString(current)}`;
    }
    if (status === 'added') {
      const value = getValue(node);
      const added = generateString(value);
      return `Property '${path}' was added with value: ${added}`;
    }
    if (status === 'nested') {
      const children = getChildren(node);
      return plain(children, path);
    }
    return null;
  }).filter((item) => item).join('\n');
};

export default plain;
