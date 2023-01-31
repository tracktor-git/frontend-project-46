import stylish from './stylish.js';
import plain from './plain.js';

export const json = (data) => JSON.stringify(data);

const getFormattedData = (diff, format) => {
  const formatters = { plain, json, stylish };
  if (!Object.hasOwn(formatters, format)) {
    throw new Error(`Unsupported format: ${format}`);
  }
  const formatter = formatters[format];
  return formatter(diff);
};

export default getFormattedData;
