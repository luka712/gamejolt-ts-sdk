import {GamejoltBaseApi, GamejoltParameters, GamejoltResponse} from "./GamejoltBaseApi";

/**
 * The Data Store - Fetch parameters
 */
export interface GamejoltDataStoreFetchParameters extends GamejoltParameters
{
    /**
     * The key of the data item you'd like to set.
     */
    key: string;
}

/**
 * The Data Store - Set parameters
 */
export interface GamejoltDataStoreSetParameters extends GamejoltParameters
{
    /**
     * The key of the data item you'd like to set.
     */
    key: string;

    /**
     * The data you'd like to set.
     */
    data: string;
}

/**
 * Valid Values for 'operation' property of @see GamejoltDataStoreUpdateParameters
 */
export enum GamejoltDataStoreUpdateOperation 
{
    /**
     * Adds the value to the current data store item.
     */
    Add = "add",

    /**
     * Substracts the value from the current data store item.
     */
    Subtract = "subtract",

    /**
     * Multiplies the value by the current data store item.
     */
    Multiply = "multiply",

    /**
     * Divides the current data store item by the value.
     */
    Divide = "divide",

    /**
     * Appends the value to the current data store item.
     */
    Append = "append",

    /**
     * Prepends the value to the current data store item.
     */
    Prepend = "prepend"
}


/**
 * The Data Store - Update parameters
 */
export interface GamejoltDataStoreUpdateParameters extends GamejoltParameters
{
    /**
     * The key of the data item you'd like to update.
     */
    key: string;

    /**
     * The operation you'd like to perform.
     */
    operation: GamejoltDataStoreUpdateOperation;

    /**
     * The value you'd like to apply to the data store item.
     * @see GamejoltDataStoreUpdateOperation
     */
    value: string | number;
}

/**
 * The Data Store - Get Keys parameters
 */
export interface GamejoltDataStorageGetKeysParameters extends GamejoltParameters
{
    /**
     * The pattern to apply to the key names in the data store.
     */
    pattern?: string;
}

/**
 * The Gamejolt Data Storage Update result response.
 */
export interface GamejoltDataStorageUpdateResult extends GamejoltResponse
{
    /**
     * If the request was successful, this returns the new value of the data item.
     * Example: New data with appended string.
     */
    readonly data: number | string;
}

/**
 * The Gamejolt Data Storage Update result response.
 */
export interface GamejoltDataStorageFetchResult extends GamejoltResponse
{
    /**
     * If the request was successful, this returns the new value of the data item.
     * Example: Some example data.
     */
    readonly data: number | string;
}

export interface GamejoltDataStorageGetKeysResult extends GamejoltResponse 
{
    /**
     * The name of the key. This function will return all the keys for this particular data store.
     * Example: keyname
     */
    readonly keys:string;
}

/**
 * The data storage api.
 */
export class GamejoltDataStorageApi extends GamejoltBaseApi
{
    protected get resource (): string
    {
        return "data-store";
    }

    /**
     * Sets data in the data store.
     * 
     * Remarks:
     * If you pass in the user information, this item will be removed from a user's data store. If you leave the user information empty, it will be removed from the game's global data store.
     * You can create new data store items by passing in a key that doesn't yet exist in the data store.
     * @param parameters 
     * @returns 
     */
    public set (parameters: GamejoltDataStoreSetParameters): Promise<GamejoltResponse> 
    {
        return this.get<GamejoltResponse>("set", parameters);
    }

    /**
     * Updates data in the data store.
     * 
     * Remarks:
     * You can only perform mathematic operations on numerical data.
     * If you pass in the user information, this function will return all the keys in a user's data store. If you leave the user information empty, it will return all the keys in the game's global data store.
     * @param parameters @see {@link GamejoltDataStoreUpdateParameters} 
     * @returns 
     */
    public update (parameters: GamejoltDataStoreUpdateParameters): Promise<GamejoltDataStorageUpdateResult>
    {
        return this.get<GamejoltDataStorageUpdateResult>("update", parameters);
    }

    /**
     * Returns data from the data store.
     * 
     * Remarks:
     * If you pass in the user information, the data item will be fetched for a user. If you leave the user information empty, it will be fetched globally for the game.
     * @param { GamejoltDataStoreFetchParameters } parameters 
     * @returns { Promise<GamejoltDataStorageFetchResult> }
     */
    public fetch (parameters: GamejoltDataStoreFetchParameters): Promise<GamejoltDataStorageFetchResult> 
    {
        return this.get<GamejoltDataStorageFetchResult>("", parameters);
    }


    /**
     * Returns either all the keys in the game's global data store, or all the keys in a user's data store.
     * 
     * Remarks:
     * If you apply a pattern to the request, only keys with applicable key names will be returned. The placeholder character for patterns is *.
     * If you pass in the user information, this function will return all the keys in a user's data store. If you leave the user information empty, it will return all the keys in the game's global data store.
     * This request will return a list of the key values. The key return value can appear more than once.
     * @param  { GamejoltDataStorageGetKeysParameters | undefined } parameters 
     * @returns { Promise<GamejoltDataStorageGetKeysResult> }
     */
    public getKeys (parameters: GamejoltDataStorageGetKeysParameters = {}) : Promise<GamejoltDataStorageGetKeysResult> 
    {
        return this.get<GamejoltDataStorageGetKeysResult>("get-keys", parameters);
    }
}