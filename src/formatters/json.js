import _ from 'lodash';
import { getStatus, getChildren } from '../utils.js';

const json = (object) => {
  const iter = (data) => {
    const entries = _.entries(data);
    const sortedEntries = entries.sort();
    return sortedEntries.map(([name, value]) => {
      const status = getStatus(value);
      const children = getChildren(value);
      if (status === 'nested') {
        return { name, status, children: iter(children) };
      }
      if (status === 'updated') {
        return {
          name, status, previous: children.previous, current: children.current,
        };
      }
      return { name, status, value: children };
    });
  };
  const output = iter(object);
  return JSON.stringify(output);
};

export default json;
