import { interactiveCalc, calcFromRawString } from ".";

interface damageCalcOpts {
    interactive: boolean,
    rawString: string,
    gen: string
}

export const damageCalc = ({ interactive, rawString, gen }: damageCalcOpts) => {
    if (interactive) interactiveCalc();
    else calcFromRawString(rawString, gen);
}
