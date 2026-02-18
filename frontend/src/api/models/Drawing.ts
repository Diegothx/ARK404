/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Collection } from './Collection';
export type Drawing = {
    id: number;
    title: string;
    description?: (string | null);
    file_url: string;
    thumbnail_url?: (string | null);
    drawing_date?: (string | null);
    is_favorite?: boolean;
    is_public?: boolean;
    collections?: (Array<Collection> | null);
};

