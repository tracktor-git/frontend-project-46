#!/usr/bin/env node

import { program } from 'commander';
import { genDiff } from '../src/index.js';
import parse from '../parsers.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

const makeDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1.trim());
  const file2 = parse(filepath2.trim());
  const diff = genDiff(file1, file2);
  return diff;
};

const showDiff = (filepath1, filepath2) => {
  const result = makeDiff(filepath1, filepath2);
  const { format } = program.opts();
  if (format === 'stylish') {
    console.log(stylish(result));
  }
  if (format === 'plain') {
    console.log(plain(result));
  }
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action(showDiff)
  .arguments('<filepath1> <filepath2>');

program.parse();
