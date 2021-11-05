import { calculate, Pokemon, Move, GenerationNum } from "@smogon/calc";
import { pokemonInfo } from "./rawStringUtils";

export const calcDamage = (attacker: pokemonInfo, defender: pokemonInfo, gen: GenerationNum) => {
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
        new Move(gen, attacker.move!)
    );
}
