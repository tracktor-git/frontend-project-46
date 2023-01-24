import _ from 'lodash';
import { getStatus, getChildren } from '../index.js';

const json = (object) => {
  const iter = (data) => {
    const entries = _.entries(data).sort();
    const result = entries.map(([key, value]) => {
      const status = getStatus(value);
      const children = getChildren(value);
      if (status === 'nested') {
        return { name: key, status, children: iter(children) };
      }
      if (status === 'updated') {
        return {
          name: key, status, previous: children.previous, current: children.current,
        };
      }
      return { name: key, status, value: children };
    });
    return result;
  };
  const output = iter(object);
  return JSON.stringify(output);
};

export default json;
