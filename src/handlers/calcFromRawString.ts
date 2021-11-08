import { calcDamage, capitalize } from '../utils';
import { parseAttackerString, parseDefenderString } from '../utils/rawStringUtils';

export const calcFromRawString = (rawString: string, gen: number) => {
    try {
        const [attackerString, defenderString] = rawString.split('vs.').map(str => capitalize(str.trim()));

        const [attacker, moveCategory] = parseAttackerString(attackerString, gen);
        const defender = parseDefenderString(defenderString, moveCategory, gen);

        const result = calcDamage(attacker, defender, gen);

        console.log(result.desc());
    } catch (err) {
        console.log('Invalid input string');
    }
}
