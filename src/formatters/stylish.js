import _ from 'lodash';
import { getStatus, getChildren, getIndents } from '../utils.js';

const statusKeys = {
  nested: '',
  unmodified: '',
  added: '+ ',
  removed: '- ',
  updated: { previous: '- ', current: '+ ' },
};

const stylish = (object) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return `${data}`;
    }

    const REPLACER_REPEAT_COUNT = 4;
    const { endIndent } = getIndents(null, ' ', (depth - 1) * REPLACER_REPEAT_COUNT);
    const entries = _.entries(data);
    const sortedEntries = _.sortBy(entries);

    const result = sortedEntries.map(([key, value]) => {
      const status = getStatus(value);
      const children = getChildren(value);
      const { startIndent } = getIndents(status, ' ', depth * REPLACER_REPEAT_COUNT);
      const statusKey = statusKeys[status] ?? '';
      if (status === 'updated') {
        return `${startIndent}${statusKey.previous}${key}: ${iter(children.previous, depth + 1)}\n`
        + `${startIndent}${statusKey.current}${key}: ${iter(children.current, depth + 1)}`;
      }
      return `${startIndent}${statusKey}${key}: ${iter(children, depth + 1)}`;
    });

    const output = ['{', ...result, `${endIndent}}`].join('\n');
    return output;
  };

  return iter(object, 1);
};

export default stylish;
