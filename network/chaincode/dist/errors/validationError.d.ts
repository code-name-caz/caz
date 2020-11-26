import { ValidationError as JoiValidationError } from 'joi';
export declare class ValidationError extends Error {
    private static formatError;
    constructor(error: JoiValidationError);
}
