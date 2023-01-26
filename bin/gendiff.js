#!/usr/bin/env node

import { program } from 'commander';
import makeDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(makeDiff(filepath1, filepath2, program.opts().format));
  })
  .parse();
