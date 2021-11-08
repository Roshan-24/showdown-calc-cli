import { SPECIES, ITEMS, ABILITIES, NATURES, MOVES } from "@smogon/calc";
import { capitalize } from ".";

export const validateSpecies = (input: string, gen: number) => {
    if (Object.keys(SPECIES[gen]).includes(capitalize(input))) return true;
    return 'Enter a valid pokemon name';
}

export const validateItem = (input: string, gen: number) => {
    const item = capitalize(input);
    if (item === 'Non-damage Impacting Item' || ITEMS[gen].includes(item)) return true;
    return 'Enter a valid item';
}

export const validateAbility = (input: string, gen: number) => {
    const ability = capitalize(input);
    if (ability === 'Non-damage Impacting Ability' || ABILITIES[gen].includes(ability)) return true;
    return 'Enter a valid ability';
}

export const validateNature = (input: string) => {
    if (Object.keys(NATURES).includes(capitalize(input))) return true;
    return 'Enter a valid nature';
}

export const validateMove = (input: string, gen: number) => {
    const move = capitalize(input);
    if (Object.keys(MOVES[gen]).includes(move) && MOVES[gen][move].category !== 'Status') return true;
    return 'Enter a valid damaging move';
}

export const validateEv = (input: string) => {
    if (Number(input) >= 0 && Number(input) <= 255) return true;
    return 'Enter a valid EV value';
}

export const validateBoost = (input: string) => {
    if (Number(input) >= -6 && Number(input) <= 6) return true;
    return 'Enter a valid stat boost';
}
