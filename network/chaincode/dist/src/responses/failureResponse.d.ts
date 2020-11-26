import { SmartContractResponse } from '.';
import { ResponseCodes } from '../variables';
export declare class FailureResponse extends SmartContractResponse {
    constructor(code: ResponseCodes, message: string, errors?: {});
}
