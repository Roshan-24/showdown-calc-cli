import { GenerationNum } from '@smogon/calc';
import { calcDamage } from '../utils/calcDamageUtil';
import { parseAttackerString, parseDefenderString } from '../utils/rawStringUtils';

export const calcFromRawString = (rawString: string, genString: string) => {
    const [attackerString, defenderString] = rawString.split('vs.').map(str => str.trim());

    const gen = Number(genString) as GenerationNum
    const [attacker, moveCategory] = parseAttackerString(attackerString, gen);
    const defender = parseDefenderString(defenderString, moveCategory, gen);

    const result = calcDamage(attacker, defender, gen);

    console.log(result.damage);
}
