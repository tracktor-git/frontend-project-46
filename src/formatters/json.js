import _ from 'lodash';
import {
  getStatus, getChildren, getKey, getValue,
} from '../utils.js';

const json = (data) => {
  const iter = (item) => item.map((node) => {
    const status = getStatus(node);
    const children = getChildren(node);
    const name = getKey(node);
    if (status === 'nested') {
      return { name, status, children: iter(children) };
    }
    if (status === 'updated') {
      const { previous, current } = node;
      return {
        name, status, previous, current,
      };
    }
    const value = getValue(node);
    return { name, status, value };
  });
  const clone = _.cloneDeep(data);
  const result = JSON.stringify(iter(clone));
  return result;
};

export default json;
