import { calculate, Pokemon, Move, GenerationNum, Field } from "@smogon/calc";
import { IBattleCondition, pokemonInfo } from "../types";

export const calcDamage = (attacker: pokemonInfo, defender: pokemonInfo, gen: number, battleCondition?: IBattleCondition) => {
    return calculate(
        gen as GenerationNum,
        new Pokemon(gen as GenerationNum, attacker.name, {
            nature: attacker.nature,
            item: attacker.item,
            ability: attacker.ability,
            evs: attacker.evs,
            boosts: attacker.boosts
        }),
        new Pokemon(gen as GenerationNum, defender.name, {
            nature: defender.nature,
            item: defender.item,
            ability: defender.ability,
            evs: defender.evs,
            boosts: defender.boosts
        }),
        new Move(gen as GenerationNum, attacker.move!),
        new Field(battleCondition)
    );
}
