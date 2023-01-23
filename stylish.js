import _ from 'lodash';

const getStatus = (item) => item.status ?? null;
const getChildren = (item) => item.children ?? item;

const statusKeys = {
  nested: '',
  unmodified: '',
  added: '+ ',
  deleted: '- ',
  updated: { previous: '- ', current: '+ ' },
};

const setIndent = (status, replacer, depth) => {
  let indent;
  const STATUS_KEY_LENGTH = 2;
  if (status === 'updated' || status === 'deleted' || status === 'added') {
    indent = replacer.repeat(depth * 4 - STATUS_KEY_LENGTH);
  } else {
    indent = replacer.repeat(depth * 4);
  }
  return indent;
};

const stylish = (object, repeat = 4, replacer = ' ') => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return `${data}`;
    }
    const entries = _.entries(data).sort();
    const result = entries.map(([key, value]) => {
      const status = getStatus(value);
      const children = getChildren(value);
      const startIndent = setIndent(status, replacer, depth);
      const statusKey = statusKeys[status] ?? '';
      if (status === 'updated') {
        const deleted = `${startIndent}${statusKey.previous}${key}: ${iter(children.previous, depth + 1)}`;
        const added = `${startIndent}${statusKey.current}${key}: ${iter(children.current, depth + 1)}`;
        return `${deleted}\n${added}`;
      }
      return `${startIndent}${statusKey}${key}: ${iter(children, depth + 1)}`;
    });

    const endIndent = replacer.repeat((depth - 1) * repeat);
    const output = ['{', ...result, `${endIndent}}`].join('\n');
    return output;
  };
  return iter(object, 1);
};

export default stylish;
