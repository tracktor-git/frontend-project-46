#!/usr/bin/env node

import { program } from 'commander';
import { genDiff } from '../src/index.js';
import parse from '../parsers.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

const makeDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1.trim());
  const file2 = parse(filepath2.trim());
  const diffTree = genDiff(file1, file2);
  return diffTree;
};

const showDiff = (filepath1, filepath2) => {
  const diff = makeDiff(filepath1, filepath2);
  const { format } = program.opts();
  if (format === 'stylish') {
    console.log(stylish(diff));
  }
  if (format === 'plain') {
    console.log(plain(diff));
  }
  if (format === 'json') {
    console.log(json(diff));
  }
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action(showDiff)
  .arguments('<filepath1> <filepath2>');

program.parse();
