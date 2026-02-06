/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HealthService {
    /**
     * Root
     * @returns any Successful Response
     * @throws ApiError
     */
    public static rootGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Db Test
     * Test database connection by running a simple query.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static dbTestDbTestGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/db-test',
        });
    }
    /**
     * Get Quote
     * Retrieve a random quote from the database.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getQuoteGetQuoteGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-quote',
        });
    }
}
