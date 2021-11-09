import inquirer from "inquirer";
import { capitalize, isMovePhysical, isMoveSpecial } from ".";
import { validateSpecies, validateMove, validateEv, validateBoost, validateNature, validateItem, validateAbility } from "./damagePromptValdations";

const getOtherConditions = (gen: number) => [
    ...gen >= 4 ? ['Gravity'] : [],
    'Reflect',
    'Light Screen'
]

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

export const getDamageCalcPrompts = (gen: number): inquirer.QuestionCollection<any> => [
    {
        name: 'attackerSpecies',
        message: 'Species of the attacker',
        filter: capitalize,
        validate: input => validateSpecies(input, gen)
    },
    {
        name: 'move',
        message: 'Move used by the attacker',
        filter: capitalize,
        validate: input => validateMove(input, gen)
    },
    {
        name: 'atkEv',
        message: 'Attack EVs of the attacker',
        default: 0,
        validate: validateEv,
        when: ans => isMovePhysical(ans.move, gen) && gen >= 3
    },
    {
        name: 'spaEv',
        message: 'Special Attack EVs of the attacker',
        default: 0,
        validate: validateEv,
        when: ans => isMoveSpecial(ans.move, gen) && gen >= 3
    },
    {
        name: 'atkBoost',
        message: 'Attack boost of the attacker, if any',
        default: 0,
        validate: validateBoost,
        when: ans => isMovePhysical(ans.move, gen)
    },
    {
        name: 'spaBoost',
        message: () => (gen === 1 ? 'Special' : 'Special Attack') + ' boost of the attacker, if any',
        default: 0,
        validate: validateBoost,
        when: ans => isMoveSpecial(ans.move, gen)
    },
    {
        name: 'attackerNature',
        message: 'Nature of the attacker',
        default: 'Bashful',
        filter: capitalize,
        validate: validateNature,
        when: () => gen >= 3
    },
    {
        name: 'attackerItem',
        message: 'Attacker\'s item',
        default: 'Non-damage impacting item',
        validate: input => validateItem(input, gen),
        when: () => gen >= 2
    },
    {
        name: 'attackerAbility',
        message: 'Attacker\'s ability',
        default: 'Non-damage impacting ability',
        validate: input => validateAbility(input, gen),
        when: () => gen >= 3
    },
    {
        name: 'defenderSpecies',
        message: 'Species of the defender',
        filter: capitalize,
        validate: input => validateSpecies(input, gen)
    },
    {
        name: 'hpEv',
        message: 'HP EVs of the defender',
        default: 0,
        validate: validateEv,
        when: () => gen >= 3
    },
    {
        name: 'defEv',
        message: 'Defense EVs of the defender',
        default: 0,
        validate: validateEv,
        when: ans => isMovePhysical(ans.move, gen) && gen >= 3
    },
    {
        name: 'spdEv',
        message: 'Special Defense EVs of the defender',
        default: 0,
        validate: validateEv,
        when:  ans => isMoveSpecial(ans.move, gen) && gen >= 3
    },
    {
        name: 'defBoost',
        message: 'Defense boost of the defender, if any',
        default: 0,
        validate: validateBoost,
        when: ans => isMovePhysical(ans.move, gen)
    },
    {
        name: 'spdBoost',
        message: 'Special Defense boost of the defender, if any',
        default: 0,
        validate: validateBoost,
        when:  ans => isMoveSpecial(ans.move, gen)
    },
    {
        name: 'defenderNature',
        message: 'Nature of the defender',
        default: 'Bashful',
        filter: capitalize,
        validate: validateNature,
        when: () => gen >= 3
    },
    {
        name: 'defenderItem',
        message: 'Defender\'s item',
        default: 'Non-damage impacting item',
        validate: input => validateItem(input, gen),
        when: () => gen >= 2
    },
    {
        name: 'defenderAbility',
        message: 'Defender\'s ability',
        default: 'Non-damage impacting ability',
        validate: input => validateAbility(input, gen),
        when: () => gen >= 3
    },
    {
        name: 'weather',
        message: 'Battle weather',
        type: 'list',
        choices: weatherChoices,
        filter: filterWeather,
        when: () => gen >= 2
    },
    {
        name: 'terrain',
        message: 'Battle terrain',
        type: 'list',
        choices: terrainChoices,
        filter: filterTerrain,
        when: gen >= 6
    },
    {
        name: 'otherBattleConditions',
        message: 'Other Battle Conditions',
        type: 'checkbox',
        choices: getOtherConditions
    }
]
