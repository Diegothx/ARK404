/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_admin_login_admin_login_post } from '../models/Body_admin_login_admin_login_post';
import type { Body_upload_drawing_drawings__post } from '../models/Body_upload_drawing_drawings__post';
import type { GameCreate } from '../models/GameCreate';
import type { GameResponse } from '../models/GameResponse';
import type { GameUpdate } from '../models/GameUpdate';
import type { QuoteCreate } from '../models/QuoteCreate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminService {
    /**
     * Admin Login
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public static adminLoginAdminLoginPost(
        formData: Body_admin_login_admin_login_post,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Add Quote
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static addQuoteAdminAddQuotePost(
        requestBody: QuoteCreate,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/add-quote',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Entry
     * @param entryId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteEntryGuestbookEntryIdDelete(
        entryId: number,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/guestbook/{entry_id}',
            path: {
                'entry_id': entryId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Upload Drawing
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public static uploadDrawingDrawingsPost(
        formData: Body_upload_drawing_drawings__post,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/drawings/',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Drawing
     * @param drawingId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteDrawingDrawingsDrawingIdDelete(
        drawingId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/drawings/{drawing_id}',
            path: {
                'drawing_id': drawingId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Game
     * @param requestBody
     * @returns GameResponse Successful Response
     * @throws ApiError
     */
    public static createGameGamesPost(
        requestBody: GameCreate,
    ): CancelablePromise<GameResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/games/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Game
     * @param gameId
     * @param requestBody
     * @returns GameResponse Successful Response
     * @throws ApiError
     */
    public static updateGameGamesGameIdPut(
        gameId: number,
        requestBody: GameUpdate,
    ): CancelablePromise<GameResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/games/{game_id}',
            path: {
                'game_id': gameId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Game
     * @param gameId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteGameGamesGameIdDelete(
        gameId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
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
