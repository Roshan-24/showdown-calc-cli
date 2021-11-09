import { StatsTable } from "@smogon/calc";

type Weather = 'Sun' | 'Rain' | 'Sand' | 'Hail' | undefined;

type Terrain = 'Electric' | 'Psychic' | 'Misty' | 'Grassy' | undefined;

export interface IDamageCalcAnswers {
    attackerSpecies: string;
    atkEv: number;
    spaEv: number;
    atkBoost: number;
    spaBoost: number;
    attackerNature: string;
    attackerAbility: string;
    attackerItem: string;
    move: string;
    defenderSpecies: string;
    hpEv: number;
    defEv: number;
    spdEv: number;
    defBoost: number;
    spdBoost: number;
    defenderNature: string;
    defenderAbility: string;
    defenderItem: string;
    weather: Weather;
    terrain: Terrain;
    otherBattleConditions: string[];
}

export interface pokemonInfo {
    name: string,
    item: string | undefined,
    nature: string,
    ability: string | undefined,
    evs?: Partial<StatsTable<number>>,
    boosts: Partial<StatsTable<number>>,
    move?: string
}

export interface IBattleCondition {
    weather: Weather;
    terrain: Terrain;
    isGravity: boolean;
    defenderSide: {
        isReflect: boolean;
        isLightScreen: boolean;
    }
}
