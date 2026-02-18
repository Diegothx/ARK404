/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameResponse } from '../models/GameResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameService {
    /**
     * List Games
     * @returns GameResponse Successful Response
     * @throws ApiError
     */
    public static listGamesGamesGet(): CancelablePromise<Array<GameResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/games/',
        });
    }
    /**
     * Get Game
     * @param gameId
     * @returns GameResponse Successful Response
     * @throws ApiError
     */
    public static getGameGamesGameIdGet(
        gameId: number,
    ): CancelablePromise<GameResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/games/{game_id}',
            path: {
                'game_id': gameId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
