import CryptoJS from "crypto-js";

export interface GamejoltResponse 
{
    /**
     * 	Whether the request succeeded or failed.
     */
    readonly success: boolean|string;

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
     * The base url of game jolt.
     */
    private readonly m_baseUrl: string = "http://api.gamejolt.com/api/game";

    /**
     * The version of api.
     */
    private readonly m_version: string = "v1_2";

    /**
     * The auth token. Fetched from url query param 'gjapi_token'.
     */
    protected readonly m_gjApiUserToken: string;

    /**
     * The username. Fetched from url query param 'gjapi_username'.
     */
    protected readonly m_gjApiUserName: string;

    constructor(private readonly m_privateKey: string, private readonly m_gameId: number)
    {
        const query_string = window.location.search;
        const url_params = new URLSearchParams(query_string);
        this.m_gjApiUserToken = url_params.get("gjapi_token");
        this.m_gjApiUserName = url_params.get("gjapi_username");
    }

    /**
     * Resource of game jolt, such as trophies.
     */
    protected abstract get resource (): string;

    protected get url () 
    {
        return `${this.m_baseUrl}/${this.m_version}/${this.resource}`;
    }

    /**
     * Gets the resource.
     * @param { string } action - which action to execute.
     * @param { { [id:string]: string }}
     */
    protected async get<T> (action: string, params: { [id: string]: string | number } | object): Promise<T> 
    {
        let url = `${this.url}/`;

        // if there is an action, add it to url
        if (action != "")
        {
            url += `${action}/`
        }

        url += `?game_id=${this.m_gameId}`;

        // add user username and token if they exist 
        if (this.m_gjApiUserName)
        {
            url += `&username=${this.m_gjApiUserName}`;
        }
        if (this.m_gjApiUserToken)
        {
            url += `&user_token=${this.m_gjApiUserToken}`;
        }
        if (params)
        {
            for (const key in params)
            {
                url += `&${key}=${params[key]}`;
            }
        }

        const signature = CryptoJS.MD5(`${url}${this.m_privateKey}`).toString();
        url += `&signature=${signature}`;

        const response = await fetch(url);
        const response_json = await response.json();

        const result = response_json.response as GamejoltResponse;

        if (result?.success === false || result?.success === "false")
        {
            throw new GamejoltResponseError(result.message);
        }


        return result as unknown as T;
    }
}