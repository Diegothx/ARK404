/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_admin_login_admin_login_post } from '../models/Body_admin_login_admin_login_post';
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
}
