const getStatus = (item) => item.status ?? null;

const getChildren = (item) => item.children ?? item;

const getIndents = (status, replacer, count) => {
  const STATUS_KEY_LENGTH = 2;
  const indents = {};
  if (status === 'updated' || status === 'removed' || status === 'added') {
    indents.startIndent = replacer.repeat(count - STATUS_KEY_LENGTH);
  } else {
    indents.startIndent = replacer.repeat(count);
  }
  indents.endIndent = replacer.repeat(count);
  return indents;
};

export { getStatus, getChildren, getIndents };
