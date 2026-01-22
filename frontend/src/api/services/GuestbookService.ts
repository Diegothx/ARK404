/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GuestbookCreate } from '../models/GuestbookCreate';
import type { GuestbookOut } from '../models/GuestbookOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GuestbookService {
    /**
     * List Entries
     * @returns GuestbookOut Successful Response
     * @throws ApiError
     */
    public static listEntriesGuestbookGet(): CancelablePromise<Array<GuestbookOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/guestbook/',
        });
    }
    /**
     * Create Entry
     * @param requestBody
     * @returns GuestbookOut Successful Response
     * @throws ApiError
     */
    public static createEntryGuestbookPost(
        requestBody: GuestbookCreate,
    ): CancelablePromise<GuestbookOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/guestbook/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
