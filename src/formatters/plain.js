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
  switch (status) {
    case 'unmodified':
      break;
    case 'removed':
      return `Property '${path}' was removed`;
    case 'updated':
      return `Property '${path}' was updated. From ${generateString(previous)} to ${generateString(current)}`;
    case 'added':
      return `Property '${path}' was added with value: ${generateString(value)}`;
    case 'nested':
      return plain(children, path);
    default:
      throw new Error(`Invalid node status: ${status}!`);
  }
  return null;
}).filter((item) => item).join('\n');

export default plain;
