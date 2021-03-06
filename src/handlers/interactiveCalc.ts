import inquirer from "inquirer";
import { calcDamage, capitalize, displayResult, getDamageCalcPrompts } from "../utils";
import { IBattleCondition, IDamageCalcAnswers, pokemonInfo } from "../types";

const filterAbility = (input: string) => {
    if (input === 'Non-damage impacting ability') return 'Run Away';
    return capitalize(input);
}

const filterItem = (input: string) => {
    if (input === 'Non-damage impacting item') return undefined;
    return capitalize(input);
}

export const interactiveCalc = async (gen: number) => {
    try {
        const ans: IDamageCalcAnswers = await inquirer.prompt(getDamageCalcPrompts(gen));

        const attacker: pokemonInfo = {
            name: ans.attackerSpecies,
            ability: filterAbility(ans.attackerAbility),
            item: filterItem(ans.attackerItem),
            ...gen >= 3 && {
                evs: {
                    atk: ans.atkEv ?? 0,
                    spa: ans.spaEv ?? 0
                }
            },
            boosts: {
                atk: ans.atkBoost ?? 0,
                spa: ans.spaBoost ?? 0,
                ...gen === 1 && { spd: ans.spaBoost ?? 0 }
            },
            nature: ans.attackerNature,
            move: ans.move
        }

        const defender: pokemonInfo = {
            name: ans.defenderSpecies,
            ability: filterAbility(ans.defenderAbility),
            item: filterItem(ans.defenderItem),
            ...gen >= 3 && {
                evs: {
                    hp: ans.hpEv,
                    def: ans.defEv ?? 0,
                    spd: ans.spdEv ?? 0
                }
            },
            boosts: {
                def: ans.defBoost ?? 0,
                ...gen === 1 && { spa: ans.spdBoost ?? 0 },
                spd: ans.spdBoost ?? 0
            },
            nature: ans.defenderNature,
        }

        const battleCondition: IBattleCondition = {
            weather: ans.weather,
            terrain: ans.terrain,
            isGravity: ans.otherBattleConditions.includes('Gravity'),
            defenderSide: {
                isReflect: ans.otherBattleConditions.includes('Reflect'),
                isLightScreen: ans.otherBattleConditions.includes('Light Screen')
            }
        }

        const result = calcDamage(attacker, defender, gen, battleCondition);
        displayResult(result);
    } catch (err) {
        console.log('\nSomething went wrong, check your inputs\n');
    }
}
