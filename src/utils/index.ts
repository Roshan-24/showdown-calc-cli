import { MOVES, Result } from "@smogon/calc";

const specialTypes = [
    'Fire',
    'Water',
    'Electric',
    'Psychic',
    'Dark',
    'Ice',
    'Grass',
    'Fairy',
    'Dragon'
];

export const capitalize = (str: string) => str ? str.split(' ').map(s => s[0].toUpperCase() + s.substr(1)).join(' ') : str;

export const isMovePhysical = (move: string, gen: number) => {
    if (gen <= 3) return !specialTypes.includes(MOVES[gen][move].type);
    return (MOVES[gen][move].category === 'Physical')
}

export const isMoveSpecial = (move: string, gen: number) => {
    if (gen <= 3) return specialTypes.includes(MOVES[gen][move].type);
    return (MOVES[gen][move].category === 'Special')
}

export const displayResult = (result: Result) => {
    console.log('\n');
    if (result.damage === 0) result.damage = [0.1, 0.1, 0.1];
    if (result.kochance().text) return console.log(result.desc());
    if (result.damage instanceof Array && result.damage.join(',') === [0.1, 0.1, 0.1].join(','))
        return console.log(result.desc().split(':')[0] + ' 0-0 (0 - 0%) -- possibly the worst move ever');
    return console.log(result.desc() + ' -- possibly the worse move ever');
}

export { calcDamage } from "./calcDamageUtil";
export { getDamageCalcPrompts } from './damageCalcPrompts';
