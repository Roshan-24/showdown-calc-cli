#!/usr/bin/env node

import { program } from "commander";
import { damageCalc } from './handlers';

program
    .option('-i, --interactive', 'Interactive damage calculation')
    .option('-r, --raw-string <value>', 'Calculate damage from raw input string')
    .option('-g, --gen [value]', 'Generation', '8')
    .action(damageCalc);

program.parse(process.argv);
