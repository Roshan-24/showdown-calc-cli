import { MOVES, ITEMS, SPECIES, ABILITIES } from "@smogon/calc"
import { capitalize, isMovePhysical } from ".";
import { pokemonInfo } from "../types";

export const parseAttackerString = (str: string, gen: number): [pokemonInfo, string] => {
    const moves = MOVES[gen];
    const items = ITEMS[gen];
    const species = SPECIES[gen];
    const abilities = ABILITIES[gen];

    const args = str.split(' ');

    let move: string;
    if (Object.keys(moves).includes(args[args.length - 1])) {
        move = args[args.length - 1];
    } else if (Object.keys(moves).includes(args[args.length - 2] + ' ' + args[args.length - 1])) {
        move = args[args.length - 2] + ' ' + args[args.length - 1];
    } else {
        move = args[args.length - 3] + ' ' + args[args.length - 2] + ' ' + args[args.length - 1];
    }
    move = capitalize(move)

    let evIndex = 0;
    let atkBoost = 0;
    let spaBoost = 0;
    if (args[0][0] === '+') {
        isMovePhysical(move, gen) ? atkBoost = Number(args[0][1]) : spaBoost = Number(args[0][1]);
        evIndex = 1;
    } else if (args[0][0] === '-') {
        isMovePhysical(move, gen) ? atkBoost = -Number(args[0][1]) : spaBoost = -Number(args[0][1]);
        evIndex = 1;
    }

    let nature = 'Bashful';
    let atkEv = 0;
    let spaEv = 0;
    if (gen >= 3) {
        if (args[evIndex][args[evIndex].length - 1] === '+') {
            nature = args[evIndex + 1] === 'Atk' ? 'Brave' : args[evIndex + 1].toLowerCase() === 'spa' ? 'Quiet' : 'Bashful';
            args[evIndex] = args[evIndex].slice(0, -1);
        } else if (args[evIndex][args[evIndex].length - 1] === '-') {
            nature = args[evIndex + 1].toLowerCase() === 'spa' ? 'Jolly' : args[evIndex + 1] === 'Atk' ? 'Timid' : 'Bashful';
            args[evIndex] = args[evIndex].slice(0, -1);
        }
        atkEv = args[evIndex + 1] === 'Atk' ? Number(args[evIndex]) : 0;
        spaEv = args[evIndex + 1].toLowerCase() === 'spa' ? Number(args[evIndex]) : 0;
    }

    let item: string | undefined = undefined
    let abilityIndex = gen >= 3 ? evIndex + 2 : evIndex;
    if (gen >= 2) {
        if (items.includes(args[evIndex + 2])) {
            item = args[evIndex + 2];
            abilityIndex = evIndex + 3;
        } else if (items.includes(args[evIndex + 2] + ' ' + args[evIndex + 3])) {
            item = args[evIndex + 2] + ' ' + args[evIndex + 3];
            abilityIndex = evIndex + 4;
        }
    }

    let ability: string | undefined = undefined;
    let speciesIndex = abilityIndex;
    if (gen >= 3) {
        if (abilities.includes(args[abilityIndex])) {
            ability = args[abilityIndex];
            speciesIndex = abilityIndex + 1;
        } else if (abilities.includes(args[abilityIndex] + ' ' + args[abilityIndex + 1])) {
            ability = args[abilityIndex] + ' ' + args[abilityIndex + 1];
            speciesIndex = abilityIndex + 2;
        }
    }

    let speciesName: string;
    if (Object.keys(species).includes(args[speciesIndex])) {
        speciesName = args[speciesIndex];
    } else {
        speciesName = args[speciesIndex] + ' ' + args[speciesIndex + 1];
    }

    return [{
        name: speciesName,
        item,
        ability,
        nature,
        ...gen >= 3 && {
            evs: {
                atk: atkEv,
                spa: spaEv
            },
        },
        boosts: {
            atk: atkBoost,
            spa: spaBoost,
        },
        move
    }, isMovePhysical(move, gen) ? 'Physical' : 'Special'];
}

export const parseDefenderString = (str: string, moveCategory: string, gen: number): pokemonInfo => {
    const items = ITEMS[gen];
    const species = SPECIES[gen];
    const abilities = ABILITIES[gen];

    const args = str.split(' ');

    let hpEv = 0;
    let defEv = 0;
    let spdEv = 0;
    let defBoost = 0;
    let spdBoost = 0;

    let evIndex = 0;
    if (args[0][0] === '+') {
        moveCategory === 'Physical' ? defBoost = Number(args[0][1]) : spdBoost = Number(args[0][1]);
        evIndex = 1;
    } else if (args[0][0] === '-') {
        moveCategory === 'Physical' ? defBoost = -Number(args[0][1]) : spdBoost = -Number(args[0][1]);
        evIndex = 1;
    }

    if (gen >= 3) {
        if (args[evIndex + 1].toLowerCase() !== 'hp') throw 'Invalid String';
        hpEv = Number(args[evIndex]);
    }

    let nature = 'Bashful';
    if (gen >= 3) {
        if (args[evIndex + 3][args[evIndex + 3].length - 1] === '+') {
            nature = args[evIndex + 4] === 'Def' ? 'Bold' : args[evIndex + 4].toLowerCase() === 'spd' ? 'Calm' : 'Bashful';
            args[evIndex + 3] = args[evIndex + 3].slice(0, -1);
        } else if (args[evIndex + 3][args[evIndex + 3].length - 1] === '-') {
            nature = args[evIndex + 4] === 'Def' ? 'Hasty' : args[evIndex + 4].toLowerCase() === 'spd' ? 'Rash' : 'Bashful';
            args[evIndex + 3] = args[evIndex + 3].slice(0, -1);
        }
        defEv = args[evIndex + 4] === 'Def' ? Number(args[evIndex]) : 0;
        spdEv = args[evIndex + 4].toLowerCase() === 'spd' ? Number(args[evIndex]) : 0;
    }

    let item: string | undefined = undefined
    let abilityIndex = gen >= 3 ? evIndex + 5 : evIndex;
    if (gen >= 2) {
        if (items.includes(args[evIndex + 5])) {
            item = args[evIndex + 5];
            abilityIndex = evIndex + 6;
        } else if (items.includes(args[evIndex + 2] + ' ' + args[evIndex + 3])) {
            item = args[evIndex + 2] + ' ' + args[evIndex + 3];
            abilityIndex = evIndex + 7;
        }
    }

    let ability: string | undefined = undefined;
    let speciesIndex = abilityIndex;
    if (gen >= 3) {
        if (abilities.includes(args[abilityIndex])) {
            ability = args[abilityIndex];
            speciesIndex = abilityIndex + 1;
        } else if (abilities.includes(args[abilityIndex] + ' ' + args[abilityIndex + 1])) {
            ability = args[abilityIndex] + ' ' + args[abilityIndex + 1];
            speciesIndex = abilityIndex + 2;
        }
    }

    let speciesName: string;
    if (Object.keys(species).includes(args[speciesIndex])) {
        speciesName = args[speciesIndex];
    } else if (Object.keys(species).includes(args[speciesIndex] + ' ' + args[speciesIndex + 1])) {
        speciesName = args[speciesIndex] + ' ' + args[speciesIndex + 1];
    }

    return {
        name: speciesName!,
        item,
        ability,
        nature,
        ...gen >= 3 && {
            evs: {
                hp: hpEv,
                def: defEv,
                spd: spdEv
            },
        },
        boosts: {
            def: defBoost,
            spd: spdBoost
        }
    };
}
