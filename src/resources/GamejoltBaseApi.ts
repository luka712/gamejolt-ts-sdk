import CryptoJS from "crypto-js";
import { Config } from "..";
import { utilCreateQueryString, utilNullToUndefined } from "./utils";

export interface GamejoltParameters
{
    /**
     * Override the game ID passed as a configuration.
     */
    readonly game_id?: string;
    /**
     * Override the username passed in the URL.
     */
    readonly username?: string;
    /**
     * Override the user token passed in the URL.
     */
    readonly user_token?: string;
}

export interface GamejoltResponse
{
    /**
     * 	Whether the request succeeded or failed.
     */
    readonly success: boolean | string;

    /**
     * If the request was not successful, this contains the error message.
     */
    readonly message?: string;
}

export class GamejoltResponseError extends Error
{
    constructor(msg: string)
    {
        super(`GameJolt error: ${msg}`);
    }
}

export abstract class GamejoltBaseApi
{
    /**
     * The auth token. Fetched from url query param 'gjapi_token'.
     */
    protected readonly m_gjApiUserToken?: string;

    /**
     * The username. Fetched from url query param 'gjapi_username'.
     */
    protected readonly m_gjApiUserName?: string;

    /**
     * The constructor of GamejoltBaseApi.
     * @param m_privateKey
     * @param m_gameId
     * @param m_config
     */
    constructor(private readonly m_privateKey: string,  private readonly m_gameId: number, private readonly m_config: Required<Config>) {
        if (typeof window !== "undefined")
        {
            const query_string = window.location.search;
            const url_params = new URLSearchParams(query_string);
            this.m_gjApiUserToken = utilNullToUndefined(url_params.get("gjapi_token"));
            this.m_gjApiUserName = utilNullToUndefined(url_params.get("gjapi_username"));
        }
    }

    /**
     * Resource of game jolt, such as trophies.
     */
    protected abstract get resource(): string;

    protected get url()
    {
        return `${this.m_config.baseUrl}/${this.m_config.version}/${this.resource}`;
    }

    /**
     * Gets the resource.
     * @param { string } action - which action to execute.
     * @param { { [id:string]: string }} params
     */
    protected async get<T>(action: string, params: GamejoltParameters): Promise<T>
    {
        let url = `${this.url}/`;

        // if there is an action, add it to url
        if (action != "")
        {
            url += `${action}/`;
        }

        const queryStr = utilCreateQueryString({
            ...params,
            // If provided overrides, use them. Else, fall back to whatever
            // we put in the constructor.
            game_id: params.game_id ?? this.m_gameId,
            username: params.username ?? this.m_gjApiUserName,
            user_token: params.user_token ?? this.m_gjApiUserToken,
        });

        url += `?${queryStr}`;

        const signature = CryptoJS.MD5(`${url}${this.m_privateKey}`).toString();
        url += `&signature=${signature}`;

        const response = await this.m_config.fetch(url);

        if (!response.ok)
        {
            // Read it as text, as opposed to JSON, to circumvent
            // any potential parsing issues.
            throw new GamejoltResponseError(await response.text());
        }

        const response_json = await response.json();

        const result = response_json.response as GamejoltResponse;

        if (!result || result?.success === false || result?.success === "false")
        {
            throw new GamejoltResponseError(result.message ?? "Unknown error");
        }

        return result as unknown as T;
    }
}
