import { ResponseCodes } from '../variables';
export declare class SmartContractResponse {
    success: boolean;
    code: ResponseCodes;
    message: string;
    result: any;
    errors: any;
    constructor(success: boolean, code: ResponseCodes, message: string, result?: any, errors?: any);
    toJson(): string;
    toString(): string;
}
