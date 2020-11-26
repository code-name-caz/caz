import BigNumber from 'bignumber.js';
import { SuccessResponse } from './successResponse';
export declare class BalanceResponse extends SuccessResponse {
    constructor(symbol: string, balance: BigNumber);
}
