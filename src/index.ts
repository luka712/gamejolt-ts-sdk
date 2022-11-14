import { GamejoltGameApi } from "./GamejoltGameApi"

export * from "./GamejoltGameApi"
export * from "./resources/GameJoltDataStorageApi"
export * from "./resources/GameJoltScoresApi"
export * from "./resources/GameJoltTrophiesApi"

/**
 * Create an instance of {@link GamejoltGameApi}
 * @param private_key the unique secret private game key.
 * @param game_id the unique game id.
 * @returns 
 */
export function create(private_key: string, game_id: number) : GamejoltGameApi {
    return new GamejoltGameApi(private_key, game_id, );
}