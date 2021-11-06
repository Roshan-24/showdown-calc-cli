import { calculate, Pokemon, Move, GenerationNum, Field } from "@smogon/calc";
import { IBattleCondition, pokemonInfo } from "../types";

export const calcDamage = (attacker: pokemonInfo, defender: pokemonInfo, gen: GenerationNum, battleCondition?: IBattleCondition) => {
    return calculate(
        gen,
        new Pokemon(gen, attacker.name, {
            nature: attacker.nature,
            item: attacker.item,
            ability: attacker.ability,
            evs: attacker.evs,
            boosts: attacker.boosts
        }),
        new Pokemon(gen, defender.name, {
            nature: defender.nature,
            item: defender.item,
            ability: defender.ability,
            evs: defender.evs,
            boosts: defender.boosts
        }),
        new Move(gen, attacker.move!),
        new Field(battleCondition)
    );
}
