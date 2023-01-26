import _ from 'lodash';

const json = (data) => {
  const clone = _.cloneDeep(data);
  const result = JSON.stringify(clone);
  return result;
};

export default json;
