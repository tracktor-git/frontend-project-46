import _ from 'lodash';

const generateString = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  if (_.isString(item)) {
    return `'${item}'`;
  }
  return item;
};

const plain = (data, parent = '') => data.map((node) => {
  const { status, key } = node;
  const path = [parent, key].filter((item) => item).join('.');
  const {
    previous, current, value, children,
  } = node;
  if (status === 'removed') {
    return `Property '${path}' was removed`;
  }
  if (status === 'updated') {
    return `Property '${path}' was updated. From ${generateString(previous)} to ${generateString(current)}`;
  }
  if (status === 'added') {
    const added = generateString(value);
    return `Property '${path}' was added with value: ${added}`;
  }
  return status === 'nested' ? plain(children, path) : null;
}).filter((item) => item).join('\n');

export default plain;
