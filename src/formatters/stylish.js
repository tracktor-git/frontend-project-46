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
      throw new Error('Invalid status');
  }
};

const stringify = (object, replacer, repeatCount) => {
  if (!_.isObject(object)) {
    return `${object}`;
  }
  const lineIndent = replacer.repeat(repeatCount);
  const lines = _.entries(object).map(([key, value]) => {
    const outputValue = stringify(value, replacer, repeatCount + 4);
    const outputString = `${lineIndent}${key}: ${outputValue}`;
    return outputString;
  });

  const braceIndent = replacer.repeat(repeatCount - 4);
  return ['{', ...lines, `${braceIndent}}`].join('\n');
};

const stylish = (data, depth = 1, replacer = ' ', repeatCount = 4) => {
  const lines = data.map((item) => {
    const { key, status, value } = item;
    const lineIndent = status === 'nested'
      ? replacer.repeat((depth * repeatCount))
      : replacer.repeat((depth * repeatCount) - 2);
    if (status === 'added' || status === 'unmodified' || status === 'removed') {
      const icon = getStatusIcon(status);
      return `${lineIndent}${icon}${key}: ${stringify(value, ' ', (depth * repeatCount) + repeatCount)}`;
    }
    if (status === 'updated') {
      const { previous, current } = item;
      const plusIcon = getStatusIcon('added');
      const minusIcon = getStatusIcon('removed');
      const added = `${lineIndent}${plusIcon}${key}: ${stringify(current, ' ', (depth * repeatCount) + repeatCount)}`;
      const deleted = `${lineIndent}${minusIcon}${key}: ${stringify(previous, ' ', (depth * repeatCount) + repeatCount)}`;
      return [deleted, added].join('\n');
    }
    const { children } = item;
    return `${lineIndent}${key}: ${stylish(children, depth + 1)}`;
  });
  const braceIndent = replacer.repeat((depth - 1) * repeatCount);
  return ['{', ...lines, `${braceIndent}}`].join('\n');
};

export default stylish;
