/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Collection } from '../models/Collection';
import type { Drawing } from '../models/Drawing';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DrawingsService {
    /**
     * Get Drawings By Year
     * @param year
     * @returns Drawing Successful Response
     * @throws ApiError
     */
    public static getDrawingsByYearDrawingsYearYearGet(
        year: number,
    ): CancelablePromise<Array<Drawing>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/drawings/year/{year}',
            path: {
                'year': year,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Drawing Years
     * @returns number Successful Response
     * @throws ApiError
     */
    public static getDrawingYearsDrawingsYearsGet(): CancelablePromise<Array<number>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/drawings/years',
        });
    }
    /**
     * List Collections
     * @returns Collection Successful Response
     * @throws ApiError
     */
    public static listCollectionsDrawingsCollectionsGet(): CancelablePromise<Array<Collection>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/drawings/collections',
        });
    }
}
