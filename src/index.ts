import { GamejoltGameApi } from "./GamejoltGameApi"

export * from "./GamejoltGameApi"
export * from "./resources/GameJoltDataStorageApi"
export * from "./resources/GameJoltScoresApi"
export * from "./resources/GameJoltTrophiesApi"

export interface Config {
    readonly fetch: typeof window.fetch;
}

function parse_config(config?: Partial<Config>): Config {
    let fetch = config?.fetch;

    if (!fetch && typeof window !== "undefined") {
        fetch = window.fetch;
    }
    
    return { fetch };
}

/**
 * Create an instance of {@link GamejoltGameApi}
 * @param private_key the unique secret private game key.
 * @param game_id the unique game id.
 * @returns 
 */
export function create(private_key: string, game_id: number, config?: Partial<Config>) : GamejoltGameApi {
    return new GamejoltGameApi(private_key, game_id, parse_config(config));
}