/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameNoteSchema } from './GameNoteSchema';
import type { GamePriority } from './GamePriority';
import type { GameStatus } from './GameStatus';
export type GameUpdate = {
    title?: (string | null);
    status?: (GameStatus | null);
    platform?: (Array<string> | null);
    genre?: (Array<string> | null);
    release_year?: (number | null);
    hours_played?: (number | null);
    rating?: (number | null);
    priority?: (GamePriority | null);
    notes?: (Array<GameNoteSchema> | null);
    start_date?: (string | null);
    finish_date?: (string | null);
};

