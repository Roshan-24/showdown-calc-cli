import { Command } from "commander";
import { interactiveCalc, calcFromRawString } from ".";

interface damageCalcOpts {
    interactive: boolean,
    rawString: string,
    gen: string
}

export const damageCalc = ({ interactive, rawString, gen }: damageCalcOpts, program: Command) => {
    const genNumber = Number(gen);
    if (isNaN(genNumber) || genNumber < 1 || genNumber > 8) console.log('Enter a valid generation');
    else if (interactive) interactiveCalc(genNumber);
    else if (rawString) calcFromRawString(rawString, genNumber);
    else program.help();
}
