import { Config } from ".";
import { GamejoltDataStorageApi } from "./resources/GameJoltDataStorageApi";
import { GamejoltScoresApi } from "./resources/GameJoltScoresApi";
import { GamejoltTrophiesApi } from "./resources/GameJoltTrophiesApi";
import { utilNullToUndefined } from "./resources/utils";

/**
 * The Gamejolt game api.
 *
 * This is the main entry point for the Gamejolt API. It provides access to the trophies, scores, and data storage APIs.
 *
 * @example
 * ```typescript
 * import { create } from "gamejolt-api";
 *
 * const api = create("private_key", 12345);
 * ```
 */
export class GamejoltGameApi
{
    public readonly token?: string;
    public readonly username?: string;

    /**
     * The constructor of GamejoltGameApi.
     * @param private_key The unique secret private game key.
     * @param game_id The unique game id.
     * @param config The configuration for the Gamejolt API. Allows you to pass your own implementation of fetch.
     */
    constructor(private_key: string, game_id: number, config: Required<Config>)
    {
        if (typeof window !== "undefined")
        {
            const query_string = window.location.search;
            const url_params = new URLSearchParams(query_string);

            this.token = utilNullToUndefined(url_params.get("gjapi_token"));
            this.username = utilNullToUndefined(url_params.get("gjapi_username"));
        }

        this.trophies = new GamejoltTrophiesApi(private_key, game_id, config);
        this.scores = new GamejoltScoresApi(private_key, game_id, config);
        this.dataStorage = new GamejoltDataStorageApi(private_key, game_id, config);
    }

    /**
     * The trophies api.
     */
    public readonly trophies: GamejoltTrophiesApi;

    /**
     * The scores api.
     */
    public readonly scores: GamejoltScoresApi;

    /**
     * The data storage api.
     */
    public readonly dataStorage: GamejoltDataStorageApi;
}
