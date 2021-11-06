import { Command } from "commander";
import { interactiveCalc, calcFromRawString } from ".";

interface damageCalcOpts {
    interactive: boolean,
    rawString: string,
    gen: string
}

export const damageCalc = ({ interactive, rawString, gen }: damageCalcOpts, program: Command) => {
    if (interactive) interactiveCalc();
    else if (rawString) calcFromRawString(rawString, gen);
    else program.help();
}
