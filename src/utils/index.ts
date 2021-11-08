export const capitalize = (str: string) => str ? str.split(' ').map(s => s[0].toUpperCase() + s.substr(1)).join(' ') : str;

export { calcDamage } from "./calcDamageUtil";
export { getDamageCalcPrompts } from './damageCalcPrompts';
