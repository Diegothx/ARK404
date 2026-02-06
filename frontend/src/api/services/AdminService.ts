/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminService {
    /**
     * Admin Login
     * @param usernameOrEmail
     * @param password
     * @returns any Successful Response
     * @throws ApiError
     */
    public static adminLoginAdminLoginPost(
        usernameOrEmail: string,
        password: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/login',
            query: {
                'username_or_email': usernameOrEmail,
                'password': password,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Add Quote
     * Add a new quote (admin only)
     * @param quote
     * @returns any Successful Response
     * @throws ApiError
     */
    public static addQuoteAdminAddQuotePost(
        quote: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/add-quote',
            query: {
                'quote': quote,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
