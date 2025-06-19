import { GamejoltGameApi } from "./GamejoltGameApi";

export * from "./GamejoltGameApi";
export * from "./resources/GameJoltDataStorageApi";
export * from "./resources/GameJoltScoresApi";
export * from "./resources/GameJoltTrophiesApi";

export interface Config
{
    /**
     * Pass your own implementation of fetch.
     * Defaults to window.fetch in browsers.
     */
    readonly fetch?: typeof window.fetch;
    /**
     * The base URL to the Game Jolt API.
     * @default http://api.gamejolt.com/api/game
     */
    readonly baseUrl?: string;

    /**
     * The API version to Game Jolt.
     * @default v1_2
     */
    readonly version?: string;
}

export function parse_config(config?: Config): Required<Config>
{
    let fetch = config?.fetch;

    if (!fetch) {
        if (typeof window === "undefined") {
            throw new Error("I can't find an implementation of fetch.");
        }

        fetch = window.fetch;
    }

    return {
        fetch,
        baseUrl: config?.baseUrl ?? "http://api.gamejolt.com/api/game",
        version: config?.version ?? "v1_2",
    };
}

/**
 * Create an instance of {@link GamejoltGameApi}
 * @param private_key the unique secret private game key.
 * @param game_id the unique game id.
 * @param config optional configuration, see the config interface.
 * @returns
 */
export function create(private_key: string, game_id: number, config?: Config): GamejoltGameApi
{
    return new GamejoltGameApi(private_key, game_id, parse_config(config));
}
