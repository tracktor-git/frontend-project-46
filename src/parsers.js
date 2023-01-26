import { load as yamlParse } from 'js-yaml';

const parse = (data, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yamlParse(data);
    default:
      throw new Error('Not supported file extension');
  }
};

export default parse;
