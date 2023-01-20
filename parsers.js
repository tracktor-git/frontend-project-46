import { load as yamlParse } from 'js-yaml';
import { readFileSync } from 'node:fs';

const parse = (filepath) => {
  const extension = filepath.split('.').at(-1);
  const getData = (path) => readFileSync(path, 'utf-8');

  switch (extension) {
    case 'json':
      return JSON.parse(getData(filepath));
    case 'yaml':
    case 'yml':
      return yamlParse(getData(filepath));
    default:
      throw new Error('Not supported file extension');
  }
};

export default parse;
