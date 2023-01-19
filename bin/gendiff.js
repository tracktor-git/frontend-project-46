#!/usr/bin/env node

import { program } from 'commander';
import { getData, genDiff } from '../index.js';

const showDiff = (filepath1, filepath2) => {
  const file1 = getData(filepath1.trim());
  const file2 = getData(filepath2.trim());
  const diff = genDiff(file1, file2);
  console.log(diff);
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .action(showDiff)
  .arguments('<filepath1> <filepath2>');

program.parse();
