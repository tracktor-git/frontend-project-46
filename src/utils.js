const getStatus = (item) => item.status ?? null;

const getChildren = (item) => item.children ?? item;

const getIndents = (status, replacer, count) => {
  const statusesWithLessIndent = ['updated', 'removed', 'added'];
  const STATUS_KEY_LENGTH = (statusesWithLessIndent.includes(status)) ? 2 : 0;
  const startIndent = replacer.repeat(count - STATUS_KEY_LENGTH);
  const endIndent = replacer.repeat(count);
  return { startIndent, endIndent };
};

export { getStatus, getChildren, getIndents };
