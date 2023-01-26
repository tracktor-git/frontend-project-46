import stylish from './stylish.js';
import json from './json.js';
import plain from './plain.js';

const getFormattedData = (diff, format) => {
  const formatters = { plain, json, stylish };
  if (!Object.hasOwn(formatters, format)) {
    throw new Error(`Unsupported format: ${format}`);
  }
  const formatter = formatters[format];
  return formatter(diff);
};

export default getFormattedData;
