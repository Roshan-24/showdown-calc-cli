export const capitalize = (str: string) => str.split(' ').map(s => s[0].toUpperCase() + s.substr(1)).join(' ');

export { calcDamage } from "./calcDamageUtil";
export { damageCalcPrompts } from './damageCalcPrompts';
