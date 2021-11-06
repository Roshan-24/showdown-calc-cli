import { MOVES } from "@smogon/calc";
import inquirer from "inquirer";
import { capitalize } from ".";
import { IDamageCalcAnswers } from "../types";

const gen = 8;

const otherConditions = [
    'Gravity',
    'Reflect',
    'Light Screen'
]

const isMovePhysical = (answers: Partial<IDamageCalcAnswers>) => MOVES[gen][capitalize(answers.move!)].category === 'Physical';

const isMoveSpecial = (answers: Partial<IDamageCalcAnswers>) => MOVES[gen][capitalize(answers.move!)].category === 'Special';

const validateMove = (input: string) => {
    if (MOVES[gen][capitalize(input)].category === 'Status') return 'Enter a damaging move';
    return true;
}

const validateEv = (input: string) => {
    if (Number(input) >= 0 && Number(input) <= 255) return true;
    return 'Enter a valid EV value';
}

const validateBoost = (input: string) => {
    if (Number(input) >= -6 && Number(input) <= 6) return true;
    return 'Enter a valid stat boost';
}

const filterWeather = (input: string) => input === 'No Weather' ? undefined : input;

const filterTerrain = (input: string) => input === 'No Terrain' ? undefined : input;

const weatherChoices = [
    'No Weather',
    'Sun',
    'Rain',
    'Hail',
    'Sand'
]

const terrainChoices = [
    'No Terrain',
    'Electric',
    'Psychic',
    'Misty',
    'Grassy'
]

export const damageCalcPrompts: inquirer.QuestionCollection<any> = [
    {
        name: 'attackerSpecies',
        message: 'Species of the attacker',
        filter: capitalize
    },
    {
        name: 'move',
        message: 'Move used by the attacker',
        filter: capitalize,
        validate: validateMove
    },
    {
        name: 'atkEv',
        message: 'Attack EVs of the attacker',
        default: 0,
        validate: validateEv,
        when: isMovePhysical
    },
    {
        name: 'spaEv',
        message: 'Special Attack EVs of the attacker',
        default: 0,
        when: isMoveSpecial
    },
    {
        name: 'atkBoost',
        message: 'Attack boost of the attacker, if any',
        default: 0,
        validate: validateBoost,
        when: isMovePhysical
    },
    {
        name: 'spaBoost',
        message: 'Special Attack boost of the attacker, if any',
        default: 0,
        validate: validateBoost,
        when: isMoveSpecial
    },
    {
        name: 'attackerNature',
        message: 'Nature of the attacker',
        default: 'Bashful',
        filter: capitalize,
    },
    {
        name: 'attackerItem',
        message: 'Attacker\'s item',
        default: 'Non-damage impacting item',
    },
    {
        name: 'attackerAbility',
        message: 'Attacker\'s ability',
        default: 'Non-damage impacting ability',
    },
    {
        name: 'defenderSpecies',
        message: 'Species of the defender',
        filter: capitalize,
    },
    {
        name: 'hpEv',
        message: 'HP EVs of the defender',
        default: 0,
        validate: validateEv
    },
    {
        name: 'defEv',
        message: 'Defense EVs of the defender',
        validate: validateEv,
        when: isMovePhysical
    },
    {
        name: 'spdEv',
        message: 'Special Defense EVs of the defender',
        default: 0,
        validate: validateEv,
        when: isMoveSpecial
    },
    {
        name: 'defBoost',
        message: 'Defense boost of the defender, if any',
        default: 0,
        validate: validateBoost,
        when: isMovePhysical
    },
    {
        name: 'spdBoost',
        message: 'Special Defense boost of the defender, if any',
        default: 0,
        validate: validateBoost,
        when: isMoveSpecial
    },
    {
        name: 'defenderNature',
        message: 'Nature of the defender',
        default: 'Bashful',
        filter: capitalize,
    },
    {
        name: 'defenderItem',
        message: 'Defender\'s item',
        default: 'Non-damage impacting item',
    },
    {
        name: 'defenderAbility',
        message: 'Defender\'s ability',
        default: 'Non-damage impacting ability',
    },
    {
        name: 'weather',
        message: 'Battle weather',
        type: 'list',
        choices: weatherChoices,
        filter: filterWeather,
    },
    {
        name: 'terrain',
        message: 'Battle terrain',
        type: 'list',
        choices: terrainChoices,
        filter: filterTerrain,
    },
    {
        name: 'otherBattleConditions',
        type: 'checkbox',
        choices: otherConditions
    }
]
