#!/usr/bin/env node

import { Command } from "commander";
import { damageCalc } from './handlers';

const program = new Command();

program
    .option('-i, --interactive', 'Interactive damage calculation')
    .option('-r, --raw-string <value>', 'Calculate damage from raw input string')
    .option('-g, --gen <value>', 'Generation', '8')
    .action(answers => damageCalc(answers, program));

program.parse(process.argv);
