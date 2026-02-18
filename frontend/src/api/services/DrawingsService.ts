/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_drawing_drawings__post } from '../models/Body_upload_drawing_drawings__post';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DrawingsService {
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
     * Get Drawings By Year
     * @param year
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getDrawingsByYearDrawingsYearYearGet(
        year: number,
    ): CancelablePromise<any> {
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
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getDrawingYearsDrawingsYearsGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/drawings/years',
        });
    }
    /**
     * List Collections
     * @returns any Successful Response
     * @throws ApiError
     */
    public static listCollectionsDrawingsCollectionsGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/drawings/collections',
        });
    }
}
