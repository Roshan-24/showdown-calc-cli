import { calcDamage, capitalize, displayResult } from '../utils';
import { parseAttackerString, parseDefenderString } from '../utils/rawStringUtils';

export const calcFromRawString = (rawString: string, gen: number) => {
    try {
        if (gen !== 8) console.log('\nRaw string mode currently doesn\'t support previous gens, gen taken as 8')
        gen = 8;

        const [attackerString, defenderString] = rawString.split('vs.').map(str => capitalize(str.trim()));

        const [attacker, moveCategory] = parseAttackerString(attackerString, gen);
        const defender = parseDefenderString(defenderString, moveCategory, gen);

        const result = calcDamage(attacker, defender, gen);
        displayResult(result);
    } catch (err) {
        console.log('\nInvalid input string');
    }
}
