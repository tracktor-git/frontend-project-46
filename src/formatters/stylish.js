import _ from 'lodash';

export const getStatusIcon = (status) => {
  switch (status) {
    case 'nested':
    case 'unmodified':
      return '  ';
    case 'removed':
      return '- ';
    case 'added':
      return '+ ';
    default:
      return '';
  }
};

const getIndents = (depth, repeatCount = 4, replacer = ' ') => replacer.repeat(depth * repeatCount);

const stringify = (node, depth = 1) => {
  if (!_.isObject(node)) {
    return String(node);
  }
  const lineIndents = getIndents(depth);
  const braceIndents = getIndents(depth - 1);
  const lines = _.entries(node).map(([key, value]) => `${lineIndents}${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...lines, `${braceIndents}}`].join('\n');
};

const stylish = (nodes, depth = 1) => {
  const lineIndents = getIndents(depth).slice(0, -2);
  const braceIndents = getIndents(depth - 1);
  const result = nodes.map((node) => {
    const {
      key, status, value, children, previous, current,
    } = node;
    const icon = getStatusIcon(status);
    switch (status) {
      case 'removed':
      case 'added':
      case 'unmodified':
        return `${lineIndents}${icon}${key}: ${stringify(value, depth + 1)}`;
      case 'updated':
        return [
          `${lineIndents}- ${key}: ${stringify(previous, depth + 1)}`,
          `${lineIndents}+ ${key}: ${stringify(current, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return `${lineIndents}${icon}${key}: ${stylish(children, depth + 1)}`;
      default:
        return null;
    }
  });
  return ['{', ...result, `${braceIndents}}`]
    .filter((item) => !_.isNull(item))
    .join('\n');
};

export default stylish;
