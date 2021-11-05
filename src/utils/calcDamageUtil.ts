import { calculate, Pokemon, Move, GenerationNum } from "@smogon/calc";
import { pokemonInfo } from "./rawStringUtils";

export const calcDamage = (attacker: pokemonInfo, defender: pokemonInfo, gen: GenerationNum) => {
    console.log(attacker, defender)
    return calculate(
        gen,
        new Pokemon(gen, attacker.name, {
            nature: attacker.nature,
            item: attacker.item,
            evs: attacker.evs,
            boosts: attacker.boosts
        }),
        new Pokemon(gen, defender.name, {
            nature: defender.nature,
            item: defender.item,
            evs: defender.evs,
            boosts: defender.boosts
        }),
        new Move(gen, attacker.move!)
    );
}
