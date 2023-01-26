import { GamejoltBaseApi, GamejoltResponse } from "./GamejoltBaseApi";

/**
 * The Trophies - Add Achieved parameters
 */
export interface GamejoltTrophiesAddAchievedParameters
{
    /**
     * The ID of your game.
     */
    game_id?: string;

    /**
     * The user's username.
     */
    username?: string

    /**
     * The user's token.
     */
    user_token?: string;

    /**
     * The ID of the trophy to add for the user.
     */
    trophy_id?: string | number;
}

/**
* The Trophies - Fetch parameters
*/
export interface GamejoltTrophiesFetchParameters
{
    /**
     * The ID of your game.
     */
    game_id?: string;

    /**
     * The user's username.
     */
    username?: string

    /**
     * The user's token.
     */
    user_token?: string;

    /**
     * Pass in true to return only the achieved trophies for a user. 
     * Pass in false to return only trophies the user hasn't achieved. 
     * Leave blank to retrieve all trophies.
     */
    achieved?: boolean;

    /**
     * If you would like to return just one trophy, you may pass the trophy ID with this parameter.
     * If you do, only that trophy will be returned in the response.
     * You may also pass multiple trophy IDs here if you want to return a subset of all the trophies. 
     * You do this as a comma-separated list in the same way you would for retrieving multiple users. 
     * Passing a trophy_id will ignore the achieved parameter if it is passed.
     */
    trophy_id?: number | string;
}

/**
 * The trophy difficulty.
 */
export enum GamejoltTrophyDifficulty 
{
    Bronze = "Bronze",
    Silver = "Silver",
    Gold = "Gold",
    Platinum = "Platinum"
}

export interface GamejoltTrophy 
{
    /**
     * The ID of the trophy.
     * Example: 1047
     */
    readonly id: number | string;

    /**
     * The title of the trophy on the site.
     * Example: Master Jumper
     */
    readonly title: string;

    /**
     * The trophy description text.
     * Example: Achieve 200 jumps.
     */
    readonly description: string;

    /**
     * Bronze, Silver, Gold, or Platinum
     * Example: Silver
     */
    readonly difficulty: GamejoltTrophyDifficulty;

    /**
     * The URL of the trophy's thumbnail image.
     * Example: https://i.gjcdn.net/imgserver/game-trophy/75/1958_1.jpg
     */
    readonly image_url: string;

    /**
     * Date/time when the trophy was achieved by the user, or false if they haven't achieved it yet.
     * Example: false
     */
    readonly achieved: boolean | string;
}


/**
 * The Gamejolt trophies fetch response.
 */
export interface GamejoltTrophiesFetchResult extends GamejoltResponse
{
    /**
     * The scores.
     */
    readonly trophies: Array<GamejoltTrophy>;
}


export class GamejoltTrophiesApi extends GamejoltBaseApi
{
    protected get resource(): string
    {
        return "trophies";
    }

    /**
     * Sets a trophy as achieved for a particular user.
     * @param { GamejoltTrophiesAddAchievedParameters } parameters 
     * @returns { Promise<GamejoltResponse> }
     */
    public addAchieved(parameters: GamejoltTrophiesAddAchievedParameters  | string | number): Promise<GamejoltResponse> 
    {
        if (typeof parameters ==  "string" || typeof parameters == "number")
        {
            parameters = {
                trophy_id: parameters
            };
        }

        return this.get<GamejoltResponse>("add_achieved", parameters as GamejoltTrophiesFetchParameters);
    }


    /**
     * Returns one trophy or multiple trophies, depending on the parameters passed in.
     * 
     * @param { GamejoltTrophiesFetchParameters } parameters 
     * @returns { Promise<GamejoltTrophiesFetchResult> }
     */
    public fetch(parameters: GamejoltTrophiesFetchParameters): Promise<GamejoltTrophiesFetchResult> 
    {
        return this.get<GamejoltTrophiesFetchResult>("", parameters);
    }

}