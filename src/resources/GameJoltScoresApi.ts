import { GamejoltBaseApi, GamejoltParameters, GamejoltResponse } from "./GamejoltBaseApi";

export interface GamejoltScoresAddParameters extends GamejoltParameters
{
    /**
     * The guest's name.
     */
    guest?: string;

    /**
     * This is a string value associated with the score.
     * Example: '500 Points'
     */
    score: string;

    /**
     * This is a numerical sorting value associated with the score.
     * All sorting will be based on this number.
     *  Example: 500
     */
    sort: number;

    /**
     * If there's any extra data you would like to store as a string, you can use this variable.
     */
    extra_data?: string;

    /**
     * The ID of the score table to submit to.
     */
    table_id?: string;
}

export interface GamejoltScoresFetchParameters extends GamejoltParameters
{
    /**
     * The number of scores you'd like to return.
     */
    limit?: number;

    /**
     * The ID of the score table.
     */
    table_id?: string;

    /**
     * The guest's name.
     */
    guest?: string;

    /**
     * Fetch only scores better than this score sort value.
     */
    better_than?: number;

    /**
     * Fetch only scores worse than this score sort value.
     */
    worse_than?: number;
}

/**
 * The Gamejolt scores response.
 */
export interface GamejoltScoresFetchResult extends GamejoltResponse
{
    /**
     * The scores.
     */
    readonly scores: Array<GamejoltScore>;
}

/**
 * The score.
 */
export interface GamejoltScore
{
    /**
     * 	The score string.
     *  Example: 234 Coins
     */
    readonly score: string;
    /**
     * The score's numerical sort value.
     * Example: 234
     */
    readonly sort: number;

    /**
     * Any extra data associated with the score.
     * Example: Level 2
     */
    readonly extra_data: string;

    /**
     * If this is a user score, this is the display name for the user.
     * Example: nilllzz
     */
    readonly user: string;

    /**
     * If this is a user score, this is the user's ID.
     * Example: 17741
     */
    readonly user_id: number;

    /**
     * If this is a guest score, this is the guest's submitted name.
     * Example: guestname
     */
    readonly guest: string;

    /**
     * Returns when the score was logged by the user.
     * Example: 1 week ago
     */
    readonly stored: string;

    /**
     * Returns the timestamp(in seconds) of when the score was logged by the user.
     * Example: 1502471604
     */
    readonly stored_timestamp: number;
}

/**
 * The scores api.
 */
export class GamejoltScoresApi extends GamejoltBaseApi
{
    protected get resource(): string
    {
        return "scores";
    }

    /**
     * Adds a score for a user or guest.
     *
     * Remarks:
     * You can either store a score for a user or a guest. If you're storing for a user, you must pass in the username and user_token parameters. If you're storing for a guest, you must pass in the guest parameter.
     * The extra_data value is only retrievable through the API and your game's dashboard. It's never displayed publicly to users on the site. If there is other data associated with the score such as time played, coins collected, etc., you should definitely include it. It will be helpful in cases where you believe a gamer has illegitimately achieved a high score.
     * If table_id is left blank, the score will be submitted to the primary high score table.
     *
     * @param { GamejoltScoresAddParameters } parameters - the parameters.
     * @returns { Promise<GamejoltResponse> }
     */
    public add(parameters: GamejoltScoresAddParameters): Promise<GamejoltResponse>
    {
        return this.get<GamejoltResponse>("add", parameters);
    }

    /**
     * Returns a list of scores either for a user or globally for a game.
     *
     * Remarks:
     * The default value for limit is 10 scores. The maximum amount of scores you can retrieve is 100.
     * If table_id is left blank, the scores from the primary score table will be returned.
     * Only pass in the username and user_token if you would like to retrieve scores for just that user. Leave the user information blank to retrieve all scores.
     * guest allows you to fetch scores by a specific guest name.
     * Only pass either the username/user_token pair or the guest (or none), never both.
     * Scores are returned in the order of the score table's sorting direction. e.g. for descending tables the bigger scores are returned first.
     * @param { GamejoltScoresFetchParameters } parameters - the parameters
     * @returns { Promise<Array<GamejoltScoresFetchResult>> }
     */
    public fetch(parameters: GamejoltScoresFetchParameters): Promise<GamejoltScoresFetchResult>
    {
        return this.get<GamejoltScoresFetchResult>("", parameters);
    }
}
