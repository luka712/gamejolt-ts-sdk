import { Config } from ".";
import { GamejoltDataStorageApi } from "./resources/GameJoltDataStorageApi";
import { GamejoltScoresApi } from "./resources/GameJoltScoresApi";
import { GamejoltTrophiesApi } from "./resources/GameJoltTrophiesApi";

export class GamejoltGameApi 
{
    public readonly token?: string;
    public readonly username?: string;

    constructor(private_key: string, game_id: number, public readonly config: Config)
    {
        const query_string = window.location.search;
        const url_params = new URLSearchParams(query_string);

        this.token = url_params.get("gjapi_token");
        this.username = url_params.get("gjapi_username");

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