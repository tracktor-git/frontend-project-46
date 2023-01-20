import { load as yamlParse } from 'js-yaml';
import { readFileSync } from 'node:fs';

const parse = (filepath) => {
  const extension = filepath.split('.').at(-1);
  const data = readFileSync(filepath, 'utf-8');

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
