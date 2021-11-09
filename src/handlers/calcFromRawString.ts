import { calcDamage, capitalize, displayResult } from '../utils';
import { parseAttackerString, parseDefenderString } from '../utils/rawStringUtils';

export const calcFromRawString = (rawString: string, gen: number) => {
    try {
        const [attackerString, defenderString] = rawString.split('vs.').map(str => capitalize(str.trim()));

        const [attacker, moveCategory] = parseAttackerString(attackerString, gen);
        const defender = parseDefenderString(defenderString, moveCategory, gen);

        const result = calcDamage(attacker, defender, gen);
        displayResult(result);
    } catch (err) {
        console.log('\nInvalid input string');
    }
}
